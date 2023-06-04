import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  if(!props.loggedIn) {
    return(<Navigate to={'/'} />)
  }
  return(<Component {...props} />)
  // return (
  //   // <Route >
  //   //   {props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
  //   // </Route>
  // );
};

export default ProtectedRoute;
