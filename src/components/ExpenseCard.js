import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertAction } from "../redux/actions";
// import Moment from "react-moment";
// import "moment-timezone";
import Moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginTop: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: green[500],
    color: "#ffff",
    width: theme.spacing(10),
    height: theme.spacing(5),
  },
  header: {
    padding: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1),
  },
}));

export default function ExpenseCard({
  amount,
  description,
  userId,
  date,
  _id,
}) {
  const [showIcons, setShowIcons] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/userExpense") {
      setShowIcons(true);
    } else {
      setShowIcons(false);
    }
  }, [location]);

  const deleteHandler = (id, amount) => {
    dispatch(
      alertAction("Are you sure you want to delete this?", "delete", {
        id,
        amount,
      })
    );
  };

  return (
    <Card className={classes.root} elevation={1}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            variant="rounded"
          >
            {amount}
          </Avatar>
        }
        action={
          showIcons && (
            <>
              {/* <IconButton aria-label="settings">
                <EditIcon />
              </IconButton> */}
              <IconButton
                aria-label="settings"
                onClick={() => deleteHandler(_id, amount)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )
        }
        title={userId.fullName}
        subheader={Moment(date).format("LL")}
      />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
