import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import ExpenseCard from "../components/ExpenseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserExpense } from "../redux/actions";
import LoadingSpinners from "../components/LoadingSpinner";

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
  const { userExpense, loading, pageLoading } = useSelector(
    (state) => state.expense
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserExpense());
  }, [dispatch]);

  if (pageLoading) {
    return <LoadingSpinners />;
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8} className={classes.item}>
          {!loading &&
            userExpense.map((expense) => (
              <ExpenseCard key={expense._id} {...expense}></ExpenseCard>
            ))}
          {userExpense.length === 0 && <Typography>No Data</Typography>}
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </>
  );
}

export default UserExpense;
