
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


  
  var userID = ""

  const [assettype, setAssetType] = useState([]);

  useEffect(() => {
    LoadAllAssetType()
  }, []);

  const LoadAllAssetType = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/assetcategory/viewassetcategory")

        .then((res) => {
          setAssetType(res.data.result);

        })
        .catch((err) => {
          
          const InsertLogs = new Logs(
            'Error',
            "PositionViewer",
            "Function /LoadAllPositions",
            'LoadAllPositions',
            userID
          )
          
        });
    }
    catch(err) {
      alert(err)
    }
  }

  const handleDelete = async (event,asset_categoryid,asset_categoryname) => {

    try {
      event.preventDefault()
      
      const deleteSuccess = await axios.post("/assetcategory/deleteassetcategory",{asset_categoryid})
      .then((res) => {

        alert("Delete succes")

        LoadAllCategories()

        const deleteLogs = new Logs(
          'Info',
          "Position Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + asset_categoryid
          + '   Statusname :  ' + asset_categoryname,
          userID
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
          console.log(categories)
          generate_PDF(categories,'Asset Category')

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
                  pathname: "/admin/assetcategory",
                  state: { categoryID: '' },
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
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((category) => (
                  <Tr key={category.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,category.id,category.assetCategName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/assetcategory",
                            state: { categoryID: category.id }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                    <Td>{category.assetCategName}</Td>
                    <Td>{category.description}</Td>

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
