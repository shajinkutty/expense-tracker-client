import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import { green } from "@material-ui/core/colors";
import TotalExpenseCard from "./TotalExpenseCard";
import { useDispatch, useSelector } from "react-redux";
import { alertAction, approveExpense, resetExpense } from "../redux/actions";

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
  dashboard: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  wrapper: {
    position: "relative",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  closeButton: {
    margin: theme.spacing(3),
    height: theme.spacing(8),
  },
}));

export default function Chips() {
  const classes = useStyles();
  const [userApproved, setuserApproved] = useState(false);
  const { result, loading } = useSelector((state) => state.expense);
  const { user, closeAction } = result;
  const { requesterId, approverId } = closeAction;
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(approveExpense());
  };

  useEffect(() => {
    const checkUserApproved = () => {
      if (approverId) {
        for (let i = 0; i < approverId.length; i++) {
          if (approverId[i]._id === user._id) {
            setuserApproved(true);
            break;
          }
        }
      }
    };
    checkUserApproved();
  }, [approverId, user]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!approverId) {
    return dispatch(resetExpense());
  }

  return (
    <>
      <Card className={classes.wrapper} elevation={1}>
        {user._id && user._id !== requesterId ? (
          userApproved ? (
            <Typography>You have approved</Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              //   disabled={loading}
              onClick={handleButtonClick}
            >
              Approve
            </Button>
          )
        ) : (
          <Typography>Waiting for users approval</Typography>
        )}
      </Card>
      <Card className={classes.root} elevation={1}>
        <Typography>
          Approved Members ({approverId.length} / {result.totalMembers})
        </Typography>
        {approverId &&
          approverId.map((approver, index) => (
            <Chip
              key={approver._id}
              avatar={<Avatar>{approver.fullName[0]}</Avatar>}
              label={approver.fullName}
              clickable
              color="primary"
            />
          ))}

        {/* <Typography>Pending</Typography>
        <Chip
          avatar={<Avatar>M</Avatar>}
          label="Shajin Kuttappan"
          onClick={handleClick}
        /> */}
      </Card>
      <div className={classes.dashboard}>
        <TotalExpenseCard />
      </div>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.closeButton}
        onClick={() => {
          dispatch(
            alertAction(
              "Are you sure you want to reject the request?",
              "reject request"
            )
          );
        }}
      >
        Reject Request
      </Button>
    </>
  );
}
