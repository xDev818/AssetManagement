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

// Jinshin
const myFunc = ( states, action ) => {

  switch( action.type ) {

    case 'myRole' : 
        return { ...states, user_role: action.payload }

    case 'myDepartment' :
        return { ...states, department: action.payload }

    case 'myFirstname' :
        return { ...states, firstname: action.payload }

    case 'myLastname' :
        return { ...states, lastname: action.payload }

    case 'myEmail' :
        return { ...states, email: action.payload }

    case 'myPassword' :
        return { ...states, password: action.payload }

    case 'myConfirmPassword' :
        return { ...states, confirm_password: action.payload }

    default: states

  }

}

const ACTION = {

  ROLE : 'myRole',
  DEPARTMENT : 'myDepartment',
  FIRSTNAME : 'myFirstname',
  LASTNAME : 'myLastname',
  EMAIL : 'myEmail',
  PASSWORD : 'myPassword',
  CONFIRM_PASSWORD : 'myConfirmPassword'

} // End Jinshin

export default function Asset() {

  //Jinshin
  const [ states, dispatch ] = useReducer( myFunc, { user_role: '', department: '', firstname: '', lastname: '', email: '', password: '', confirm_password: '' })
  // End Jinshin

  //Nole
  var userID = ''
  const [usergroups, setUserGroups] = useState([]);
  const [positions, setPositions] = useState([]);

  const [data, setData] = useState();
  const token = window.localStorage.getItem("token");
  const button = useRef(null)
  useEffect(() => {
    const decoded = decoder(token)
    setData(decoded?.result[0]);
  }, [setData]);
  data && console.log(data)
  // Destructuring personal info
  const firstname = data?.firstname
  const lastname = data?.lastname
  const displayID = data?.userDisplayID
  const department = data?.departmentName
  const email = data?.email
  const userRole = data?.userRole
  const imgFilename = data?.imgFilename

  // Jinshin
  const updateHandler = async () => {

    const buttonStatus = button.current
    buttonStatus.disabled = true;

    const values = {
      role: states.user_role || userRole,
      department: states.department || department,
      firstname: states.firstname || firstname,
      lastname: states.lastname || lastname,
      email: states.email || email,
      password: states.password,
    }

    // Tasks
    //  fix the image . make a seperate api call for it
    //  add password then match it, if match then update success else, use bcrypt if password has length else use the old one
    //  fetch the password in the set data data?.password
    //  is complete user will be redirected to dashboard

    try {

      const request = await axios.put(`/users/${displayID}`, values)
      const response = await request.data
      if ( response.message.includes('Updated Successfully') ) {

        localStorage.setItem("token", response.token);
        buttonStatus.disabled = false;
        window.location.reload()

      }

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
        buttonStatus.disabled = false;
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
        buttonStatus.disabled = false;

        useEffectLogs.insertLogs( useEffectLogs.getLogs() )

      }

    }

  }

  useEffect(() => {
    
    try {

      LoadAllUserGroups()
      LoadAllPositions()
    }
    catch(err) {
      alert(err)
    }

  }, [])

  const LoadAllUserGroups = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/usergroup/viewuser-group")

        .then((res) => {
          setUserGroups(res.data.result);

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

  const LoadAllPositions = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/positions/viewallpositions")

        .then((res) => {
          setPositions(res.data.result);
        
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

  return (
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
              <Select onChange={ e => dispatch( { type: ACTION.DEPARTMENT, payload: e.target.value } )}>
              <option value={ department }> { department } </option>
              <option value="Software">Software</option>
              <option value="Accessories">Accessories</option>
            </Select>

            <FormLabel>Status: </FormLabel>
           
              <Select onChange={ e => dispatch( { type: ACTION.DEPARTMENT, payload: e.target.value } )}>
              <option value={ department }> { department } </option>
              <option value="Available">Available</option>
              <option value="Broken  Not Fixable">Broken  Not Fixable</option>
            </Select>

            <FormLabel>Supplier: </FormLabel>
           
           <Select onChange={ e => dispatch( { type: ACTION.DEPARTMENT, payload: e.target.value } )}>
            <option value={ department }> { department } </option>
            <option value="Available">Available</option>
            <option value="Broken  Not Fixable">Broken  Not Fixable</option>
          
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
          <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Asset Code</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Asset Name</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Description</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Date Purchase</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Purchase Amunt</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Depreciation Date</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
            <GridItem>
            <FormLabel fontSize={{ base: "sm" }}>Amount Depreciation</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname || firstname } />
  
            </GridItem>
          </Grid>

          <Box>
            <Button ref={button} colorScheme="green" onClick={ updateHandler }> Save </Button>
          </Box>
        </Stack>
      </FormControl>
    </Card>
  );
}
