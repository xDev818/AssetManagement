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
import React, { useEffect, useState, useReducer } from "react";
import decoder from "jwt-decode";
import axios from 'axios'

// Jinshin
const myFunc = ( states, action ) => {

  switch( action.type ) {

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

  DEPARTMENT : 'myDepartment',
  FIRSTNAME : 'myFirstname',
  LASTNAME : 'myLastname',
  EMAIL : 'myEmail',
  PASSWORD : 'myPassword',
  CONFIRM_PASSWORD : 'myConfirmPassword'

} // End Jinshin

export default function UpdateProfile() {

  //Jinshin
  const [ states, dispatch ] = useReducer( myFunc, { department: '', firstname: '', lastname: '', email: '', password: '', confirm_password: '' })
  // End Jinshin

  const [data, setData] = useState();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    const decoded = decoder(token)
    setData(decoded?.result[0]);
  }, []);

  // Destructuring personal info
  const displayID = data?.userDisplayID
  const department = data?.departmentName
  const email = data?.email
  const userRole = data?.userRole
  const imgFilename = data?.imgFilename

  // Jinshin
  const updateHandler = async () => {

    console.log(data)

    const values = {
      department: states.department,
      firstname: states.firstname,
      lastname: states.lastname,
      email: states.email,
      password: states.password,
    }

    try {

      const request = await axios.put(`/users/${displayID}`, values)
      const response = await request.data
      console.log(response)

    } catch ( err ) {

      console.log( err )

    }

  }

  return (
    <Card
      w={{ base: "auto", md: "auto", lg: "auto" }}
      mx={{ base: 0, md: 0, lg: 3 }}
    >
      <Text fontWeight="bold" mb={5}>
        Profile
      </Text>
      <FormControl>
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
        <Stack gap={2} mt={10}>
          <FormLabel>Position: {userRole}</FormLabel>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Department</FormLabel>
            <Select onChange={ e => dispatch( { type: ACTION.DEPARTMENT, payload: e.target.value } )} defaultValue={ states.department || department }>
              <option value="option1">IT</option>
              <option value="option2">Admin</option>
              <option value="option3">Support Desk</option>
            </Select>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>First Name</FormLabel>
              <Input onChange={ ( e ) => dispatch( { type: ACTION.FIRSTNAME, payload: e.target.value } )}  placeholder="Firstname..." defaultValue={ states.firstname } />
            </GridItem>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>Last Name</FormLabel>
              <Input onChange={ ( e ) => dispatch( { type: ACTION.LASTNAME, payload: e.target.value } )}  placeholder="Lastname..." defaultValue={ states.lastname } />
            </GridItem>
          </Grid>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Email Address</FormLabel>
            <Input onChange={ ( e ) => dispatch( { type: ACTION.EMAIL, payload: e.target.value } )} defaultValue={ states.email || email} placeholder="Email..." />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Password</FormLabel>
            <Input type="password" onChange={ ( e ) => dispatch( { type: ACTION.PASSWORD, payload: e.target.value } )}  placeholder="Password..." defaultValue={states.password || "************"} />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Confirm Password</FormLabel>
            <Input type="password" onChange={ ( e ) => dispatch( { type: ACTION.CONFIRM_PASSWORD, payload: e.target.value } )}  placeholder="Confirm Password..." defaultValue={states.confirm_password || "************"} />
          </Box>

          <Box>
            <Button colorScheme="green" onClick={ updateHandler }>Update Profile</Button>
          </Box>
        </Stack>
      </FormControl>
    </Card>
  );
}
