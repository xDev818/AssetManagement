/* 

    Date : 10 / 13 / 23
    Author : Jinshin
    Activities
    Purpose : 
      Previous Set By Noel = axios.defaults.baseURL = 'http://localhost:3001/api'
      Now Set By Jinshin = axios.defaults.baseURL = 'http://localhost:5000/api'
        - Reason: Having confict with frontend running at 3000 or 3001 with server running at 3001

*/

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5001/api'

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
