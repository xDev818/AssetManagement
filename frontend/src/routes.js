/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      update FROM : import Department from "components2/Configuration/Department";
             TO   : import DepartmentViewer from "components2/Configuration/DepartmentViewer";
           Reason : Reuse the previous components

      import AssetStatusViewer from "components2/Configuration/AssetStatusViewer";
      import AssetStatus from "components2/views/AssetStatus";
      import DepartmentViewer from "components2/Configuration/DepartmentViewer";
      import Department from "components2/views/Department";
      import PositionViewer from "components2/Configuration/PositionViewer";


      REMOVE
        {
          submenu: "configuration",
          path: "/status",
          name: "Status",
          component: StatusCategory,
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

        REMOVE
      //import CreateStatusViewer from "components2/views/CreateStatusViewer";
      //import StatusCategory from "components2/Configuration/StatusCategory";
      //import PositionCategory from "components2/Configuration/PositionCategory";
      //import AssetCategory from "components2/Configuration/AssetCategory";

      Date : 10 / 19 / 23
      Author : Nole
      Activities
      Purpose : 

        Add - import AssetCategoryViewer from "components2/Configuration/AssetCategoryViewer";
        Add - import AssetCategory from "components2/views/AssetCategory";

       ***  New Menu ***
          {
          submenu: "configuration",
          path: "/assetscategory-viewer",
          name: "Asset Category",
          icon: <HomeIcon color="inherit" />,
          component: AssetCategoryViewer,
          layout: "/admin",
        },
        {
          path: "/assetcategory",
          name: "Create Assets Category",
          component: AssetCategory,
          layout: "/admin",
        },
      ***** End creating menu

    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 

        import UserGroupViewer from "components2/Configuration/UserGroupViewer";
        import UserGroup from "components2/views/UserGroup";

        Remove :
          // {
          //   path: "/createAssets",
          //   name: "Create Assets Status",
          //   component: CreateStatusViewer,
          //   layout: "/admin",
          // },
          // 

      *** New menu ***

          {
          submenu: "configuration",
          path: "/assetstype-viewer",
          name: "Asset Type",
          icon: <HomeIcon color="inherit" />,
          component: AssetCategoryViewer,
          layout: "/admin",
        },
        {
          path: "/assettype",
          name: "Create Assets Type",
          component: AssetCategory,
          layout: "/admin",
        },
        {
          submenu: "configuration",
          path: "/usergroup-viewer",
          name: "User Group",
          icon: <HomeIcon color="inherit" />,
          component: AssetCategoryViewer,
          layout: "/admin",
        },
        {
          path: "/usergroup",
          name: "Create User Group",
          component: AssetCategory,
          layout: "/admin",
        },
      *** end menu 

    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 

      import AssetTypeViewer from "components2/Configuration/AssetTypeViewer";
      import AssetType from "components2/views/AssetType";

      {
          submenu: "configuration",
          path: "/assetstype-viewer",
          name: "Asset Type",
          icon: <HomeIcon color="inherit" />,
          component: AssetTypeViewer,
          layout: "/admin",
        },
        {
          path: "/assettype",
          name: "Create Assets Type",
          component: AssetType,
          layout: "/admin",
        },


    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 
        update Checkout componet 
          FROM : import CheckOut from 'components2/Activity/CheckOut'
            TO : import ITCheckOut from 'components2/Activity/ITCheckOut'


    Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
          New MEnu functionality
            {
              submenu: "activity",
              path: "/checkin-viewer",
              name: "Check In",
              component: UserCheckin_Viewer,
              layout: "/admin",
            },

    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
          import UserAssetsViewer from "components2/Activity/UserAssetsViewer";

    Date : 01 / 03 / 23
    Author : Nole
    Activities
    Purpose : 
    {
      
      path: "/pullout-viewer",
      name: "Pullout Viewer",
      component: PulloutViewer,
      layout: "/admin",
    },

    Date : 01 / 04 / 23
    Author : Nole
    Activities
    Purpose : 
      import ITPulloutViewer from "components2/Activity/ITPulloutViewer";
      {
        submenu: "activity",
        path: "/assetpullout-viewer",
        name: "Pullout",
        component: ITPulloutViewer,
        layout: "/admin",
      },
*/

// import
import React, { Component } from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
//import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import Users from "views/Dashboard/Users";
import Configuration from "views/Dashboard/Configuration";

//Activity User submenus pages

//import PullOut from "components2/Activity/PullOut";
import AssetViewer from "components2/Activity/AssetViewer";
import Asset from "components2/views/Activity/Asset";
import ITCheckoutViewer from "components2/Activity/ITCheckoutViewer";
import ITCheckOut from "components2/views/Activity/ITCheckOut";
// Configuration submenus pages
import UpdateProfile from "components2/Profile/UpdateProfile";
import UserCheckin_Viewer from "components2/Activity/UserCheckin_Viewer";
import UsersViewer from "components2/Activity/UsersViewer";
import UserAssetsViewer from "components2/Activity/UserAssetsViewer";
import Pullout from "components2/views/Activity/Pullout";
import PulloutViewer from "components2/Activity/PulloutViewer";
import ITPulloutViewer from "components2/Activity/ITPulloutViewer";

import AssetStatusViewer from "components2/Configuration/AssetStatusViewer";
import AssetStatus from "components2/views/AssetStatus";
import DepartmentViewer from "components2/Configuration/DepartmentViewer";
import Department from "components2/views/Department";
import PositionViewer from "components2/Configuration/PositionViewer";
import Position from "components2/views/Position";
import SuppliersViewer from "components2/Configuration/SuppliersViewer";
import Suppliers from "components2/views/Suppliers";
import AssetCategoryViewer from "components2/Configuration/AssetCategoryViewer";
import AssetCategory from "components2/views/AssetCategory";
import AssetTypeViewer from "components2/Configuration/AssetTypeViewer";
import AssetType from "components2/views/AssetType";
import DataTable from "components2/TanstackTable/DataTable";

import UserGroupViewer from "components2/Configuration/UserGroupViewer";
import UserGroup from "components2/views/UserGroup";
//import CreateStatusViewer from "components2/views/CreateStatusViewer";
//import StatusCategory from "components2/Configuration/StatusCategory";
//import PositionCategory from "components2/Configuration/PositionCategory";
//import AssetCategory from "components2/Configuration/AssetCategory";

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
  // {
  //   submenu: "activity",
  //   path: "/user-profile",
  //   name: "Profile",
  //   component: User,
  //   layout: "/admin",
  // },
  {
    submenu: "activity",
    path: "/update-profile",
    name: "Update Profile",
    component: UpdateProfile,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/userasset-viewer",
    name: "My Assets",
    component: UserAssetsViewer,
    layout: "/admin",
  },
  
  {
    
    path: "/pullout-viewer",
    name: "Pullout Viewer",
    component: PulloutViewer,
    layout: "/admin",
  },

  {
    
    path: "/pullout",
    name: "Pullout",
    component: Pullout,
    layout: "/admin",
  },

  {
    submenu: "activity",
    path: "/asset-viewer",
    name: "Asset",
    component: AssetViewer,
    layout: "/admin",
  },
  {
    path: "/asset",
    name: "Create Asset",
    component: Asset,
    layout: "/admin",
  },


  {
    submenu: "activity",
    path: "/checkout-viewer",
    name: "Check Out",
    component: ITCheckoutViewer,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/checkin-viewer",
    name: "Check In",
    component: UserCheckin_Viewer,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/assetpullout-viewer",
    name: "Pullout",
    component: ITPulloutViewer,
    layout: "/admin",
  },
  {
    path: "/checkout",
    name: "Create Check Out",
    component: ITCheckOut,
    layout: "/admin",
  },
  {
    submenu: "activity",
    path: "/users-viewer",
    name: "Users",
    component:   UsersViewer,
    layout: "/admin",
  },

  // End Activity Menu

  // Configuration Menu
  {
    submenu: "configuration",
    path: "/position-viewer",
    name: "Position",
    component: PositionViewer,
    layout: "/admin",
  },
  {
    path: "/position",
    name: "Create Position",
    component: Position,
    layout: "/admin",
  },
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
    path: "/suppliers-viewer",
    name: "Suppliers",
    component: SuppliersViewer,
    layout: "/admin",
  },
  {
    path: "/suppliers",
    name: "Create Suppliers",
    component: Suppliers,
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
    path: "/assetscategory-viewer",
    name: "Asset Category",
    icon: <HomeIcon color="inherit" />,
    component: AssetCategoryViewer,
    layout: "/admin",
  },
  {
    path: "/assetcategory",
    name: "Create Assets Category",
    component: AssetCategory,
    layout: "/admin",
  },

  {
    submenu: "configuration",
    path: "/assetstype-viewer",
    name: "Asset Type",
    icon: <HomeIcon color="inherit" />,
    component: AssetTypeViewer,
    layout: "/admin",
  },
  {
    path: "/assettype",
    name: "Create Assets Type",
    component: AssetType,
    layout: "/admin",
  },
  {
    submenu: "configuration",
    path: "/usergroup-viewer",
    name: "User Group",
    icon: <HomeIcon color="inherit" />,
    component: UserGroupViewer,
    layout: "/admin",
  },
  {
    path: "/usergroup",
    name: "Create User Group",
    component: UserGroup,
    layout: "/admin",
  },

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
