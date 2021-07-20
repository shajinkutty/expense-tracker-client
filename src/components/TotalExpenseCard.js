import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

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
  circle: {
    // width: 150,
    // height: 150,
    // borderRadius: "50%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    // backgroundColor: pink[600],
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: "10px",
    textTransform: "uppercase",
  },
  text: {
    fontSize: theme.spacing(5),
    // color: "#ffff",
  },
  green: {
    color: "#03ff03",
  },
  red: {
    color: "red",
  },
}));

function TotalExpenseCard() {
  const classes = useStyles();
  const { result } = useSelector((state) => state.expense);
  const { LiveTotalAmount, userExpense, totalMembers } = result;

  useEffect(() => {}, [result]);

  const position = () =>
    (userExpense - LiveTotalAmount / totalMembers).toFixed(2);
  return (
    <>
      <Grid item xs={6}>
        <Paper className={classes.circle}>
          <Typography className={classes.label}>Total Expense</Typography>
          <Typography className={classes.text} color="secondary">
            {LiveTotalAmount ? LiveTotalAmount : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.circle} elevation={1}>
          <Typography className={classes.label}>Your Contribution</Typography>
          <Typography className={classes.secondaryText} color="textPrimary">
            {userExpense ? userExpense : 0}
          </Typography>
          <Typography className={classes.label}>Status</Typography>
          <Typography className={position() >= 0 ? classes.green : classes.red}>
            {position() ? position() : 0}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default TotalExpenseCard;
