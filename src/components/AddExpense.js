import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import SaveIcon from "@material-ui/icons/Save";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
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
}));

function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setamount] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount, description, selectedDate);
  };
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
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </>
  );
}

export default AddExpense;
