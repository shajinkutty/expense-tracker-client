import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { checkUserIsActive, userLogin } from "../redux/actions";
import { useHistory } from "react-router-dom";
import LoadingSpinners from "../components/LoadingSpinner";
import FetchLoader from "../components/FetchLoader";

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
  const dispatch = useDispatch();
  const { loading, pageLoading, authenticated } = useSelector(
    (state) => state.expense
  );
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      history.push("/dashboard");
    }
  }, [authenticated, history]);

  useEffect(() => {
    dispatch(checkUserIsActive());
  }, [dispatch]);

  if (pageLoading) {
    return <LoadingSpinners />;
  }
  return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3}>
          <div className="Login">
            <p>Use below login credentials</p>
            <ul>
              <li>
                <p>Username : user1</p>
                <p>password : user1234</p>
              </li>
              <li>
                <p>Username : user2</p>
                <p>password : user1234</p>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <form noValidate autoComplete="off">
            <TextField
              id="username"
              label="User Name"
              variant="outlined"
              className={classes.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              id="password"
              label="Passwod"
              variant="outlined"
              className={classes.input}
              type="password"
              vlue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.button}
              onClick={() => dispatch(userLogin(userName, password))}
            >
              sign in
            </Button>
          </form>
          {loading && <FetchLoader />}
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </Container>
  );
}

export default Login;
