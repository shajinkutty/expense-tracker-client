import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

function Login() {
  const classes = useStyles();
  return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <form noValidate autoComplete="off">
            <TextField
              id="username"
              label="User Name"
              variant="outlined"
              className={classes.input}
            />
            <TextField
              id="password"
              label="Passwod"
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
              sign in
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </Container>
  );
}

export default Login;
