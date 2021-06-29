import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ExpenseCard from "../components/ExpenseCard";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    // padding: theme.spacing(5),
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },

  button: {
    width: theme.spacing(8),
    marginTop: theme.spacing(3),
    height: theme.spacing(6),
  },
}));

function Reports() {
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());
  const classes = useStyles();

  const handleFromDateChange = (date) => {
    setSelectedDateFrom(date);
  };
  const handleToDateChange = (date) => {
    setSelectedDateTo(date);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Card className={classes.card} elevation={1}>
          <form noValidate autoComplete="off" className={classes.form}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-from"
              label="From"
              format="MM/dd/yyyy"
              value={selectedDateFrom}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-to"
              label="To"
              format="MM/dd/yyyy"
              value={selectedDateTo}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        </Card>

        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
      </Grid>
      <Grid item xs={12} md={2}></Grid>
    </Grid>
  );
}

export default Reports;
