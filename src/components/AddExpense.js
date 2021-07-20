import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, errorHandler } from "../redux/actions";
import { Redirect } from "react-router-dom";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  button: {
    width: "100%",
  },
}));

function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setamount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { alertAction, loading } = useSelector((state) => state.expense);

  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (amount === "") {
      error.message = "Amount must not be empty";
    }
    if (selectedDate === null) {
      error.message = "Date must not be empty";
    }
    if (description === "") {
      error.message = "Description must not be empty";
    }

    if (Object.keys(error).length > 0) {
      dispatch(errorHandler(error.message));
    } else {
      dispatch(addExpense(parseInt(amount), selectedDate, description));
      setSelectedDate(new Date());
      setamount("");
      setDescription("");
    }
  };

  if (!alertAction.open && alertAction.redirect) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                id="filled-number"
                label="Amount"
                type="number"
                variant="outlined"
                fullWidth
                value={amount}
                onChange={(e) => setamount(e.target.value)}
              />

              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Save
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </>
  );
}

export default AddExpense;
