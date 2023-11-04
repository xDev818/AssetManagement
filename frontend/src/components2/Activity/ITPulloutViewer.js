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
     IT Pullout 
        - view all asset pullout genrated by user

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

export default function ITPulloutViewer() {
  
  const { isOpen, onOpen, onClose } = useDisclosure()


  const toast = useToast()


  const [assets, setAssets] = useState([]);
 
  const [userdata,setUser] = useState({
    userid : '',
    deptid:'',
    positionid:''
  });

  const [search, setSearch] = useState({
    docref: ""
  });

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

      LoadAPulloutAssets();

    }catch(err) {
      alert(err)
    }

  }, []);

  const LoadAPulloutAssets = async (id) => {
    try {
      const success = await axios.get("/user-asset/view-ITPullout")

        .then((res) => {
          if(res.data.message === "Records Found") {
              setAssets(res.data.result);
          } else {
            setAssets([])
          }
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


  // const handleReport = () => {
  //   try {
  //     generate_PDF(assets, "Checkout");
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  // const handleExcelReport = () => {
  //   try {
  //     generate_EXCEL(assets, "Checkout");
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const handleReceive =  () => {

    try {
      
      assets.map(asset => { 

        if(asset.docRef_Pullout === search.docref) {
          alert(asset.docRef_Pullout)

          const assetvalues = {
            userid: userdata.userid,
            detailid: asset.detailID
          }

          const request =  axios.post("/user-asset/update-pullout-receive",assetvalues)

          const response = request.data;

          if(response.message.includes("Record Found")) {
            // update status here

            const request =  axios.post("/user-asset/update-pullout-receive",assetvalues)

            const response = request.data;

          } else {
          
              viewToastify('Pullout Receive',
              response.message,
              'warning')
            }


        }


      })

      LoadAPulloutAssets()

    } catch(err) {
      alert(err)
    }
  }


  function viewToastify(title,desc,status) {
    // const toast = useToast()
     return (
       
           toast({
             title: title,
             description: desc,
             status: status,
             duration: 4000,
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
            <Button
              colorScheme='green'
              onClick={onOpen}
            >
              Process Pullout
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
              
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Receive Pull-out Asset</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Search</FormLabel>
                      <Input 
                      onChange={(e) => {
                        setSearch({ ...search, docref: e.target.value })}}
                        value = {search.docref}
                       placeholder='Document Reference No' />
                    </FormControl>

                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={handleReceive}>
                     Receive
                    </Button>
                    <Button colorScheme='twitter' onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
 
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
                  <Th>Pull-out Ref</Th>
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
                    <Td>{asset.docRef_Pullout}</Td>
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
