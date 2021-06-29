import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(5),
    flexGrow: 1,
  },
  input: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(3),
    height: theme.spacing(6),
  },
}));

function PasswordChange() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <form noValidate autoComplete="off">
          <TextField
            id="currentPassword"
            label="Your Password"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            id="password"
            label="New Password"
            variant="outlined"
            className={classes.input}
            type="password"
          />
          <TextField
            id="password2"
            label="Retype password"
            variant="outlined"
            className={classes.input}
            type="password"
          />
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.button}
          >
            Change Password
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} md={2}></Grid>
    </Grid>
  );
}

export default PasswordChange;
