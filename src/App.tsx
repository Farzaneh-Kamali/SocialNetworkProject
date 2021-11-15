import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Follow } from "./pages/Follow/Follow";
import { Register } from "./pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import { MessagePage } from "./pages/Message/MessagePage";
import { ComponyHome } from "./pages/Home/ComponyHome";
import {CompanyRegister} from "./pages/CompanyRegister/CompanyRegister";
import {UserRegister} from "./pages/UserRegister/UserRegister";

interface AppProps {}

interface AppState {}
let loggedin: boolean;

export const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  private?: boolean;
}> = (props) => {
  const loginState = sessionStorage.getItem("loginState");

  return loginState === "loggedIn" ? (
    <>
      <NavBar />
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    </>
  ) : props.private ? (
    <Route path={props.path} exact={props.exact} component={Login} />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div dir="rtl" className="bg-backGroundColor">
        <Switch>
          <PrivateRoute private exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/company_register" component={CompanyRegister} />
          <Route exact path="/user_register" component={UserRegister} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/companyhome" component={ComponyHome} />
          <PrivateRoute exact path="/message" component={MessagePage} />
          <PrivateRoute exact path="/follow" component={Follow} />

          {/*
            <Route exact path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
