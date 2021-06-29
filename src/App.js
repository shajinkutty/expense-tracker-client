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

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepOrange,
    secondary: lightBlue,
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container className={classes.root}>
            <ApplicationBar />
            <FullScreenDialog open={false} />
            <AlertDialog open={false} />
            <Switch>
              <Route path="/" exact>
                <Dashboard></Dashboard>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/addExpense">
                <AddExpense />
              </Route>
              <Route path="/userExpense">
                <UserExpense />
              </Route>
              <Route path="/changePassword">
                <PasswordChange />
              </Route>
              <Route path="/reports">
                <Reports />
              </Route>
            </Switch>
            <FloatingActionButtons></FloatingActionButtons>
          </Container>
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
