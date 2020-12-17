import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import List from "pages/List";
import Details from "pages/Details";

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/characters">
        <List />
      </Route>
      <Route path="/characters/:id">
        <Details />
      </Route>
      <Redirect to="/characters" />
    </Switch>
  );
};

export default Pages;
