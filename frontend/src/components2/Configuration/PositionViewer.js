/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      import { Link as Anchor } from "react-router-dom";
      import Logs from "components/Utils/logs_helper";
      import { useEffect, useState } from "react";
      import axios from "axios";
      import decoder from "jwt-decode";
      import generate_PDF from "components/Utils/generate_PDF";

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      Added in import 
          Menu
          MenuButton,
          MenuList,
          MenuItem,
      import { ChevronDownIcon} from '@chakra-ui/icons'


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

export default function PositionViewer() {

  const textColor = "#00334d"
  const graphCardBg = '#e6f2ff'

  var userID = "";

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    LoadAllPositions();
  }, []);

  const LoadAllPositions = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await placeHolderAPI
        .get("/positions/viewallpositions")

        .then((res) => {
          setPositions(res.data.result);
          console.log(res.data.result);
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

  const handleDelete = async (event, positionID, positionname) => {
    try {
      event.preventDefault();

      const deleteSuccess = await placeHolderAPI
        .post("/positions/deletePosition", { positionID })
        .then((res) => {
          alert("Delete succes");

          LoadAllPositions();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              positionID +
              "   Statusname :  " +
              positionname,
            userID
          );

          // const request = axios.post('/log',deleteLogs.getLogs())
          // const response =  request.data
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
      generate_PDF(positions, "Position");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(positions, "Position");
    } catch (err) {
      alert(err);
    }
  };

  const columns = [
    {
      header: "Position Name",
      accessorKey: "positionName",
    },
    {
      header: "Department Name",
      accessorKey: "departmentName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
  ];

  return (
    <>
      <Stack>
        <Card height="auto" position="relative" bg={graphCardBg}>
          <TableContainer>
            {/*   state: { positionID: '' }, */}
            {/* <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              pathname="/admin/position"
            /> */}

            <DataTable
              dataGrid={positions}
              columns={columns}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              handleDelete={handleDelete}
              pathname="/admin/position"
              idType={"id"}
            />
          </TableContainer>
        </Card>
      </Stack>
    </>
  );
}
