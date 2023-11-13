/* 

    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      Create AssetStatus.js

      import { Link as Anchor } from 'react-router-dom'
      import Logs from 'components/Utils/logs_helper'
      import axios from 'axios'

      Create useEffect to Create/Update the Asset Status

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      update useEffect(() => { .. }
      new function handleUpdate for ( Insert and Update )
        
*/

import { useLocation, Link } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
//import axios from "axios";
import { placeHolderAPI } from "index";
import decoder from "jwt-decode";

import {
  FormLabel,
  Stack,
  Box,
  Input,
  FormControl,
  Select,
  SimpleGrid,
  Text,
  AbsoluteCenter,
  Grid,
  Spacer,
  Flex,
  Avatar,
  HStack,
  Textarea,
  GridItem,
  Center,
} from "@chakra-ui/react";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { HSeparator } from "components/Separator/Separator";

import { Button, ButtonGroup } from "@chakra-ui/react";

import Modal1 from "components2/Modal/Modal";
import { useParams } from "react-router-dom";
import defaultLogo from "../../assets/img/Department.png"

export default function Position() {
  

  const textColor = "#00334d"
  const graphCardBg = '#e6f2ff'

  // const { id } = useParams();
  // console.log("poid", id);
  var userID = "";

  const [values, setPosition] = useState({
    positionid: "",
    positionname: "",
    description: "",
    departmentid: "",
    departmentname: "",
  });

  const [departments, setDepartments] = useState([]);
  const [btnstate,setbtnState] = useState()


    useEffect(() => {
      LoadallDepartments();
      try {
        
        const hashFragment = window.location.hash; // Get the hash fragment, e.g., '#/admin/position/b3552fb4-f7eb-4aae-8f4d-d12fcd338c18'
        const parts = hashFragment.split("/"); // Split the hash fragment by '/'
        const id = parts[parts.length - 1]; // Get the last part, which is the ID

        

        if(id === 'position') {
          setbtnState("Save");
          setPosition({
            ...values,
            positionid: "",
            positionname: "",
            description: "",
            departmentid: "",
            departmentname: "",
          });
        }
        
        else if(id) {
        
          placeHolderAPI 
            .get('/positions/getPositionID/' + id)
            .then((res) => {
              setbtnState("Update")
                setPosition({
                  ...values,
                  positionid: res.data.result[0].positionDisplayID,
                  positionname: res.data.result[0].positionName,
                  description: res.data.result[0].description,
                  departmentid: res.data.result[0].departmentDisplayID,
                  departmentname: res.data.result[0].departmentName
                })
               
            })
            .catch((err) => {
             // setbtnState("Save")
             alert(err);
             window.location.href = '/'; 
             
            });
          
        }
       else {
        setbtnState("Save");
        setPosition({
          ...values,
          positionid: "",
          positionname: "",
          description: "",
          departmentid: "",
          departmentname: "",
        });
       }
       

      }
      catch(err) {
        alert(err)
      }
    }, [])

  const LoadallDepartments = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const res = await placeHolderAPI 
        .get("/get_all_departments");
      const data = await res.data;

      setDepartments(res.data.result);
    } catch (err) {
      alert(err);
    }
  }

  async function handleUpdate(event) {
    try {
      event.preventDefault();
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      const userID = tokenDecoded.result[0].userDisplayID;

      const positionvalues = {
        positionid: values.positionid,
        positionname: values.positionname,
        description: values.description,
        departmentid: values.departmentid,
        departmentname: values.departmentname,
        userID: userID,
      };

      if (positionvalues.positionid === "") {
        // insert here
        const success = await placeHolderAPI
          .post("/positions/createNewPosition", positionvalues)
          .then((res) => {
            alert("Insert Successful");

            const InsertLogs = new Logs(
              "Info",
              "Asset Status",
              "Function /handleUpdate",
              " Create   Position name :  " + positionvalues.positionname,
              userID
            );

            // const request = axios.post('/log',InsertLogs.getLogs())
            // const response =  request.data

            window.location.href = "/#/admin/position-viewer";
          })
          .catch((err) => {
            alert(err);
          });
      } else if (!positionvalues.positionid == "") {
        /// update here
        const success = await placeHolderAPI
          .post("/positions/updatePosition", positionvalues)
          .then((res) => {
            alert("Update Successful");

            const InsertLogs = new Logs(
              "Info",
              "Asset Status",
              "Function /handleUpdate",
              " Update Position ID : " +
                positionvalues.positionid +
                " Position Name :  " +
                positionvalues.positionname,
              userID
            );

            //  const request = axios.post('/log',InsertLogs.getLogs())
            //  const response =  request.data

            window.location.href = "/#/admin/position-viewer";
          })
          .catch((err) => {
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
              const submitLogs = new Logs(
                "DB",
                "AssetStatus",
                "Function /HandleSubmit",
                err,
                userID
              );

              alert(submitLogs.getMessage());
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              const submitLogs = new Logs(
                "Error",
                "Asset Status",
                "Function /HandleSubmit",
                err.response.data.message,
                userID
              );

              try {
                const request = placeHolderAPI 
                  .post("/log", submitLogs.getLogs());
                const response = request.data;
                console.log(response);
              } catch (err) {
                const logStatus = err.code;

                if (logStatus.includes("ERR_NETWOR")) {
                  const submitLogs = new Logs(
                    "DB",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err,
                    userID
                  );

                  alert(submitLogs.getMessage());
                  console.log(submitLogs.getLogs());
                }

                if (logStatus.includes("ERR_BAD_REQUEST")) {
                  const submitLogs = new Logs(
                    "Error",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err.response.data.message,
                    userID
                  );

                  alert(submitLogs.getMessage());
                  console.log(submitLogs.getLogs());
                }
              }
            }
          });
      }
    } catch (err) {
      alert(err);
    }
  }

  return (

    <>
    <HStack>
      
      <FormControl>  
         <Grid templateColumns={{ repeat:('6','1fr'), sm: "1fr", lg: "1.6fr 1.2fr" }} gap={5} >
         <GridItem colSpan={4}  maxHeight={'600px'} >
            <Card bg={graphCardBg} maxHeight={'600px'}>

              <Card bg={'white'}>

              <Flex align='center' mb='18px' >
                  
                  <Box  >
                    <Text
                      fontSize='md'
                      color={textColor}
                    
                      fontWeight='bold'
                      me='10px'>
                      Department:{" "}
                    </Text> 
                  </Box>
                  <Box pl={'2'} w={'100%'}   >
                    <Select
                      placeholder="Select option"
                      size="md"
                      maxWidth={'100%'}
                      onChange={(e) => {
                        setPosition({ ...values, departmentid: e.target.value });
                      }}
                      value={values.departmentid}
                    >
                      {departments.map((department) => (
                        <option value={department.departmentDisplayID} size="md">
                          {department.departmentName}
                        </option>
                      ))}
                    </Select>
                  </Box> 
                </Flex>

                <Flex align='center' mb='18px'>
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'}>
                    <Text
                      fontSize='md'
                      color={textColor}
                      w={'95px'}
                      fontWeight='bold'
                      me='10px'>
                      Position:{" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                    <Input
                        id="positionname"
                        label="Position name"
                        placeholder="Position Name"
                        value={values.positionname}
                        onChange={(e) => {
                          setPosition({ ...values, positionname: e.target.value });
                        }}
                      />
                  </Box>
                </Flex>
                <Flex align='center' mb='18px'>
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'} h={'80px'}>
                    <Text
                      fontSize='md'
                      color={textColor}
                      w={'95px'}
                      fontWeight='bold'
                      me='10px'>
                      Description:{" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                    <Textarea
                      id="description"
                      label="Description"
                      size="sm"
                      placeholder="Description"
                      value={values.description}
                      onChange={(e) => {
                        setPosition({ ...values, description: e.target.value });
                      }}
                    />
                  </Box>
                </Flex>

               
                
                  <Center>
                    <Button colorScheme="green" onClick={handleUpdate}>
                            Save
                      </Button>
                  </Center>

             
              </Card>
            </Card>
        </GridItem>
        <GridItem colStart={5} colEnd={6} maxHeight={'600px'} >
          <Card bg={graphCardBg}  >
              <Card bg={'white'}>
               
                    <Center  >
                      <Avatar
                      bg={'white'}
                      src = {defaultLogo}
                      h={'220px'}
                      w={'220px'}
                      >

                      </Avatar>
                    </Center>
  
                 
                 
                  <Box align='center'>
                    <Center>
                    <Button colorScheme="green" >
                          Upload Image
                    </Button>
                    </Center>

                  </Box>
           
                          
              </Card>
          </Card>
          </GridItem>
        </Grid>


      </FormControl>
    </HStack>
    </>
  );
}
