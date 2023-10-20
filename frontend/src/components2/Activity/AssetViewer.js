
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


  
  var userID = ""

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    LoadAllSuppliers()
  }, []);

  const LoadAllSuppliers = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/suppliers/viewallsuppliers")

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

  const handleDelete = async (event,supplierid,suppliername) => {

    try {
      event.preventDefault()
      
      const deleteSuccess = await axios.post("/suppliers/deleteSupplier",{supplierid})
      .then((res) => {

        alert("Delete succes")

        LoadAllSuppliers()

        const deleteLogs = new Logs(
          'Info',
          "Position Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + supplierid
          + '   Statusname :  ' + suppliername,
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
                  pathname: "/admin/asset",
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
                            pathname: "/admin/asset",
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
