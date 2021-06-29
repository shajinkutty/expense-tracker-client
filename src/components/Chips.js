import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Card from "@material-ui/core/Card";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import TotalExpenseCard from "./TotalExpenseCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  dashboard: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  wrapper: {
    position: "relative",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

export default function Chips() {
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
    setSuccess(true);
  };

  return (
    <>
      <Card className={classes.wrapper} elevation={1}>
        <Typography>
          Shajin sent a request for closing the current expense.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          //   disabled={loading}
          onClick={handleButtonClick}
        >
          Approve
        </Button>
      </Card>
      <Card className={classes.root} elevation={1}>
        <Typography>Approved</Typography>

        <Chip
          avatar={<Avatar>M</Avatar>}
          label="Primary clickable"
          clickable
          color="primary"
          onDelete={handleDelete}
          deleteIcon={<DoneIcon />}
        />
        <Typography>Pending</Typography>
        <Chip
          avatar={<Avatar>M</Avatar>}
          label="Shajin Kuttappan"
          onClick={handleClick}
        />
      </Card>
      <div className={classes.dashboard}>
        <TotalExpenseCard />
      </div>
    </>
  );
}
