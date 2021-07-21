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
  ALERT_RESPONSE,
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
} from "./types";

const initialState = {
  loading: false,
  pageLoading: false,
  authenticated: false,
  result: {
    user: {
      _id: "",
      fullName: "",
      userName: "",
    },
    LiveTotalAmount: 0,
    userExpense: 0,
    expenseData: [],
    closeAction: {
      approverId: [],
      _id: "",
      requesterId: "",
      totalApprovar: 0,
    },
    isLive: true,
  },

  userExpense: [],
  users: [],

  alertAction: {
    title: "",
    open: false,
    response: false,
    redirect: false,
    type: "",
    data: {},
  },
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        pageLoading: true,
        authenticated: false,
      };
    case LOADING:
      return {
        ...state,
        pageLoading: true,
        loading: true,
      };
    case LOGIN_INIT:
      return {
        ...state,
        loading: true,
        authenticated: false,
      };
    case LOGGED_IN:
      return {
        ...state,
        authenticated: true,
      };

    case LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };
    case USER_ACTIVE:
      return {
        ...state,
        loading: false,
        pageLoading: false,
        authenticated: true,
      };
    case USER_LOGOUT:
      return initialState;

    case CHANGE_USER_STATUS:
      let tempUsers = [...state.users];
      if (tempUsers.length > 0) {
        const userIndex = state.users.findIndex(
          (user) => user._id === action.payload.id
        );
        tempUsers[userIndex] = {
          ...tempUsers[userIndex],
          active: !tempUsers[userIndex].active,
        };
        return {
          ...state,
          users: tempUsers,
          result: {
            ...state.result,
            totalMembers: action.payload.currentStatus
              ? state.result.totalMembers - 1
              : state.result.totalMembers + 1,
            user: {
              ...state.result.user,
              active:
                state.result.user._id === action.payload.id
                  ? !state.result.user.active
                  : state.result.user.active,
            },
          },
        };
      } else {
        return {
          ...state,
          result: {
            ...state.result,
            totalMembers: action.payload.currentStatus
              ? state.result.totalMembers - 1
              : state.result.totalMembers + 1,
            user: {
              ...state.result.user,
              active:
                state.result.user._id === action.payload.id
                  ? !state.result.user.active
                  : state.result.user.active,
            },
          },
        };
      }

    case ADD_NEW_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        result: {
          ...state.result,
          totalMembers: state.result.totalMembers + 1,
        },
      };

    case FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        result: action.payload,
        error: "",
      };
    case FETCH_USER_EXPENSE:
      return {
        ...state,
        loading: false,
        pageLoading: false,
        userExpense: action.payload,
      };
    case ADD_EXPENSE:
      const newExpenseData = [...state.result.expenseData, action.payload];
      return {
        ...state,
        loading: false,
        pageLoading: false,
        result: {
          ...state.result,
          LiveTotalAmount: state.result.LiveTotalAmount + action.payload.amount,
          userExpense: state.result.userExpense + action.payload.amount,
          expenseData: newExpenseData.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ),
        },
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        alertAction: {
          title: "",
          open: false,
          response: false,
          redirect: false,
          type: "",
          data: {},
        },
        result: {
          ...state.result,
          expenseData: state.result.expenseData.filter(
            (expense) => expense._id !== action.payload.id
          ),
          LiveTotalAmount: state.result.LiveTotalAmount - action.payload.amount,
          userExpense: state.result.userExpense - action.payload.amount,
        },
        userExpense: state.userExpense.filter(
          (expense) => expense._id !== action.payload.id
        ),
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.error,
      };

    case ERROR_HANDLER:
      return {
        ...state,
        error: action.message,
      };
    case ALERT:
      return {
        ...state,
        alertAction: {
          title: action.payload.title,
          open: true,
          response: false,
          redirect: true,
          type: action.payload.type,
          data: action.payload.data,
        },
      };
    case ALERT_RESPONSE: {
      return {
        ...state,
        alertAction: {
          title: "",
          open: false,
          response: action.payload,
        },
      };
    }

    case ALERT_CLOSE:
      return {
        ...state,
        alertAction: {
          title: "",
          open: false,
          response: false,
          redirect: true,
          type: "",
          data: {},
        },
      };
    case ALERT_RESET:
      return {
        ...state,
        alertAction: {
          title: "",
          open: false,
          response: false,
          redirect: false,
          type: "",
          data: {},
        },
      };
    case CLOSE_EXPENSE:
      return {
        ...state,
        result: {
          ...state.result,
          closeAction: action.payload,
          isLive: false,
        },
      };
    case APPROVE_EXPENSE:
      if (action.payload.approverId.length === action.payload.totalApprovar) {
        return {
          ...state,
          result: {
            ...state.result,
            expenseData: [],
            LiveTotalAmount: 0,
            userExpense: 0,
            closeAction: {
              approverId: [],
              _id: "",
              requesterId: "",
              totalApprovar: 0,
            },
            isLive: true,
          },
          userExpense: [],
        };
      } else {
        return {
          ...state,
          result: {
            ...state.result,
            closeAction: action.payload,
            isLive: false,
          },
        };
      }

    case RESET_EXPENSE:
      return {
        ...state,
        result: {
          ...state.result,
          expenseData: [],
          closeAction: {
            approverId: [],
            _id: "",
            requesterId: "",
            totalApprovar: 0,
          },
          isLive: true,
        },
        userExpense: [],
      };
    case IO_ADD_EXPENSE:
      const userExpenseData = [...state.result.expenseData, action.payload];
      return {
        ...state,
        result: {
          ...state.result,
          LiveTotalAmount: state.result.LiveTotalAmount + action.payload.amount,
          expenseData: userExpenseData.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ),
        },
      };

    case IO_CLOSE_EXPENSE:
      return {
        ...state,
        result: {
          ...state.result,
          closeAction: action.payload,
          isLive: false,
        },
      };

    case IO_APPROVE_EXPENSE:
      if (action.payload.approverId.length === action.payload.totalApprovar) {
        console.log("init");
        return {
          ...state,
          result: {
            ...state.result,
            expenseData: [],
            LiveTotalAmount: 0,
            userExpense: 0,
            closeAction: {
              approverId: [],
              _id: "",
              requesterId: "",
              totalApprovar: 0,
            },
            isLive: true,
          },
          userExpense: [],
        };
      } else {
        console.log("pending");
        return {
          ...state,
          result: {
            ...state.result,
            closeAction: action.payload,
            isLive: false,
          },
        };
      }

    case IO_DELETE_EXPENSE:
      return {
        ...state,
        alertAction: {
          title: "",
          open: false,
          response: false,
          redirect: false,
          type: "",
          data: {},
        },
        result: {
          ...state.result,
          expenseData: state.result.expenseData.filter(
            (expense) => expense._id !== action.payload.id
          ),
          LiveTotalAmount: state.result.LiveTotalAmount - action.payload.amount,
        },
      };

    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
