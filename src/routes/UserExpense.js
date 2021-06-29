import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import ExpenseCard from "../components/ExpenseCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    width: "100%",
  },
}));

function UserExpense() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} md={2}></Grid>
      <Grid item xs={12} md={8} className={classes.item}>
        <ExpenseCard />
      </Grid>
      <Grid item xs={12} md={2}></Grid>
    </Grid>
  );
}

export default UserExpense;
