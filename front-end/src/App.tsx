import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import User from "./pages/UserManagement/EditUser";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <UserManagement />
        </Route>
        <Route path="/user/:id">
          <User />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
