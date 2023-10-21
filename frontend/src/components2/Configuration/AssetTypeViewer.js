
/* 


    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetCategoryViewer.js
        
*/

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";

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
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function AssetTypeViewer() {

  const [userdata,setUser] = useState({
    userID : ''
  });

  const [assettype, setAssetType] = useState([]);

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
            <ButtonGroup spacing={6}>
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
            <Button
             colorScheme='green'
              
              onClick={handleReport}
              
            >        
             PDF Report
            </Button>
            </ButtonGroup>
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
