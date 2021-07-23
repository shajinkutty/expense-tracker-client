import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_ERROR,
  LOGGED_IN,
  LOGIN_ERROR,
  LOGIN_INIT,
  USER_ACTIVE,
  USER_LOGOUT,
  ERROR_HANDLER,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOADING,
  FETCH_USER_EXPENSE,
  ALERT,
  ALERT_CLOSE,
  CLOSE_EXPENSE,
  RESET_EXPENSE,
  ALERT_RESET,
  APP_START,
  IO_ADD_EXPENSE,
  IO_CLOSE_EXPENSE,
  IO_APPROVE_EXPENSE,
  APPROVE_EXPENSE,
  IO_DELETE_EXPENSE,
  FETCH_USERS,
  CHANGE_USER_STATUS,
  ADD_NEW_USER,
  REJECT_REQUEST,
} from "./types";

import axios from "axios";
import { socket } from "../socket";
// axios.defaults.withCredentials = true;
axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const addNewUser =
  (fullName, userName, password) => (dispatch, getState) => {
    instance
      .post("addUser", {
        fullName,
        userName,
        password,
      })
      .then((res) => {
        dispatch({ type: ADD_NEW_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(errorHandler(err.response.data));
      });
  };

export const userLogin = (userName, password) => (dispatch, getState) => {
  dispatch({ type: LOGIN_INIT });
  instance
    .post("login", {
      userName,
      password,
    })
    .then((res) => {
      dispatch({ type: LOGGED_IN, payload: res.data });
      dispatch(fetchData());
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERROR, error: err.response.data });
    });
};

export const changePassword =
  (currentPassword, newPassword) => (dispatch, getState) => {
    instance
      .post("changePassword", {
        currentPassword,
        newPassword,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(alertAction("Password has been changed", "success"));
      })
      .catch((err) => {
        dispatch(errorHandler(err.response.data));
      });
  };

export const fetchData = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_INIT });
  instance
    .get("dashboard")
    .then((res) => {
      dispatch({ type: FETCH_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ERROR, error: err.response.data });
    });
};

export const checkUserIsActive = () => async (dispatch, getState) => {
  dispatch({ type: APP_START });
  instance
    .get("checkUserActive")
    .then((res) => {
      dispatch({ type: USER_ACTIVE, payload: res.data });
      dispatch(fetchData());
    })
    .catch((err) => {
      dispatch({ type: USER_LOGOUT });
    });
};

export const userLogout = () => async (dispatch, getState) => {
  instance
    .get("logout")
    .then((res) => {
      dispatch({ type: USER_LOGOUT });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERROR });
    });
};

export const addExpense =
  (amount, date, description) => async (dispatch, getState) => {
    dispatch({ type: LOADING });
    instance
      .post("expense/addExpense", {
        amount,
        date,
        description,
      })
      .then((res) => {
        dispatch({ type: ADD_EXPENSE, payload: res.data });
        dispatch(alertAction("Expense Added", "ok only"));
        socket.emit("send-expense", res.data);
      })
      .catch((err) => {
        dispatch({ type: ERROR_HANDLER, message: err.response.data.error });
      });
  };
export const deleteExpense = (id, amount) => (dispatch, getState) => {
  dispatch({ type: ALERT_CLOSE });
  instance
    .delete(`expense/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_EXPENSE, payload: { id, amount } });
      socket.emit("delete-expense", { id, amount });
    })
    .catch((err) => {
      dispatch({ type: ERROR_HANDLER, message: err.response.data.error });
    });
};

export const fetchUserExpense = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  const { expense } = getState();
  const { user } = expense.result;
  instance
    .get(`expense/${user._id}`)
    .then((res) => {
      dispatch({ type: FETCH_USER_EXPENSE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: ERROR_HANDLER, message: err.response.data.error });
    });
};

export const alertAction = (title, type, data) => {
  return { type: ALERT, payload: { title, type, data } };
};
export const alertResponse = (res) => (dispatch, getState) => {
  const { expense } = getState();
  const { alertAction } = expense;
  if (!res) {
    dispatch({ type: ALERT_CLOSE });
  } else {
    switch (alertAction.type) {
      case "delete":
        dispatch(deleteExpense(alertAction.data.id, alertAction.data.amount));
        break;
      case "ok only":
        dispatch({ type: ALERT_CLOSE });
        break;
      case "close expense":
        dispatch(closeExpense());
        break;
      case "success":
        dispatch({ type: ALERT_CLOSE });
        break;
      case "reject request":
        dispatch(rejectRequest());
        break;
      default:
        break;
    }
  }
};
export const errorHandler = (message) => {
  return {
    type: ERROR_HANDLER,
    message,
  };
};

export const closeExpense = () => (dispatch, getState) => {
  dispatch({ type: ALERT_CLOSE });
  instance
    .post("closeExpense")
    .then((res) => {
      dispatch({ type: CLOSE_EXPENSE, payload: res.data });
      socket.emit("close-expense", res.data);
    })
    .catch((err) => {
      dispatch({ type: ERROR_HANDLER, message: err.response.data.error });
    });
};

export const approveExpense = () => (dispatch, getState) => {
  const { result } = getState().expense;
  const { closeAction } = result;
  instance
    .patch(`closeExpense/approved/${closeAction._id}`)
    .then((res) => {
      dispatch({ type: APPROVE_EXPENSE, payload: res.data });
      socket.emit("approve-expense", res.data);
      // dispatch(fetchData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const resetExpense = () => {
  return { type: RESET_EXPENSE };
};

export const resetAlert = () => {
  return { type: ALERT_RESET };
};

export const socketExpenseUpdate = (data) => {
  return { type: IO_ADD_EXPENSE, payload: data };
};
export const socketCloseExpense = (data) => {
  return { type: IO_CLOSE_EXPENSE, payload: data };
};
export const socketApproveExpense = (data) => {
  return { type: IO_APPROVE_EXPENSE, payload: data };
};
export const socketDeleteExpense = (id, amount) => {
  return { type: IO_DELETE_EXPENSE, payload: { id, amount } };
};
export const socketChangeUserStatus = (id, currentStatus) => {
  return { type: CHANGE_USER_STATUS, payload: { id, currentStatus } };
};
export const fetchUsers = () => (dispatch, getState) => {
  instance
    .get("/users")
    .then((res) => {
      dispatch({ type: FETCH_USERS, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
export const changeUserStatus = (id, currentStatus) => (dispatch, getstate) => {
  instance
    .post("switchUserStatus", {
      userId: id,
    })
    .then((res) => {
      dispatch({ type: CHANGE_USER_STATUS, payload: { id, currentStatus } });
      socket.emit("change-user-status", { id, currentStatus });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const rejectRequest = () => (dispatch, getState) => {
  dispatch({ type: ALERT_CLOSE });
  instance
    .delete("closeExpense/deleteCloseRequest")
    .then((res) => {
      dispatch({ type: REJECT_REQUEST });
      socket.emit("reject-request", res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
