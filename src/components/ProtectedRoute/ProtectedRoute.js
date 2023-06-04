import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  if(props.loggedIn) {
    return(<Component {...props} />)
  }
  return(<Navigate to={'/'} />)
  // return (
  //   // <Route >
  //   //   {props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
  //   // </Route>
  // );
};

export default ProtectedRoute;
