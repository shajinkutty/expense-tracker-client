import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import ExpenseList from "../components/ExpenseList";
import TotalExpenseCard from "../components/TotalExpenseCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  secondaryText: {
    fontSize: theme.spacing(3),
    // color: "#ffff",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8} className={classes.root} elevation={1}>
          <TotalExpenseCard />
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        <ExpenseList />
      </Grid>
    </>
  );
}

export default Dashboard;
