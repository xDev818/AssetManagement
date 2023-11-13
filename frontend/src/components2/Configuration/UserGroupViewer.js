/* 

    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create UserGroupViewer.js

    Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      import generate_EXCEL from "components/Utils/generate_EXCEL";
      New Functionality
        const handleExcelReport = () => {
            try {
              generate_EXCEL(positions, "Position");
            } catch (err) {
              alert(err);
            }
          };
    
    Date : 10 / 25 / 23
    Author : John
    Activities
    Purpose : 
      import DataTable from "components2/TanstackTable/DataTable";
      - Removed unnecessary imports to make code neat and clean
      - Added Data Table from Tanstack React Table
      - Fixed global search

*/

import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
//import axios from "axios";
import { placeHolderAPI } from "index";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";
import generate_EXCEL from "components/Utils/generate_EXCEL";

import { TableContainer, Stack } from "@chakra-ui/react";

import Card from "components/Card/Card";

import DataTable from "components2/TanstackTable/DataTable";

export default function UserGroupViewer() {

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  var userID = "";

  const [usergroups, setUserGroups] = useState([]);

  useEffect(() => {
    LoadAllUserGroups();
  }, []);

  const LoadAllUserGroups = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await placeHolderAPI
        .get("/usergroup/viewuser-group")

        .then((res) => {
          setUserGroups(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (event, usergroup_id, usergroupname) => {
    try {
      event.preventDefault();

      const deleteSuccess = await placeHolderAPI
        .post("/usergroup/delete-usergroup", { usergroup_id })
        .then((res) => {
          alert("Delete succes");

          LoadAllUserGroups();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              usergroup_id +
              "   Statusname :  " +
              usergroupname,
            userID
          );
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleReport = () => {
    try {
      generate_PDF(usergroups, "User Group");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(usergroups, "User Group");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "categoryName",
    },
    {
      header: "Description",
      accessorKey: "categoryDesc",
    },
  ];

  return (
    <>
      <Stack>
        <Card position="relative" bg={graphCardBg}>
          <Card bg={'white'}>
          <TableContainer>
            <DataTable
              dataGrid={usergroups}
              columns={columns}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              handleDelete={handleDelete}
              pathname="/admin/usergroup"
              idType={"id"}
            />
          </TableContainer>
        </Card>
        </Card>
      </Stack>
    </>
  );
}
