import { makeStyles } from "@material-ui/core";
import React from "react";
import { BeatLoader } from "react-spinners";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
}));

function FetchLoader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BeatLoader size={12} loading color="grey" />
    </div>
  );
}

export default FetchLoader;
