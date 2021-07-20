import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { deepOrange, lightBlue } from "@material-ui/core/colors";
import ApplicationBar from "./components/AppBar";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import FloatingActionButtons from "./components/FloatingActionButtons";
import AddExpense from "./components/AddExpense";
// for date picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import UserExpense from "./routes/UserExpense";
import PasswordChange from "./routes/PasswordChange";
import Reports from "./routes/Reports";
import AlertDialog from "./components/AlertDialog";
import FullScreenDialog from "./components/FullScreenDialog";

import { useDispatch } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import CustomizedSnackbars from "./components/CustomizedSnackbar";
import { useEffect } from "react";
import { socket } from "./socket";
import {
  socketApproveExpense,
  socketCloseExpense,
  socketDeleteExpense,
  socketExpenseUpdate,
} from "./redux/actions";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
    secondary: deepOrange,
  },
  props: {
    MuiCard: {
      elevation: 5,
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    marginTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
  },
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receive-expense", (data) => {
      dispatch(socketExpenseUpdate(data));
    });
    socket.on("receive-close-expense", (data) => {
      dispatch(socketCloseExpense(data));
    });
    socket.on("receive-approve-expense", (data) => {
      dispatch(socketApproveExpense(data));
    });
    socket.on("receive-delete-expense", ({ id, amount }) => {
      dispatch(socketDeleteExpense(id, amount));
    });
    return () => {
      socket.off();
    };
  }, [dispatch]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container className={classes.root}>
            <ApplicationBar />
            <FullScreenDialog open={false} />
            <AlertDialog />
            <Switch>
              <PrivateRoute path="/dashboard">
                <Dashboard></Dashboard>
              </PrivateRoute>
              <PrivateRoute path="/addExpense">
                <AddExpense></AddExpense>
              </PrivateRoute>
              <PrivateRoute path="/userExpense">
                <UserExpense></UserExpense>
              </PrivateRoute>
              <PrivateRoute path="/changePassword">
                <PasswordChange></PasswordChange>
              </PrivateRoute>
              <PrivateRoute path="/reports">
                <Reports></Reports>
              </PrivateRoute>
              <Route path="/" exact>
                <Login></Login>
              </Route>
            </Switch>
            <FloatingActionButtons></FloatingActionButtons>
            <CustomizedSnackbars />
          </Container>
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
