import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddMovie from "../Pages/AddMovie";
import Index from "../Pages/Index";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import ViewMovie from "../Pages/ViewMovie";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Index} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/view_movie/:id"} component={ViewMovie} />
        <Route exact path={"/add"} component={AddMovie} />
      </Switch>
    </BrowserRouter>
  );
}
