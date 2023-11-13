/* 

    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      Create AssetStatus.js

      import { Link as Anchor } from 'react-router-dom'
      import Logs from 'components/Utils/logs_helper'
      import axios from 'axios'

      Create useEffect to load the Asset Status

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      update useEffect(() => { .. }
      new function LoadAllStatus - use in useEffect and Delete Function
      new function handleDelete for ( Delete asste by Stat ID )
      new function handleReport 
        *** Generate PDF Report

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

import { Link as Anchor } from "react-router-dom";
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

export default function AssetStatusViewer() {

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  var userID = "";

  const [assetStatus, setStatus] = useState([]);

  useEffect(() => {
    LoadAllStatus();
  }, []);

  const LoadAllStatus = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await placeHolderAPI
        .get("/getallStatus")
        //axios.get('/getViewallStatus')
        .then((res) => {
          setStatus(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Asset Status Viewer",
            "Function /LoadAllStatus",
            "LoadAllStatus",
            userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (event, statusid, statusname) => {
    try {
      event.preventDefault();
      //alert("Delete ID : " + statusid)
      const deleteSuccess = await placeHolderAPI
        .post("/deleteStatusbyID", { statusid })
        .then((res) => {
          alert("Delete Successfull");

          LoadAllStatus();

          const deleteLogs = new Logs(
            "Info",
            "Asset Status Viewer",
            "Function /handleDelete",
            "Delete statusID :  " + statusid + "   Statusname :  " + statusname,
            userID
          );

          const request = placeHolderAPI.post("/log", deleteLogs.getLogs());
          const response = request.data;
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
      generate_PDF(assetStatus, "Asset Status");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assetStatus, "Asset Status");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Status Name",
      accessorKey: "statusName",
    },
    {
      header: "Description",
      accessorKey: "statusDescription",
    },
  ];

  return (
    <>
      <Stack >
        <Card position="relative" bg={graphCardBg}>
          <Card bg={'white'}>
          <TableContainer>
            {/*  pathname: "/admin/assetstatus",
                      state: { assetstatID: "" }, */}
            <DataTable
              dataGrid={assetStatus}
              columns={columns}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              handleDelete={handleDelete}
              pathname="/admin/assetstatus"
              idType={"assetStatusID"}
            />
          </TableContainer>
        </Card>
        </Card>
      </Stack>
    </>
  );
}
