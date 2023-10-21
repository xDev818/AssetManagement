/* 

    Date : 10 / 20 / 23
    Author : Nole
    Activities
    Purpose : 
        New Asset.js

*/

import {
  Box,
  Flex,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  Select,
  Button,
  FormControl,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import React, { useEffect, useState, useReducer, useRef } from "react";
import decoder from "jwt-decode";
import axios from 'axios'
import Logs from "components/Utils/logs_helper";


export default function Asset() {

  
  //Nole
  
  var imgFilename=''
  const [userdata,setUser] = useState({
    userID : ''
  });

  const [categories, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [values,setAssets] = useState({
    assetid:''

  })
  
  const SetUsers = async () => { 

    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

     setUser({...userdata,

      userID : tokenDecoded.result[0].userDisplayID

  })
  }

  useEffect(() => {
    SetUsers()
    LoadAllCategories()
    LoadAllStatus()
    LoadAllSuppliers()
  }, [])

  const LoadAllCategories = async () => {
    try {
      
      const success = await axios.get("/assetcategory/viewassetcategory")

        .then((res) => {

          setCategory(res.data.result);


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

  const LoadAllStatus = async () => {
    try {

      const success = await axios.get("/getallStatus")
        //axios.get('/getViewallStatus')
        .then((res) => {
          setStatus(res.data.result);

        })
        .catch((err) => {
          
          const InsertLogs = new Logs(
            'Error',
            "Asset Status Viewer",
            "Function /LoadAllStatus",
            'LoadAllStatus',
            userdata.userID
          )

          
        });
    }
    catch(err) {
      alert(err)
    }
  }

  const LoadAllSuppliers = async () => {
    try {

      const success = await axios.get("/suppliers/viewallsuppliers")

        .then((res) => {
          setVendors(res.data.result);

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

  async function handleUpdate(event)  {

    try {

     

    } catch ( err ) {

      const errorStatus = err.code;

      if (errorStatus.includes("ERR_NETWORK")) {
        const useEffectLogs = new Logs(
          "DB",
          "Login",
          "Function /loginHandler",
          err,
          ""
        );

        alert(useEffectLogs.getMessage());
        console.log(useEffectLogs.getLogs());
       
      }

      if (errorStatus.includes("ERR_BAD_REQUEST")) {
        const useEffectLogs = new Logs(
          errorStatus,
          "Login",
          "Function /loginHandler",
          err.response.data.message,
          ""
        );
        useEffectLogs.getLogs();

        alert(useEffectLogs.getMessage());
        console.log(useEffectLogs.getLogs());
       

        useEffectLogs.insertLogs( useEffectLogs.getLogs() )

      }

    }
  }

  return (
    <>
    <Card
      w={{ base: "auto", md: "auto", lg: "auto" }}
      mx={{ base: 0, md: 0, lg: 3 }}
    >
      <Text fontWeight="bold" mb={5}>
        Asset
      </Text>
      <FormControl>
       
        <Stack gap={2} mt={10}>
        
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>

            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>Category </FormLabel>
              <Select >
              {categories.map((category) => (
                <option value={category.id} size='md'> 
                  {category.assetCategName}
                </option>
                ))
                
              }
            </Select>

            <FormLabel>Status: </FormLabel>
           
              <Select >
              {status.map((stat) => (
                <option value={stat.assetStatusID} size='md'> 
                  {stat.statusName}
                </option>
                ))
                 
              }
            </Select>

            <FormLabel>Supplier: </FormLabel>
           
           <Select >
           {vendors.map((vendor) => (
                <option value={vendor.id} size='md'> 
                  {vendor.supplierName}
                </option>
                ))
                
              }
          
          </Select>
            </GridItem>
            <GridItem>
              <Flex
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  borderRadius="100%"
                  bg="blackAlpha.100"
                  w={150}
                  h={150}
                  overflow="hidden"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                <Image
                  src={ imgFilename || "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"}
                  w={{ base: 100 }}
                />
                </Box>
                <input type="file" mt={4} />
            </Flex>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Serial No</FormLabel>
          <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Asset Code</FormLabel>
            <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Asset Name</FormLabel>
            <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Description</FormLabel>
            <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Date Purchase</FormLabel>
            <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Purchase Amunt</FormLabel>
            <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Depreciation Date</FormLabel>
            <Input type="text"/>
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Amount Depreciation</FormLabel>
            <Input type="text"/>
  
            </GridItem>
          </Grid>

          <Box>
            <Button  colorScheme="green" onClick={handleUpdate} > Save </Button>
          </Box>
        </Stack>
      </FormControl>
    </Card>
    </>
  );

}
