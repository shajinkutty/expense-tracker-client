import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "fixed",
    "& > *": {
      margin: theme.spacing(1),
    },
    position: "fixed",
    bottom: 0,
    right: 0,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();
  const [showFab, setshowFab] = useState(true);
  const location = useLocation();
  const { user } = useSelector((state) => state.expense.result);

  useEffect(() => {
    if (location.pathname !== "/dashboard") {
      setshowFab(false);
    } else {
      setshowFab(true);
    }
  }, [location]);

  return (
    <div className={classes.root}>
      {showFab && user.active && (
        <Fab
          color="secondary"
          aria-label="add"
          href="/addExpense"
          component={Link}
          to="/addExpense"
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
}
