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
import axios from "axios";
import decoder from "jwt-decode";

import {
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Box,
  Input,
  FormControl,
  Select,
  SimpleGrid,
  Text,
  AbsoluteCenter
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

import Modal1 from "components2/Modal/Modal";
import Card from "components/Card/Card";
import { useParams } from "react-router-dom";

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
        
            axios.get('/positions/getPositionID/' + id)
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

      const res = await axios.get("/get_all_departments");
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
        const success = await axios
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
        const success = await axios
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
                const request = axios.post("/log", submitLogs.getLogs());
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
    <Stack>
      <FormControl>
        
        <Card bg={graphCardBg}>
          <Card bg={'white'}>
          <SimpleGrid columns={'12'}spacing='2px'> 
            <Box pl={'2'} w={'120px'}  >
             
              <Text color={textColor} textTransform={'uppercase'} fontSize={'sm'}>
                Department
              </Text>
             
              </Box>
            <Box pl={'2'} w={'40vw'}  >
              <Select
                placeholder="Select option"
                size="md"
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
            </SimpleGrid>
         
            <SimpleGrid columns={'12'}spacing='5px'> 
          <Box pl={'2'} w={'140px'} bg={'tomato'} >
              <Text color={textColor} textTransform={'uppercase'} fontSize={'sm'}>
                Position
              </Text>
          </Box>
          <Box pl={'2'} w={'40vw'}  >
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
          </SimpleGrid>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Description: </FormLabel>
            <Input
              id="description"
              label="Description"
              placeholder="Description"
              value={values.description}
              onChange={(e) => {
                setPosition({ ...values, description: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Button colorScheme="green" onClick={handleUpdate}>
              {/* <Link
                  to={{
                  pathname: "/admin/assetstatusviewer"
                  }}>
              </Link> */}
              {btnstate}
            </Button>
          </Box>
          </Card>
        </Card>
      </FormControl>
    </Stack>
  );
}
