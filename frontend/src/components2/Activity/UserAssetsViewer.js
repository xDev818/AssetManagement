/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
      User Assets

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

import viewicon from "../../assets/img/view.ico"
import newicon from "../../assets/img/new.ico"

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
  FormLabel,
  FormControl,
  Input,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
useDisclosure,

} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

//import viewToastify from "components/Utils/viewToast";

export default function UserAssetsViewer() {
  


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

  useEffect(() => {

    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      setUser({
        ...userdata,

        userid: tokenDecoded.result[0].userDisplayID,
        deptid: tokenDecoded.result[0].departmentDisplayID,
        positionid : tokenDecoded.result[0].positionID

      });

      LoadAllAssets(tokenDecoded.result[0].userDisplayID);

    }catch(err) {
      alert(err)
    }

  }, []);

  const LoadAllAssets = async (id) => {
    try {
      const success = await axios.get("/user-asset/viewallByID/" + id)

        .then((res) => {
          setAssets(res.data.result);

        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            id
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

  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            <ButtonGroup spacing={6}>
            {/* <Button
              colorScheme='red'
            >
              <Anchor
                  to={{
                  pathname: "/admin/pullout"
                  }}>
                Pullout
              </Anchor>

            </Button>
            <Button
              colorScheme='green'
            >
              <Anchor
                  to={{
                  pathname: "/admin/pullout-viewer"
                  }}>
                View Pullout
              </Anchor>

            </Button> */}

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='green'>
                Process
              </MenuButton>
              <MenuList>
                <MenuItem   colorScheme='green'>
                    <Image 
                      boxSize='2rem'
                      borderRadius='full'
                      src= {newicon}
                      alt='pfico'
                      mr='12px'
                    />
                      <Anchor
                        to={{
                          pathname: "/admin/pullout"
                        }}>
                      Pullout
                      </Anchor>
                </MenuItem>
                <MenuItem    colorScheme='green'>
                    <Image 
                      boxSize='2rem'
                      borderRadius='full'
                      src= {viewicon}
                      alt='pfico'
                      mr='12px'
                    />
                      <Anchor
                          to={{
                            pathname: "/admin/pullout-viewer"
                          }}>
                            
                          View Pullout
                      </Anchor>
                  </MenuItem>
                
              </MenuList>
          </Menu>
 
            </ButtonGroup>

            {/* <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport = {handleExcelReport}
              pathname="/admin/checkout"
            />
         */}
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Check-in Ref</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Serial No</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                  <Tr key={asset.detailID}>
                    <Td>{asset.docRef_Checkin}</Td>
                    <Td>{asset.typeName}</Td>
                    <Td>{asset.statusName}</Td>
                    <Td>{asset.serialNo}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>


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
