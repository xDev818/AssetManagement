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

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/asset",
    name: "Asset Configuration",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: AssetCategory,
    layout: "/admin",
  },
  {
    path: "/position",
    name: "Position",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PositionCategory,
    layout: "/admin",
  },
  {
    path: "/status",
    name: "Status",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: StatusCategory,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: <HomeIcon color="inherit" />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/configuration",
    name: "Configuration",
    icon: <HomeIcon color="inherit" />,
    component: Configuration,
    layout: "/admin",
    submenu: [
      {
        path: "/subitem1",
        name: "Subitem 1",
        // ... other properties for subitem 1
        component: Configuration,
      },
      {
        path: "/subitem2",
        name: "Subitem 2",
        // ... other properties for subitem 2
        component: Configuration,
      },
    ],
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },

  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
