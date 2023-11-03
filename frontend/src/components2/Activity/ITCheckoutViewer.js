/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 10 / 20 / 23
    Author : Nole
    Activities
    Purpose : 
      create Asset Checkout viewer

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
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  StatLabel,

  useToast


} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

//import viewToastify from "components/Utils/viewToast";

export default function ITCheckoutViewer() {
  

  const toast = useToast()


  const [assets, setAssets] = useState([]);
 
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
    LoadAllAssetsCheckout();
  }, []);

  const LoadAllAssetsCheckout = async () => {
    try {
      const success = await axios
        .get("/assetcheckout/get-assetcheckout-byIT")

        .then((res) => {
          setAssets(res.data.result);

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


  const handleReport = () => {
    try {
      generate_PDF(assets, "Checkout");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assets, "Checkout");
    } catch (err) {
      alert(err);
    }
  };

  // No need to routes to server
  const handleGenerateReceiving = (docref) => {
      try {
            generate_PDF(assets, "Receiving",docref)
      } catch(err) {

      }
  }


  function viewToastify(title,desc,status) {
    // const toast = useToast()
     return (
       
           toast({
             title: title,
             description: desc,
             status: status,
             duration: 3000,
             isClosable: true,
             position: "top"
           })
       
      
     )
   }

   
  const handleActivateReceiving = async (e,detailID,active,docref) => {


    try {
        e.preventDefault()
       
        if( active == 0) {
            const success = await axios.post("/assetcheckout/activate-receiving",{detailID})

            .then((res) => {

            
              handleGenerateReceiving(docref)
              LoadAllAssetsCheckout()
              
              viewToastify(
                "Checkout",
                "Generate PDF and Check-in Asset for user successful",
                "success"
              )
              

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
        } else {

        
          viewToastify(
            "Asset Checkout",
            "Asset already activated",
            "info"
          )

        }

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
                  <Th>Reference</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Serial No</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Checkout Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                  <Tr key={asset.detailID}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="facebook"
                          onClick={(e) =>
                            // handleGenerateReceiving( asset.docRef_Checkin)
                            handleActivateReceiving( e,asset.detailID,asset.active_checkin,asset.docRef_Checkin)
                            
                          }
                        >
                        { asset.docRef_Checkin}

                        </Button>
                        {/* <Button
                          colorScheme="green"

                         
                        >
                        Activate
                        </Button> */}

                      </ButtonGroup>
                    </Td>
                    <Td>{asset.typeName}</Td>
                    <Td>{asset.statusName}</Td>
                    <Td>{asset.serialNo}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>
                    <Td>{asset.departmentName}</Td>
                    <Td>{asset.date_checkout}</Td>

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
