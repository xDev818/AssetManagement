// Chakra imports
import {
    Flex,
    Stack,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesProjectRow from "components/Tables/TablesProjectRow";
  import TablesTableRow from "components/Tables/TablesTableRow";
  import React from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  

  import  { useEffect, useState } from 'react'
//import axios from 'axios'
import { placeHolderAPI } from "index";
import decoder from 'jwt-decode'
import imgDefault from "../../assets/img/defaultImage.webp";

import DataTable from "components2/TanstackTable/DataTable";

  function UsersViewer() {


    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [user, setUsers] = useState([]);
    const [userdata, setUser] = useState({
      userID: "",
    });
  
    const borderColor = useColorModeValue("gray.200", "gray.600");
  
    useEffect(() => {
      SetUsers();
      LoadAllUsers();
    }, []);

    const SetUsers = async () => {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);
  
      setUser({
        ...userdata,
  
        userID: tokenDecoded.result[0].userDisplayID,
      });
    };

    const LoadAllUsers = async () => {
      try {
        const request = await placeHolderAPI.get("/users")

          .then((res) => {
            setUsers(res.data.result);
          })
          .catch((err) => {
            const useEffectLogs = new Logs(
              "Error",
              "UserViewer",
              "Function /LoadAllUsers",
              "LoadAllUsers",
              userdata.userID
            );

            useEffectLogs.insertLogs( useEffectLogs.getLogs() )

          });
      } catch (err) {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
          const useEffectLogs = new Logs(
            "DB",
            "Login",
            "Function /loginHandler",
            err,
            userdata.userID
          );
  
          console.log(useEffectLogs.getLogs());
         
        }
  
        if (errorStatus.includes("ERR_BAD_REQUEST")) {
          const useEffectLogs = new Logs(
            errorStatus,
            "Login",
            "Function /loginHandler",
            err.response.data.message,
            userdata.userID
          );
                    
          useEffectLogs.insertLogs( useEffectLogs.getLogs() )
  
        }
      }
    };

    
    return (
      <Stack>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px" bg={graphCardBg}>
          
          <Card bg={'white'}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
              List of Users
            </Text>
          </CardHeader>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400" >
                  <Th pl="0px" borderColor={borderColor} color="gray.400" >
                    USER
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" >Dept</Th>
                  <Th borderColor={borderColor} color="gray.400" >Status</Th>
                  <Th borderColor={borderColor} color="gray.400" >Created</Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                
                {user.map((row, index, arr) => {
                  return (
                    <TablesTableRow
                      name={row.FullName}
                      logo={
                        
                        row?.imgFilename
                        ? 

                         `http://localhost:5001/image/static/${row?.imgFilename}`
             
                        :  imgDefault


                        }
                      email={row.email}
                      subdomain={row.positionName}
                      domain={row.departmentName}
                      status={
                        
                        row?.active
                        ? 

                         'Online'
             
                        :  'Offline'


                        }

                        
                      date={row.date_created}
                      isLast={index === arr.length - 1 ? true : false}
                      action= {
                        row.active === 1 
                        ? 'Deactivate'
                        : 'Deactivated'
                      }
                      mpointer = {
                        row.active === 1 
                        ? 'pointer'
                        : null
                      }
                      key={index}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </Card>
        </Card>

      </Flex>
      </Stack>
    );
  }
  
  export default UsersViewer;
  