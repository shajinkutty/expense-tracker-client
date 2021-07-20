import { makeStyles } from "@material-ui/core";
import React from "react";
import { PuffLoader } from "react-spinners";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function LoadingSpinners() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PuffLoader color="grey" loading size={100}></PuffLoader>
    </div>
  );
}

export default LoadingSpinners;
