/* 

    Date : 10 / 13 / 23
    Author : Jinshin
    Activities
    Purpose : 
      Previous Set By Noel = axios.defaults.baseURL = 'http://localhost:3001/api'
      Now Set By Jinshin = axios.defaults.baseURL = 'http://localhost:5000/api'
        - Reason: Having confict with frontend running at 3000 or 3001 with server running at 3001

    Date : 10 / 15 / 23
    Author : Nole
    Activities
    Purpose : 
      Update FROM : import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
      Update TO : import { HashRouter,Route,Switch,Redirect } from "react-router-dom/cjs/react-router-dom.min";
      ** Unable to locate in local machine "react-router-dom";
      ** Downgrade react-router-dom to 5.2.1 
      npm i react-router-dom@5.2.1
*/

import React from "react";
import ReactDOM from "react-dom";
//import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";

import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";
import Configuration from "views/Dashboard/Configuration";
import Dummy from "views/Dashboard/Dummy";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/api";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        {/* {!token ? <Redirect from={`/signin`} to="/admin/dashboard" />: null} */}
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/admin/position/:id`} component={AdminLayout} />
        {/* <Route path={`/admin/configuration`} component={Configuration} /> */}
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
