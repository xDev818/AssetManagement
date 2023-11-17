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
useToast
} from "@chakra-ui/react";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { HSeparator } from "components/Separator/Separator";

import { Button, ButtonGroup } from "@chakra-ui/react";

import Modal1 from "components2/Modal/Modal";
import { useParams } from "react-router-dom";
import defaultLogo from "../../assets/img/Department.png"


//import showToast from "components/Utils/showToast";

export default function Position() {
  
  const toast = useToast()

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


    function showToast(title,desc,status) {
    
     return (
       
           toast({
             title: title,
             description: desc,
             status: status,
             duration: 3000,
             //isClosable: true,
             position: "top"
           })

      
      
     )
   }


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

              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
              
                showToast(
                  "Position",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "Position",
                  "Function useEffect /positions/getPositionID/",
                  err.response.data.message,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading selected Position",
                'Please wait while we are logging error',
                'warning')
              } else {

                const submitLogs = new Logs(
                  "Error",
                  "User",
                  "Function useEffect /positions/getPositionID/",
                  err,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading selected Position",
               'Please wait while we are logging error',
               'warning')
              }
             
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
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
        
          showToast(
            "Position",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "Position",
            "Function useEffect",
            err.response.data.message,
            userID
          );
          submitLogs.insertLogs(submitLogs)
          showToast(
            "Position",
            errorStatus,
            "error"
          )
        }
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
      const errorStatus = err.code;

      if (errorStatus.includes("ERR_NETWORK")) {
      
        showToast(
          "Position",
          errorStatus,
          "error"
        )

      } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
      
        const submitLogs = new Logs(
          "Error",
          "Position",
          "Function LoadallDepartments",
          err.response.data.message,
          userID
        );
        submitLogs.insertLogs(submitLogs)
        showToast(
          "Position",
          errorStatus,
          "error"
        )
      }
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
            
            showToast(
              "Position",
              "Updated Position successfull",
              "success"
            )

            const InsertLogs = new Logs(
              "Info",
              "Position",
              "Function /handleUpdate",
              " Create   Position name :  " + positionvalues.positionname,
              userID
            );

            InsertLogs.insertLogs(InsertLogs)

            window.location.href = "/#/admin/position-viewer";
          })
          .catch((err) => {
           
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
            
              showToast(
                "Position",
                errorStatus,
                "error"
              )

            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
            
              const submitLogs = new Logs(
                "Error",
                "Position",
                "Function /handleUpdate",
                err.response.data.message,
                userID
              );
              submitLogs.insertLogs(submitLogs)
              showToast(
                "Position",
                errorStatus,
                "error"
              )
            }

          });

          
      } else if (!positionvalues.positionid == "") {
        /// update here
        const success = await placeHolderAPI
          .post("/positions/updatePosition",positionvalues)

          .then((res) => {
           
           if(res.data.message === 'Update Success') {
           
            const InsertLogs = new Logs(
              "Info",
              "Position",
              "Function /handleUpdate",
              " Update Position ID : " +
                positionvalues.positionid +
                " Position Name :  " +
                positionvalues.positionname,
              userID
            );

            InsertLogs.insertLogs(InsertLogs)
            showToast(
              "Position",
              "Updated " + positionvalues.positionname + " successfull",
              "success"
            )
            window.location.href = "/#/admin/position-viewer";

           } else {
           
            const InsertLogs = new Logs(
              "Info",
              "Position",
              "Function /handleUpdate",
              " Update Position ID : " +
                positionvalues.positionid +
                " Position Name :  " +
                positionvalues.positionname,
              userID
            );

            showToast(
              "Position",
              res.data.message,
              "error"
            )

            InsertLogs.insertLogs(InsertLogs)

           
           }
          })
          .catch((err) => {
            
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
            
              showToast(
                "Position",
                errorStatus,
                "error"
              )

            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
            
              const submitLogs = new Logs(
                "Error",
                "Position",
                "Function /HandleSubmit",
                err.response.data.message,
                userID
              );
             
              submitLogs.insertLogs(submitLogs)
              showToast(
                "Position",
                errorStatus,
                "error"
              )
            }
          });
      }
    } catch (err) {
   
      const submitLogs = new Logs(
        "Error",
        "Position",
        "Function /handleUpdate ( main catch)",
        err,
        userID
      );

     const errResponse = submitLogs.insertLogs(submitLogs)

     if(errResponse === 'Success') {
      showToast(
        "Position",
        'Writing Error Successful \n' + err ,
        "info"
      )
     } else {
      showToast(
        "Position",
        err,
        "error"
      )
     }
     
    }
  }

  return (

    <>
    <Stack>
      
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
    </Stack>
    </>
  );
}
