// import
import React, { Component } from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import Users from "views/Dashboard/Users";
import Configuration from "views/Dashboard/Configuration";
import AssetCategory from "components2/Configuration/AssetCategory";
import PositionCategory from "components2/Configuration/PositionCategory";
import StatusCategory from "components2/Configuration/StatusCategory";
import Test from "components2/Configuration/Test";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/asset",
    name: "Asset Configuration",
    component: AssetCategory,
    layout: "/admin",
  },
  {
    path: "/position",
    name: "Position",
    component: PositionCategory,
    layout: "/admin",
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Test,
    layout: "/admin",
  },
  {
    path: "/department",
    name: "Department",
    component: Test,
    layout: "/admin",
  },
  {
    path: "/status",
    name: "Status",
    component: StatusCategory,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "Users",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/configuration",
    name: "Configuration",
    component: Configuration,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    layout: "/admin",
  },

  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
