
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
          
    Date : 11 / 11 / 23
    Author : Nole
    Activities
    Purpose : 
      Update Profile
           add handleLogout to re-direct to signin

*/
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

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
  useToast
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import React, { useEffect, useState, useReducer, useRef } from "react";
import decoder from "jwt-decode";
import axios from "axios";
import Logs from "components/Utils/logs_helper";
import { useParams } from "react-router-dom";
import { column } from "stylis";

import imgDefault from "../../assets/img/defaultImage.webp";
//import t from '../../../../backend/images/static/'

export default function UpdateProfile() {

  // const toast = useToast()

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  //Nole
  var userID = "";
  const [usergroups, setUserGroups] = useState([]);
  const [positions, setPositions] = useState([]);
 
  const [data, setData] = useState();
  var [file, setFile] = useState('');

  const [values,setProfile] = useState({
    user_id : "",
    user_positionid: "",
    user_groupid :"",
    user_firstname: "",
    user_lastname: "",
    user_email: "",
    user_displayname: "",
    userRole: "",
    imgFilename: ""
  })
  
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decoder(token);
    setData(decoded?.result[0]);

   

    setProfile({
      ...values,
      user_id: decoded?.result[0].userDisplayID ,
      user_positionid: decoded?.result[0].positionID,
      user_groupid: decoded?.result[0].groupTypeID,
      user_firstname: decoded?.result[0].firstname,
      user_lastname: decoded?.result[0].lastname,
      user_email: decoded?.result[0].email,
      user_displayname: decoded?.result[0].displayName,
      userRole : decoded?.result[0].userRole,
      imgFilename: decoded?.result[0].imgFilename
    })


   // console.log("id", id);
  }, [setData]);
 

  useEffect(() => {
    try {
        
      
  
      LoadAllUserGroups();
      LoadAllPositions();
    } catch (err) {
      alert(err);
    }
  }, []);
  
  const handleLogout = () => {
      try {
      const storage = localStorage;
      window.localStorage.removeItem("token");

      if (!storage.getItem("token")) {
        window.location.href = "/#/auth/signin";
        
      }
    } catch (err) {
      //window.location.reload()
    }
    finally {
      window.location.reload()
    }

  };

  // Jinshin
  const updateHandler = async () => {

    const updatevalues = {

     
      userID: values.user_id,
      positionID: values.user_positionid,
      groupID: values.user_groupid,
      firstname: values.user_firstname,
      lastname: values.user_lastname,
      email: values.user_email,
      displayname: values.user_displayname,
      imgFilename: values.imgFilename
    };
   
    try {
      const request = await axios.post('/users/update-profile', updatevalues);
      const response = await request.data;

      if (response.message.includes("Update Success")) {
          // viewToastify(
          //           "Update Profile",
          //           "User Profile updated successfully",
          //           "success"
          //         )

        //localStorage.setItem("token", response.token);
        handleLogout()
       
        
       // buttonStatus.disabled = false;
       // window.location.reload();
      // window.location.href = "/#/auth/signin"

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
        //buttonStatus.disabled = false;
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
        //buttonStatus.disabled = false;

        useEffectLogs.insertLogs(useEffectLogs.getLogs());
      }
    }
   window.location.reload()
  };


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

  // useEffect(() => {
  //   return
  //    <>
  //   </>
  // }, [file])


