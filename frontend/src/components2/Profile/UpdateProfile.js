/* 

    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      Update Profile
          *** add var userID = ''
          *** Add useEffect() to get all User Group
          *** function  LoadAllUserGroups()
          *** function LoadAllPositions()
          *** later to fix Load Data based on userGroup assgined (LoadAllUserGroups() , LoadAllPositions())
          

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
import axios from "axios";
import Logs from "components/Utils/logs_helper";
import { useParams } from "react-router-dom";

// Jinshin
const myFunc = (states, action) => {
  const params = useParams();
  switch (action.type) {
    case "myRole":
      return { ...states, user_role: action.payload };

    case "myDepartment":
      return { ...states, department: action.payload };

    case "myFirstname":
      return { ...states, firstname: action.payload };

    case "myLastname":
      return { ...states, lastname: action.payload };

    case "myEmail":
      return { ...states, email: action.payload };

    case "myPassword":
      return { ...states, password: action.payload };

    case "myConfirmPassword":
      return { ...states, confirm_password: action.payload };

    default:
      states;
  }
};

const ACTION = {
  ROLE: "myRole",
  DEPARTMENT: "myDepartment",
  FIRSTNAME: "myFirstname",
  LASTNAME: "myLastname",
  EMAIL: "myEmail",
  PASSWORD: "myPassword",
  CONFIRM_PASSWORD: "myConfirmPassword",
}; // End Jinshin

export default function UpdateProfile() {
  //Jinshin
  const [states, dispatch] = useReducer(myFunc, {
    user_role: "",
    department: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  // End Jinshin

  //Nole
  var userID = "";
  const [usergroups, setUserGroups] = useState([]);
  const [positions, setPositions] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState();
  const token = window.localStorage.getItem("token");
  const button = useRef(null);
  useEffect(() => {
    const decoded = decoder(token);
    setData(decoded?.result[0]);
    console.log("id", id);
  }, [setData]);
  data && console.log(data);
  // Destructuring personal info
  const firstname = data?.firstname;
  const lastname = data?.lastname;
  const displayID = data?.userDisplayID;
  const department = data?.departmentName;
  const email = data?.email;
  const userRole = data?.userRole;
  const imgFilename = data?.imgFilename;

  // Jinshin
  const updateHandler = async () => {
    const buttonStatus = button.current;
    buttonStatus.disabled = true;

    const values = {
      role: states.user_role || userRole,
      department: states.department || department,
      firstname: states.firstname || firstname,
      lastname: states.lastname || lastname,
      email: states.email || email,
      password: states.password,
    };

    // Tasks
    //  fix the image . make a seperate api call for it
    //  add password then match it, if match then update success else, use bcrypt if password has length else use the old one
    //  fetch the password in the set data data?.password
    //  is complete user will be redirected to dashboard

    try {
      const request = await axios.put(`/users/${displayID}`, values);
      const response = await request.data;

      if (response.message.includes("Updated Successfully")) {
        localStorage.setItem("token", response.token);
        buttonStatus.disabled = false;
        window.location.reload();
      }
    } catch (err) {
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

        useEffectLogs.insertLogs(useEffectLogs.getLogs());
      }
    }
  };

  useEffect(() => {
    try {
      LoadAllUserGroups();
      LoadAllPositions();
    } catch (err) {
      alert(err);
    }
  }, []);

  const LoadAllUserGroups = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/usergroup/viewuser-group")

        .then((res) => {
          setUserGroups(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const LoadAllPositions = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/positions/viewallpositions")

        .then((res) => {
          setPositions(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

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
              src={
                imgFilename ||
                "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"
              }
              w={{ base: 100 }}
            />
          </Box>
          <input type="file" mt={4} />
        </Flex>
        <Stack gap={2} mt={10}>
          <FormLabel>User Group: { states.user_role || userRole}</FormLabel>
          <Select placeholder='Select User Group' size='md'
            //  onChange={ e => {
            //   setUserGroups( { ...values, departmentid: e.target.value } )}}
            //   value={usergroups.}
          >
            {usergroups.map((group) => (
              <option value={group.id} size="md">
                {group.categoryName}
              </option>
            ))}
          </Select>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Position : </FormLabel>
            {/* <Select onChange={ e => dispatch( { type: ACTION.DEPARTMENT, payload: e.target.value } )}>
              <option value={ department }> { department } </option>
              <option value="Production">Production</option>
              <option value="Accounting">Accounting</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="ITDepartment">ITDepartment</option>
              <option value="Default Department">Default Department</option>
            </Select> */}
            <Select placeholder='Select Position' size='md'
            //  onChange={ e => {
            //   setUserGroups( { ...values, departmentid: e.target.value } )}}
            //   value={usergroups.}
             >
              {positions.map((position) => (
                <option value={position.id} size="md">
                  {position.positionName}
                </option>
                ))
                 
              }
            </Select>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>First Name</FormLabel>
              <Input
                onChange={(e) =>
                  dispatch({ type: ACTION.FIRSTNAME, payload: e.target.value })
                }
                placeholder="Firstname..."
                defaultValue={states.firstname || firstname}
              />
            </GridItem>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>Last Name</FormLabel>
              <Input
                onChange={(e) =>
                  dispatch({ type: ACTION.LASTNAME, payload: e.target.value })
                }
                placeholder="Lastname..."
                defaultValue={states.lastname || lastname}
              />
            </GridItem>
          </Grid>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Email Address</FormLabel>
            <Input
              onChange={(e) =>
                dispatch({ type: ACTION.EMAIL, payload: e.target.value })
              }
              defaultValue={email}
              placeholder="Email..."
            />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) =>
                dispatch({ type: ACTION.PASSWORD, payload: e.target.value })
              }
              placeholder="Password..."
              defaultValue={states.password || "************"}
            />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Confirm Password</FormLabel>
            <Input
              type="password"
              onChange={(e) =>
                dispatch({
                  type: ACTION.CONFIRM_PASSWORD,
                  payload: e.target.value,
                })
              }
              placeholder="Confirm Password..."
              defaultValue={states.confirm_password || "************"}
            />
          </Box>

          <Box>
            <Button ref={button} colorScheme="green" onClick={updateHandler}>
              Update Profile
            </Button>
          </Box>
        </Stack>
      </FormControl>
    </Card>
  );
}
