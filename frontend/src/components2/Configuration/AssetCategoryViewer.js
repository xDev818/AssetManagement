
/* 


    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create SuppliersViewer.js
        
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

export default function AssetCategoryViewer() {


  
  var userID = ""

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    LoadAllCategories()
  }, []);

  const LoadAllCategories = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/assetcategory/viewassetcategory")

        .then((res) => {
          setSuppliers(res.data.result);

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
      
      const deleteSuccess = await axios.post("/suppliers/deleteSupplier",{asset_categoryid})
      .then((res) => {

        alert("Delete succes")

        LoadAllSuppliers()

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
                  pathname: "/admin/assetcategory",
                  state: { supplierID: '' },
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
                  <Th>Supplier</Th>
                  <Th>Address</Th>
                  <Th>Contact No</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {suppliers.map((supplier) => (
                  <Tr key={supplier.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,supplier.id,supplier.supplierName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/assetcategory",
                            state: { supplierID: supplier.id }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                    <Td>{supplier.supplierName}</Td>
                    <Td>{supplier.address}</Td>
                    <Td>{supplier.contactno}</Td>
                    <Td>{supplier.email}</Td>
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
