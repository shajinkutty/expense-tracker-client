import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Moment from "react-moment";
import "moment-timezone";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  price: {
    fontSize: "1.5rem",
  },
  secondaryList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    color: "#a7a7a7",
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function Expense({ name, price, date, description }) {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start" className={classes.item}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>SK</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={description} />
        <ListItemSecondaryAction>
          <div className={classes.secondaryList}>
            <Typography className={classes.price}>{price}</Typography>
            <Typography className={classes.date}>
              <Moment date={new Date(date)} titleFormat="D MMM YYYY" />
            </Typography>
          </div>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default Expense;
