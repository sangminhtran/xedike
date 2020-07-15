import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu";
import UserList from "./components/Users/UserList";
import Register from "./components/Auth/registerUser";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import setHeaders from "./helpers/setHeaders";
import Profile from "./components/Auth/Profile";
import NotFound from "./components/Users/NotFoud";
import { connect } from "react-redux";
import validateToken from "./helpers/validateToken";

if (validateToken().status) {
  setHeaders({ token: localStorage.getItem("token") });
}

function App(props) {
  const { auth } = props;
  const { isAuthenticated } = auth;
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Route
          path="/register"
          exact
          component={isAuthenticated ? NotFound : Register}
        />
        <Route path="/login" exact component={Login} />
        <Route
          path="/profile"
          exact
          component={isAuthenticated ? Profile : NotFound}
        />
        <Route
          path="/users"
          exact
          component={isAuthenticated ? UserList : NotFound}
        />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);

//tạo form login
//tạo action cho login
//dispath action auth
//dispath action isauthenticated
//dispath action profile
