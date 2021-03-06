import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ExpenseList from "../components/ExpenseList";
import TotalExpenseCard from "../components/TotalExpenseCard";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../redux/actions";
import FetchLoader from "../components/FetchLoader";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  secondaryText: {
    fontSize: theme.spacing(3),
    // color: "#ffff",
  },
  members: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, result } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(resetAlert());
    // dispatch(fetchData());
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8} className={classes.root} elevation={1}>
          {!loading ? <TotalExpenseCard /> : <FetchLoader />}
        </Grid>
        <Grid item xs={12} md={2} component={Link} to="/admin/dashboard">
          {!loading && (
            <Card elevation={1} className={classes.members}>
              <Typography variant="body2">
                Active Members : {result.totalMembers}
              </Typography>
            </Card>
          )}
        </Grid>
        {!loading && <ExpenseList />}
      </Grid>
    </>
  );
}

export default Dashboard;
