import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import ExpenseCard from "./ExpenseCard";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function ExpenseList() {
  const classes = useStyles();
  const { expenseData } = useSelector((state) => state.expense.result);

  return (
    <Grid container>
      <Grid item xs={12} md={2}></Grid>
      <Grid item xs={12} md={8} className={classes.item}>
        {expenseData &&
          expenseData.map((expense) => (
            <ExpenseCard key={expense._id} {...expense}></ExpenseCard>
          ))}
        {expenseData.length === 0 && "No Expense"}
      </Grid>
      <Grid item xs={12} md={2}></Grid>
    </Grid>
  );
}

export default ExpenseList;
