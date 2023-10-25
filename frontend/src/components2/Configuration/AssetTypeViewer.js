/* 


    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetTypeViewer.js

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

import Pagination from "components2/Pagination/Pagination";
import { TbodyRes } from "components2/Pagination/Pagination";
import Search from "components2/Search/Search";

import { TableContainer, Stack } from "@chakra-ui/react";

import Card from "components/Card/Card";
import DataTable from "components2/TanstackTable/DataTable";

export default function AssetTypeViewer() {
  const [userdata, setUser] = useState({
    userID: "",
  });

  const [assettype, setAssetType] = useState([]);

  useEffect(() => {
    SetUsers();
    LoadAllAssetType();
  }, []);

  const SetUsers = async () => {
    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

    setUser({
      ...userdata,

      userID: tokenDecoded.result[0].userDisplayID,
    });
  };

  const LoadAllAssetType = async () => {
    try {
      const success = await axios
        .get("/assettype/viewasset-type")

        .then((res) => {
          setAssetType(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (event, asset_typeid, asset_typename) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/assettype/delete-assettype", { asset_typeid })
        .then((res) => {
          alert("Delete succes");

          LoadAllAssetType();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              asset_typeid +
              "   Statusname :  " +
              asset_typename,
            userdata.userID
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
      console.log(assettype);
      generate_PDF(assettype, "Asset Type");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assettype, "Asset Type");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Asset category",
      accessorKey: "assetCategName",
    },
    {
      header: "Asset type",
      accessorKey: "typeName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
  ];

  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            <DataTable
              dataGrid={assettype}
              columns={columns}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              handleDelete={handleDelete}
              pathname="/admin/assettype"
              idType={"id"}
            />
          </TableContainer>
        </Card>
      </Stack>
    </>
  );
}
