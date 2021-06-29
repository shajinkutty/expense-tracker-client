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
import EditIcon from "@material-ui/icons/Edit";
import { useLocation } from "react-router-dom";

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
}));

export default function ExpenseCard() {
  const [showIcons, setShowIcons] = useState(false);
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/userExpense") {
      setShowIcons(true);
    } else {
      setShowIcons(false);
    }
  }, [location]);

  return (
    <Card className={classes.root} elevation={1}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            variant="rounded"
          >
            1589.50
          </Avatar>
        }
        action={
          showIcons && (
            <>
              <IconButton aria-label="settings">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="settings">
                <DeleteIcon />
              </IconButton>
            </>
          )
        }
        title="Shajin Kuttappan"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Description
        </Typography>
      </CardContent>
    </Card>
  );
}
