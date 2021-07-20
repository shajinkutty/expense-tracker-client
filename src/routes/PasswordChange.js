import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { changePassword, errorHandler } from "../redux/actions";

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

  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setrePassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (rePassword === "") {
      error.message = "Retype password must not be empty";
    }
    if (newPassword === "") {
      error.message = "New Password must not be empty";
    }
    if (currentPassword === "") {
      error.message = "Password must not be empty";
    }
    if (newPassword !== rePassword) {
      error.message = "Password not matching";
    }

    if (Object.keys(error).length > 0) {
      dispatch(errorHandler(error.message));
    } else {
      dispatch(changePassword(currentPassword, newPassword));
      setcurrentPassword("");
      setNewPassword("");
      setrePassword("");
    }
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <form noValidate autoComplete="off">
          <TextField
            id="currentPassword"
            label="Your Password"
            variant="outlined"
            type="password"
            className={classes.input}
            value={currentPassword}
            onChange={(e) => setcurrentPassword(e.target.value)}
          />
          <TextField
            id="password1"
            label="New Password"
            variant="outlined"
            className={classes.input}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            id="password2"
            label="Retype password"
            variant="outlined"
            className={classes.input}
            type="password"
            value={rePassword}
            onChange={(e) => setrePassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.button}
            onClick={handleSubmit}
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
