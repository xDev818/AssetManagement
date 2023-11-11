/*

  Date : 10 / 18 / 23
  Author : Nole
  Activities
  Purpose : 
    update DepartmentViewer.js
    import { Link as Anchor } from "react-router-dom";
    Update location :
      import axios from "axios";
      import { useEffect,useState } from "react";
      import React from "react";
      import { Button, ButtonGroup } from "@chakra-ui/react";
      Remove : import FourGraphs from "components/FourGraphs/FourGraphs";
      import generate_PDF from "components/Utils/generate_PDF";

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

import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";
import generate_EXCEL from "components/Utils/generate_EXCEL";

import Logs from "components/Utils/logs_helper";

import { TableContainer, Box } from "@chakra-ui/react";

import Card from "components/Card/Card";

import DataTable from "components2/TanstackTable/DataTable";

export default function DepartmentViewer() {

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  var userID = "";

  const [departments, setDepartments] = useState([]);

  const LoadallDepartments = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const res = await axios.get("/get_all_departments");
      const data = await res.data;
      console.log("data", data.result);
      setDepartments(res.data.result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    LoadallDepartments();
  }, []);

  const handleDelete = async (
    event,
    departmentid,
    departmentname,
    pathname
  ) => {
    try {
      event.preventDefault();
      //alert("Delete ID : " + statusid)
      const deleteSuccess = await axios
        .post("/deleteDepartmentByID", { departmentid })
        .then((res) => {
          alert("Delete Successfull");

          LoadallDepartments();

          const deleteLogs = new Logs(
            "Info",
            "Department Viewer",
            "Function /handleDelete",
            "Delete departmentID :  " +
              departmentid +
              "   Departmentname :  " +
              departmentname,
            userID
          );

          const request = axios.post("/log", deleteLogs.getLogs());
          const response = request.data;
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(departments, "Department");
    } catch (err) {
      alert(err);
    }
  };

  const handleReport = () => {
    try {
      generate_PDF(departments, "Department");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Department",
      accessorKey: "departmentName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
  ];

  return (
    <Box px={3}>
      <Card position="relative" bg={graphCardBg}>
        <TableContainer>
          <DataTable
            dataGrid={departments}
            columns={columns}
            handleReport={handleReport}
            handleExcelReport={handleExcelReport}
            handleDelete={handleDelete}
            pathname="/admin/department"
            idType={"departmentDisplayID"}
          />
        </TableContainer>
      </Card>
    </Box>
  );
}
