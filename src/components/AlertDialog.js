import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { alertResponse } from "../redux/actions";

export default function AlertDialog({ clickYes }) {
  const { title, open, type } = useSelector(
    (state) => state.expense.alertAction
  );
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          {type === "ok only" || type === "success" ? null : (
            <Button
              color="secondary"
              onClick={() => dispatch(alertResponse(false))}
            >
              No
            </Button>
          )}
          <Button
            color="primary"
            autoFocus
            onClick={() => dispatch(alertResponse(true))}
          >
            {type === "ok only" || type === "success" ? "OK" : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
