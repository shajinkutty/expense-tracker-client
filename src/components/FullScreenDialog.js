import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Chips from "./Chips";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { result, loading } = useSelector((state) => state.expense);

  useEffect(() => {
    if (!loading && !result.isLive) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [result, loading]);

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Expense Closed
            </Typography>
          </Toolbar>
        </AppBar>
        {open && <Chips />}
      </Dialog>
    </div>
  );
}