const handleUploadImage = async (e) => {
  console.log(e.target.files[0])

  const imagevalues = {
    userid: values.user_id,
    image: e.target.files[0]
  }

  const image = new FormData()
  image.append("file",e.target.files[0])

    try {
     
        const requestImg = await axios.post("/users/upload-image/" + values.user_id, image, {

          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })


    } catch (err) {
      alert(err)
    }


}

  return (
    <>
      {/* TABLET AND DESKTOP RESPONSIVE */}
      <Card
        w={{ base: "auto", md: "auto", lg: "auto" }}
        mx={{ base: 0, md: 0, lg: 3 }}
        display={{ base: "none", md: "block" }}
        bg={graphCardBg}
      >
        <Card bg={'white'}>
        <Text fontWeight="bold" mb={5}>
          Profile
        </Text>
        <FormControl>
          <Grid
            templateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={5}
          >
            <Card>
              <FormLabel fontWeight="bold">
                <Flex alignItems="center" gap={2}>
                  <PersonIcon />
                  Edit Profile
                </Flex>
              </FormLabel>
              <Flex gap={2} flexDirection={"column"}>
                <Flex
                  alignItems="center"
                  justifyContent="flex-start"
                  w="70%"
                  gap={1}
                >
                  <FormLabel fontWeight="semibold" w={20}>
                    Avatar
                  </FormLabel>
                  <Input
                    display="none"
                    name="file"
                    //id="file"
                    type="file"
                    mt={4}
                    // onChange={(e) => setFile(e.target.files[0])}
                    onChange={(e) => handleUploadImage(e)}
                    id="file-input"
                  />
                  <FormLabel htmlFor="file-input">
                    <Button
                      as="span"
                      size="sm"
                      colorScheme="teal"
                      py={5}
                      rounded="4px"

                     // onClick={handleUploadImage}

                    >
                      Upload Image
                    </Button>
                  </FormLabel>
                </Flex>
                <Flex alignItems="center">
                  <FormLabel w={100}>First Name</FormLabel>
                  <Input
                     onChange={ e => {
                      setProfile( { ...values, user_firstname: e.target.value } )}}
                    
                    placeholder="Firstname..."
                    defaultValue= { values.user_firstname}
                  />
                </Flex>
                <Flex alignItems="center">
                  <FormLabel w={100}>Last Name</FormLabel>
                  <Input
                     onChange={ e => {
                      setProfile( { ...values, user_lastname: e.target.value } )}}
                    placeholder="Lastname..."
                    defaultValue={values.user_lastname}
                  />
                </Flex>
                <Flex alignItems="center">
                  <FormLabel w={100}>Email </FormLabel>
                  <Input
                    onChange={ e => {
                      setProfile( { ...values, user_email: e.target.value } )}}
                    defaultValue={values.user_email}
                    placeholder="Email..."
                  />
                </Flex>
              </Flex>
            </Card>

            <Card>
              <FormLabel fontWeight="bold">
                <Flex alignItems="center" gap={2}>
                  <PersonIcon />
                  Profile
                </Flex>
              </FormLabel>
              <Flex justifyContent="center" flexDirection="column" gap={2}>
                <Flex mx="auto">
                  <Image
                    src={



                       values?.imgFilename
                             ? 

                              `http://localhost:5001/image/static/${values?.imgFilename}`
                  
                             :  imgDefault


                      // values.imgFilename ||
                      // "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"
                    }
                    w={{ base: 100 }}
                  />
                </Flex>
                <FormLabel>
                  User Group: {values.userRole }
                </FormLabel>
                <Select
                  placeholder="Select option"
                  size="md"
                  onChange={ e => {
                    setProfile( { ...values, user_groupid: e.target.value } )}}
                    value={values.user_groupid}
                >
                  {usergroups.map((group) => (
                    <option value={group.id} size="md">
                      {group.categoryName}
                    </option>
                  ))}
                </Select>
                <Box>
                  <FormLabel>Position : </FormLabel>
                  {/* <Select onChange={ e => dispatch( { type: ACTION.DEPARTMENT, payload: e.target.value } )}>
              <option value={ department }> { department } </option>
              <option value="Production">Production</option>
              <option value="Accounting">Accounting</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="ITDepartment">ITDepartment</option>
              <option value="Default Department">Default Department</option>
            </Select> */}
                  <Select
                    placeholder="Select option"
                    size="md"
                    onChange={ e => {
                      setProfile( { ...values, user_positionid: e.target.value } )}}
                      value={values.user_positionid}
                  >
                    {positions.map((position) => (
                      <option value={position.id} size="md">
                        {position.positionName}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Flex>
            </Card>

            <GridItem colSpan={2}>
              <Card>
                <FormLabel fontWeight="bold">
                  <Flex alignItems="center" gap={2}>
                    <PersonIcon />
                    Change Password
                  </Flex>
                </FormLabel>
                <Box>
                  <FormLabel fontSize={{ base: "sm" }}>Password</FormLabel>
                  <Input
                    type="password"
                    // onChange={(e) =>
                    //   dispatch({
                    //     type: ACTION.PASSWORD,
                    //     payload: e.target.value,
                    //   })
                    // }
                    placeholder="Password..."
                   // defaultValue={states.password || "************"}
                  />
                </Box>
                <Box>
                  <FormLabel fontSize={{ base: "sm" }}>
                    Confirm Password
                  </FormLabel>
                  <Input
                    type="password"
                    // onChange={(e) =>
                    //   dispatch({
                    //     type: ACTION.CONFIRM_PASSWORD,
                    //     payload: e.target.value,
                    //   })
                    // }
                    placeholder="Confirm Password..."
                   // defaultValue={states.confirm_password || "************"}
                  />
                </Box>
                <Box mt={3}>
                  <Button
                    rounded={5}
                    size="md"
                    
                    colorScheme="green"
                    onClick={updateHandler}
                  >
                    Update Profile
                  </Button>
                </Box>
              </Card>
            </GridItem>
          </Grid>
        </FormControl>
        </Card>
      </Card>
      {/* MOBILE RESPONSIVE */}
      <Card display={{ base: "flex", md: "none" }}>
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
                // values.imgFilename ||
                // "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"

                values.imgFilename
                ? require(`../../../../backend/images/static/${values.imgFilename}`)
                //require(`../../../../backend/images/static/${values.imgFilename}`)
                :  imgDefault


              }
              w={{ base: 100 }}
            />
          </Box>
          <input
            name="file"
            id="file"
            type="file"
            mt={4}
            onChange={(e) => setFile(e.target.files[0])}
            onClick={handleUploadImage}
          />
        </Flex>
        <Stack gap={2} mt={10}>
          <FormLabel>User Group: {values.userRole}</FormLabel>
          <Select
            placeholder="Select option"
            size="md"
            onChange={ e => {
              setProfile( { ...values, user_groupid: e.target.value } )}}
              value={values.user_groupid}
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
            <Select
              placeholder="Select option"
              size="md"
              onChange={ e => {
                setProfile( { ...values, user_positionid: e.target.value } )}}
                value={values.user_positionid}
            >
              {positions.map((position) => (
                <option value={position.id} size="md">
                  {position.positionName}
                </option>
              ))}
            </Select>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>First Name</FormLabel>
              <Input
               onChange={ e => {
                setProfile( { ...values, user_firstname: e.target.value } )}}
                placeholder="Firstname..."
                defaultValue={values.user_firstname }
              />
            </GridItem>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>Last Name</FormLabel>
              <Input
               onChange={ e => {
                setProfile( { ...values, user_lastname: e.target.value } )}}
                placeholder="Lastname..."
                defaultValue={values.user_lastname }
              />
            </GridItem>
          </Grid>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Email Address</FormLabel>
            <Input
             onChange={ e => {
              setData( { ...values, user_email: e.target.value } )}}
              defaultValue={values.user_email}
              placeholder="Email..."
            />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Password</FormLabel>
            <Input
              type="password"
              // onChange={(e) =>
              //   dispatch({ type: ACTION.PASSWORD, payload: e.target.value })
              // }
              placeholder="Password..."
              defaultValue={"************"}
            />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Confirm Password</FormLabel>
            <Input
              type="password"
              // onChange={(e) =>
              //   dispatch({
              //     type: ACTION.CONFIRM_PASSWORD,
              //     payload: e.target.value,
              //   })
              // }
              placeholder="Confirm Password..."
              defaultValue={"************"}
            />
          </Box>
          <Box>
            <Button  colorScheme="green" onClick={updateHandler}>
              Update Profile
            </Button>
          </Box>
        </Stack>
      </Card>
      
    </>
  );
}
