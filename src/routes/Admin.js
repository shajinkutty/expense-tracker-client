import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewUser,
  changeUserStatus,
  errorHandler,
  fetchUsers,
} from "../redux/actions";
import FetchLoader from "../components/FetchLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  box: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  form: {
    width: "100%",
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
function Admin() {
  const { users, result } = useSelector((state) => state.expense);
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (id, status) => {
    dispatch(changeUserStatus(id, status));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (password === "") {
      error.message = "Password must not be empty";
    }
    if (userName === "") {
      error.message = "User Name must not be empty";
    }
    if (fullName === "") {
      error.message = "Full Name must not be empty";
    }

    if (Object.keys(error).length > 0) {
      dispatch(errorHandler(error.message));
    } else {
      dispatch(addNewUser(fullName, userName, password));
      setFullName("");
      setUserName("");
      setPassword("");
    }
  };

  return (
    <>
      <Card className={classes.root} elevation={1}>
        <div className={classes.box}>
          <Typography variant="body2">User Name</Typography>
          <Typography variant="body2">Active</Typography>
        </div>
        {users ? (
          users.map((user) => (
            <div className={classes.box} key={user._id}>
              <Chip
                avatar={<Avatar>S</Avatar>}
                label={user.fullName}
                color="primary"
                disabled={!user.active}
              />
              <Switch
                checked={user.active}
                onChange={() => handleChange(user._id, user.active)}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
                disabled={result.user._id === user._id}
              />
            </div>
          ))
        ) : (
          <FetchLoader />
        )}
      </Card>
      <Card className={classes.root} elevation={1}>
        <Typography variant="body2">Add New User</Typography>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            className={classes.input}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            id="userName"
            label="User Name"
            variant="outlined"
            className={classes.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            className={classes.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.button}
            onClick={handleSubmit}
          >
            create user
          </Button>
        </form>
      </Card>
    </>
  );
}

export default Admin;
