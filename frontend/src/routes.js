/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      update FROM : import Department from "components2/Configuration/Department";
             TO   : import DepartmentViewer from "components2/Configuration/DepartmentViewer";
           Reason : Reuse the previous components

      new function LoadAllStatus - use in useEffect and Delete Function
      new function handleDelete for ( Delete asste by Stat ID )

*/

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

//Activity User submenus pages
import User from "components2/Activity/User";
import CheckIn from "components2/Activity/CheckIn";
import CheckOut from "components2/Activity/CheckOut";
import PullOut from "components2/Activity/PullOut";

// Configuration submenus pages
import AssetCategory from "components2/Configuration/AssetCategory";
import PositionCategory from "components2/Configuration/PositionCategory";
import StatusCategory from "components2/Configuration/StatusCategory";

import Suppliers from "components2/Configuration/Suppliers";
import UpdateProfile from "components2/Profile/UpdateProfile";

import AssetStatusViewer from "components2/Configuration/AssetStatusViewer";
import AssetStatus from "components2/views/AssetStatus";
import DepartmentViewer from "components2/Configuration/DepartmentViewer";
import Department from "components2/views/Department";


import CreateStatusViewer from "components2/views/CreateStatusViewer";

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
    component: Dashboard,
    layout: "/admin",
  },
  // Activity Menu
  {
    submenu: "activity",
    path: "/user-profile",
    name: "Profile",
    component: User,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/update-profile",
    name: "Update Profile",
    component: UpdateProfile,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/check-in",
    name: "Check In",
    component: CheckIn,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/check-out",
    name: "Check Out",
    component: CheckOut,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/pull-out",
    name: "Pull Out",
    component: PullOut,
    layout: "/admin",
  },
  // End Activity Menu

  // Configuration Menu
  {
    submenu: "configuration",
    path: "/department-viewer",
    name: "Department",
    component: DepartmentViewer,
    layout: "/admin",
  },
  {
    path: "/department",
    name: "Create Department",
    component: Department,
    layout: "/admin",
  },

  {
    submenu: "configuration",
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
    layout: "/admin",
  },
  {
    submenu: "configuration",
    path: "/asset",
    name: "Asset Configuration",
    component: AssetCategory,
    layout: "/admin",
  },
  {
    submenu: "configuration",
    path: "/position",
    name: "Position",
    component: PositionCategory,
    layout: "/admin",
  },

  {
    submenu: "configuration",
    path: "/assetstatusviewer",
    name: "Asset Status",
    icon: <HomeIcon color="inherit" />,
    component: AssetStatusViewer,
    layout: "/admin",
  },
  {
    path: "/assetstatus",
    name: "Create Assets Status",
    component: AssetStatus,
    layout: "/admin",
  },
  {
    submenu: "configuration",
    path: "/status",
    name: "Status",
    component: StatusCategory,
    layout: "/admin",
  },
  // {
  //   path: "/createAssets",
  //   name: "Create Assets Status",
  //   component: CreateStatusViewer,
  //   layout: "/admin",
  // },

  // End Configuration Menu
  {
    path: "/tables",
    name: "Tables",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
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
