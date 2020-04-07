// Replace any route that needs protection
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

/*
REQUIREMENTS:
1. It has the same API as `<Route />`
2. It renders a `<Route />` and passes all the props through to it.
3. It checks if the user is authenticated, if they are, it renders the "component" prop. If not, it redirects the user to /login.
*/

// rest operator (looks a lot liek spread operator)
const PrivateRoute = ({ component: Component, ...rest }) => {
  // const Component = component;
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props => {
        console.log("PRIVATE-ROUTE:", props);
        if (token) {
          // return the component
          return <Component {...props} />;
        } else {
          // redirect the user to /login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
