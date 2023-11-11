/* 



    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetCategoryViewer.js

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

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";
import generate_EXCEL from "components/Utils/generate_EXCEL";

import Search from "components2/Search/Search";
import Pagination from "components2/Pagination/Pagination";

import {
  // Table,
  // Thead,
  // Tbody,
  // Tr,
  // Th,
  // Td,
  TableContainer,
  Stack,
  Box,
} from "@chakra-ui/react";

import Card from "components/Card/Card";

import DataTable from "components2/TanstackTable/DataTable";

export default function AssetCategoryViewer() {

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  var userID = "";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    LoadAllCategories();
  }, []);

  const LoadAllCategories = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/assetcategory/viewassetcategory")

        .then((res) => {
          setCategories(res.data.result);
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

  const handleDelete = async (event, asset_categoryid, asset_categoryname) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/assetcategory/deleteassetcategory", { asset_categoryid })

        .then((res) => {
          alert("Delete succes");

          LoadAllCategories();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              asset_categoryid +
              "   Statusname :  " +
              asset_categoryname,
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
      console.log(categories);
      generate_PDF(categories, "Asset Category");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(categories, "Asset Category");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Asset Category",
      accessorKey: "assetCategName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
  ];

  return (
    <>
      <Stack>
        <Card position="relative" bg={graphCardBg}>
          <Card bg={'white'}>
          <TableContainer>
            {/*   to={{
                  pathname: "/admin/assetcategory",

                  state: { categoryID: '' },
                  }}> */}
            <DataTable
              dataGrid={categories}
              columns={columns}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              handleDelete={handleDelete}
              pathname="/admin/assetcategory"
              idType={"id"}
            />
          </TableContainer>
        </Card>
        </Card>
      </Stack>
    </>
  );
}
