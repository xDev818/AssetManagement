
/* 


    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetTypeViewer.js
        
*/

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";

import Pagination from "components2/Pagination/Pagination";
import { TbodyRes } from "components2/Pagination/Pagination";
import Search from "components2/Search/Search";

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
  
} from "@chakra-ui/react";
import { ChevronDownIcon} from '@chakra-ui/icons'
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function AssetTypeViewer() {

  const [userdata,setUser] = useState({
    userID : ''
  });

  const [assettype, setAssetType] = useState([]);


  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = assettype.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(assettype.length / tablePerPage);
  const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

  const filteredTables = tables.filter((item) => {
    const searchLower = search.toLowerCase();
    const itemText = Object.values(item).join(" ").toLowerCase();
    return searchLower === "" || itemText.includes(searchLower);
  });
  const displayedData = filteredTables.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage !== tablePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const nextPage = () => {
  //   if (currentPage !== tablePages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const currentNumber = (number) => {
    setCurrentPage(number);
  };



  useEffect(() => {
    SetUsers()
    LoadAllAssetType()
  }, []);




  const SetUsers = async () => { 

    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

     setUser({...userdata,

      userID : tokenDecoded.result[0].userDisplayID

  })
  }

  const LoadAllAssetType = async () => {
    try {
     
      const success = await axios.get("/assettype/viewasset-type")

        .then((res) => {
          setAssetType(res.data.result);

        })
        .catch((err) => {
          
          const InsertLogs = new Logs(
            'Error',
            "PositionViewer",
            "Function /LoadAllPositions",
            'LoadAllPositions',
            userdata.userID
          )
          
        });
    }
    catch(err) {
      alert(err)
    }
  }

  const handleDelete = async (event,asset_typeid,asset_typename) => {

    try {
      event.preventDefault()
      
      const deleteSuccess = await axios.post("/assettype/delete-assettype",{asset_typeid})
      .then((res) => {

        alert("Delete succes")

        LoadAllAssetType()

        const deleteLogs = new Logs(
          'Info',
          "Position Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + asset_typeid
          + '   Statusname :  ' + asset_typename,
          userdata.userID
        )

      

      })
      .catch((err) => {
        alert(err)
      })
    } catch(err) {
        alert(err)
    }

  }

  const handleReport =() => {
      try {
          console.log(assettype)
          generate_PDF(assettype,'Asset Type')

      }
      catch(err) {
        alert(err)
      }
  }

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
                  pathname: "/admin/assettype",
                  state: { typeID: '' },
                  }}>
                New
              </Anchor>

            </Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='green'>
                Report
              </MenuButton>
              <MenuList>
                <MenuItem   onClick={handleReport} colorScheme='twitter'>PDF </MenuItem>
                <MenuItem  colorScheme='twitter'>Excel</MenuItem>
                
              </MenuList>
          </Menu>
   
            </ButtonGroup> */}

            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              pathname="/admin/assettype"

            />

            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Asset Category</Th>
                  <Th>Asset Type</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assettype.map((type) => (
                  <Tr key={type.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,type.id,type.typeName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/assettype",
                            state: { typeID: type.id }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                    <Td>{type.assetCategName}</Td>
                    <Td>{type.typeName}</Td>
                    <Td>{type.description}</Td>

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
