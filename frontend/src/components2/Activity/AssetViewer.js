
/* 


    Date : 10 / 20 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetViewer.js
        
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

export default function AssetViewer() {


  const [assets, setAssets] = useState([]);
  const [userdata,setUser] = useState({
    userID : ''
  });

  const SetUsers = async () => { 

    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

     setUser({...userdata,

      userID : tokenDecoded.result[0].userDisplayID

  })
  }
  useEffect(() => {
    SetUsers()
    LoadAllAssets()
  }, []);

  const LoadAllAssets = async () => {
    try {

      const success = await axios.get("/asset/view-AllAssets")

        .then((res) => {
          setAssets(res.data.result);

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

  const handleDelete = async (event,assetid,assetname) => {

    try {
      event.preventDefault()
      
      const deleteSuccess = await axios.post("/asset/delete-AssetByID",{assetid})
      .then((res) => {

        alert("Delete succes")

        LoadAllAssets()

        const deleteLogs = new Logs(
          'Info',
          "Position Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + assetid
          + '   Statusname :  ' + assetname,
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

          generate_PDF(suppliers,'Suppliers')

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
                  pathname: "/admin/asset",
                  state: { assetID: '' },
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
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Vendor</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Purchase</Th>
                  <Th>Amount</Th>
                  <Th>Depreciated</Th>
                  <Th>Amount YR</Th>
                 
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                  <Tr key={asset.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,asset.id,asset.assetName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/asset",
                            state: { assetID: asset.id }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                 
                    <Td>{asset.assetCategName}</Td>
                    <Td>{asset.statusName}</Td>
                    <Td>{asset.name}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>
                    <Td>{asset.description}</Td>
                    <Td>{asset.date_purchase}</Td>
                    <Td>{asset.Amount}</Td>
                    <Td>{asset.date_depreciated}</Td>
                    <Td>{asset.AmountYR}</Td>
                    
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
