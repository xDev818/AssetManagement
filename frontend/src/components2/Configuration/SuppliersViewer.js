/* 


    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create SuppliersViewer.js


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
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";
import generate_EXCEL from "components/Utils/generate_EXCEL";

import { TableContainer, Stack } from "@chakra-ui/react";

import Card from "components/Card/Card";

import DataTable from "components2/TanstackTable/DataTable";

export default function SuppliersViewer() {

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  var userID = "";

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    LoadAllSuppliers();
  }, []);

  const LoadAllSuppliers = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/suppliers/viewallsuppliers")

        .then((res) => {
          setSuppliers(res.data.result);
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

  const handleDelete = async (event, supplierid, suppliername) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/suppliers/deleteSupplier", { supplierid })
        .then((res) => {
          alert("Delete succes");

          LoadAllSuppliers();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              supplierid +
              "   Statusname :  " +
              suppliername,
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
      generate_PDF(suppliers, "Suppliers");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(suppliers, "Suppliers");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Suppliers",
      accessorKey: "supplierName",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "Conact No",
      accessorKey: "contactno",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
  ];

  return (
    <>
      <Stack>
        <Card position="relative" bg={graphCardBg} >
          <Card bg={'white'}>
          <TableContainer w={'100%'}>
            {/* state: {supplierID:} */}
            <DataTable
              dataGrid={suppliers}
              columns={columns}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              handleDelete={handleDelete}
              pathname="/admin/suppliers"
              idType={"id"}
            />
          </TableContainer>
          </Card>
        </Card>
      </Stack>
    </>
  );
}
