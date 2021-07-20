import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const { authenticated } = useSelector((state) => state.expense);

  return (
    <Route
      {...rest}
      render={() => {
        return authenticated === true ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
}

export default PrivateRoute;
