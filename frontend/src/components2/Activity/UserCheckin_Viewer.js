/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 

    Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
      create User Checkin Viewer

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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  useToast
  // Box,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // StatLabel,

} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function UserCheckin_Viewer() {
  

  const [assets, setAssets] = useState([]);
  const [statusvalues,setStatusID] = useState({
    statusid: ''
  })
 
  const [userdata,setUser] = useState({
    userid : '',
    deptid:'',
    positionid:''
  });

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  //const tables = assets.slice(firstIndex, lastIndex);
 // const tablePages = Math.ceil(assets.length / tablePerPage);
 // const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

  const nextPage = () => {
    console.log("cureentpage", currentPage);
    if (currentPage !== tablePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentNumber = (number) => {
    setCurrentPage(number);
  };

  const SetUsers = async () => {
    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

  
    setUser({
      ...userdata,

      userid: tokenDecoded.result[0].userDisplayID,
      deptid: tokenDecoded.result[0].departmentDisplayID,
      positionid : tokenDecoded.result[0].positionID


    });
  };
  useEffect(() => {
    SetUsers();
    getStatusByName()
    LoadAllAssetsForDeploy();
  }, [userdata.userid]);

  const getStatusByName = async () => {
    try {
     
      const name = 'Deployed'
      const success = await axios.get('/getStatusbyname/' + name)

        .then((res) => {
        
          setStatusID({...statusvalues , 
            statusid : res.data.result[0].assetStatusID });
          
        
        })
        .catch((err) => {
          //alert(err)
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const LoadAllAssetsForDeploy = async () => {
    try {
    
      if(userdata.userid ) {
        const success = await axios.get('/user-checkin/view-fordeploy/' + userdata.userid )

        .then((res) => {
       
          setAssets(res.data.result);
        
        })
        .catch((err) => {
          //alert(err)
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });

      }

    } catch (err) {
      alert(err);
    }
  };

  const handleReport = () => {
    try {
      generate_PDF(assets, "CheckIn");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assets, "CheckIn");
    } catch (err) {
      alert(err);
    }
  };


  const UpdateAsseteDetailStatus = (detailID,statID) => {
   
    try {
     
        const updateDetail = axios.post("/user-checkin/update-checkin-status",{detailID,statID})

          .then((res) => {
        //    alert("Asset Details updated")

          })
          .catch((err) => {
            const InsertLogs = new Logs(
              "Error",
              "PositionViewer",
              "Function /LoadAllPositions",
              "LoadAllPositions",
              userdata.userid
            );
          });
     

  } catch (err) {
    alert(err);
  }
  };


  const UpdateAssetStatus = (assetID,statID,userid) => {
   
    try {
    
         const success = axios.post("/user-checkin/update-checkin-status-asset",{assetID,statID,userid})

          .then((res) => {
      //      alert("Asset Status updated")

     
          })
          .catch((err) => {
            const InsertLogs = new Logs(
              "Error",
              "PositionViewer",
              "Function /LoadAllPositions",
              "LoadAllPositions",
              userdata.userid
            );
          });
     

  } catch (err) {
    alert(err);
  }
  };


  const handleCheckin = async (e,detailID,userid,assetID) => {
     
    try {
        e.preventDefault()

          //alert(statusvalues.statusid)
          const statID = statusvalues.statusid
    
            const success = await axios.post("/user-checkin/update-checkin",{detailID,statID})

            .then((res) => {
              //alert("Asset checkin by user")

              UpdateAsseteDetailStatus(detailID,statID)
              UpdateAssetStatus(assetID,statID,userid)

              LoadAllAssetsForDeploy()
              
            })
            .catch((err) => {
              const InsertLogs = new Logs(
                "Error",
                "PositionViewer",
                "Function /LoadAllPositions",
                "LoadAllPositions",
                userdata.userid
              );
            });
       

    } catch (err) {
      alert(err);
    }
  };

 
  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            {/* <ButtonGroup spacing={6}>
            <Button
              colorScheme='messenger'
            >
              <Anchor
                  to={{
                  pathname: "/admin/asset",
                  state: { assetID: '' },
                  }}>
                New
              </Anchor>

            </Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='green'>
                Report
              </MenuButton>
              <MenuList>
                <MenuItem   onClick={handleReport}  colorScheme='green'>PDF </MenuItem>
                <MenuItem   colorScheme='green' >Excel</MenuItem>
                
              </MenuList>
          </Menu>
 
            </ButtonGroup> */}

            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport = {handleExcelReport}
              pathname="/admin/checkout"
            />
        
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Ref No</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th>Release By</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                  <Tr key={asset.detailID}>
                    <Td>
                      <ButtonGroup>
                        
                        <Button
                          colorScheme="green"

                          onClick={(e) =>
                            handleCheckin( e,asset.detailID,asset.userDisplayID,asset.assetID
                            )}
                        >
                        Receive
                        </Button>
                      </ButtonGroup>
                    </Td>
                    <Td>{asset.docRef_Checkin}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>
                    <Td>{asset.ReleasedBy}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Stack>
    </>
  );
}
