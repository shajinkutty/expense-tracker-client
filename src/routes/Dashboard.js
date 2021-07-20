import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import ExpenseList from "../components/ExpenseList";
import TotalExpenseCard from "../components/TotalExpenseCard";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../redux/actions";
import FetchLoader from "../components/FetchLoader";

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
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(resetAlert());
  }, [dispatch]);

  // useEffect(() => {
  //   socket.on("receive-expense", (data) => {
  //     console.log("new exp:", data);
  //     dispatch(socketExpenseUpdate(data));
  //   });
  //   socket.on("receive-close-expense", (data) => {
  //     console.log("close exp:", data);
  //     dispatch(socketCloseExpense(data));
  //   });
  //   socket.on("receive-approve-expense", (data) => {
  //     console.log("approved");
  //   });
  //   return () => {
  //     socket.off();
  //   };
  // }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8} className={classes.root} elevation={1}>
          {!loading ? <TotalExpenseCard /> : <FetchLoader />}
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        {!loading && <ExpenseList />}
      </Grid>
    </>
  );
}

export default Dashboard;
