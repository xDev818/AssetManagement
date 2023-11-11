/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 01 / 03 / 23
    Author : Nole
    Activities
    Purpose : 
      Pullout Viewer

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

import pdficon from "../../assets/img/pdf.ico"
import excelicon from "../../assets/img/excel.ico"


import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  FormLabel,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
useDisclosure,

Menu,
MenuButton,
MenuList,
MenuItem,
MenuItemOption,
MenuGroup,
MenuOptionGroup,
MenuDivider,
Image,
  useToast


} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

import React from 'react'

//import viewToastify from "components/Utils/viewToast";

export default function PulloutViewer() {
  
  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  const { isOpen, onOpen, onClose } = useDisclosure()


  const toast = useToast()


  const [assets, setAssets] = useState([]);
  const [pullout,setPullout] = useState([]);
  
 
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

  const tables = assets.slice(firstIndex, lastIndex);
 const tablePages = Math.ceil(assets.length / tablePerPage);
 const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

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

      LoadPulloutAssets(tokenDecoded.result[0].userDisplayID);

    }catch(err) {
      alert(err)
    }

  }, []);

  const LoadPulloutAssets = async (id) => {
    try {
      const success = await axios.get("/user-asset/viewPulloutByID/" + id)

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

  const handleReport = async () => {
   //alert(search.name)
    try {
      
        generate_PDF(assets, "Pullout",search.docref);
        
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assets, "Pullout");
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
        <Card bg={graphCardBg}>
          <Card bg={'white'}>
          <TableContainer>
          <ButtonGroup spacing={6}>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='green'>
                Report
              </MenuButton>
              <MenuList>
                <MenuItem  onClick={onOpen}  colorScheme='green'>
                <Image 
                  boxSize='2rem'
                  borderRadius='full'
                  src= {pdficon}
                  alt='pfico'
                  mr='12px'
                />
                  PDF </MenuItem>
                <MenuItem  onClick={onOpen}  colorScheme='green' >
                   <Image 
                    boxSize='2rem'
                    borderRadius='full'
                    src= {excelicon}
                    alt='pfico'
                    mr='12px'
                  />
                  Excel</MenuItem>
                
              </MenuList>
          </Menu>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
              
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Pull-out Asset</ModalHeader>
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
                    <Button colorScheme='green' mr={3} onClick={handleReport}>
                      PDF
                    </Button>
                    <Button colorScheme='green' mr={3} onClick={handleExcelReport}>
                      Excel
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
                  <Th>Check-out Ref</Th>
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
                     <Td> {asset.docRef_Pullout} </Td>
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
        </Card>
      </Stack>
    </>
  );
}
