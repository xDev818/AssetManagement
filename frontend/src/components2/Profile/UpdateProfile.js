
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
  useToast,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
  Avatar,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import React, { useEffect, useState, useReducer, useRef } from "react";
import decoder from "jwt-decode";
import { hash_password,compare_password } from "components/Utils/password_helper";

//import axios from "axios";
import Logs from "components/Utils/logs_helper";
import { placeHolderAPI } from "index";

import { useParams } from "react-router-dom";
import { column } from "stylis";

import imgDefault from "../../assets/img/defaultImage.webp";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader.js";
import { HSeparator } from "components/Separator/Separator";

//import t from '../../../../backend/images/static/'

export default function UpdateProfile() {

  const toast = useToast()

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  //Nole
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

  const [password,setPassword] = useState({
    newpass: "",
    confirmpass: ""
  })
  

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

    // setPassword({
    //   ...password,
    //   newpass: "********",
    //   confirmpass: "********"
    // })


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
      const request = await placeHolderAPI .post('/users/update-profile', updatevalues);
      const response = await request.data;

      if (response.message.includes("Update Success")) {

        showToast('Profile',
        "Profile successfully updated",
        'success'
        )
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
        
        
        //buttonStatus.disabled = false;

        useEffectLogs.insertLogs(useEffectLogs);
      }
    }
   window.location.reload()
  };


  const LoadAllUserGroups = async () => {
    var userID = ""
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await placeHolderAPI
        .get("/usergroup/viewuser-group")
       
        .then((res) => {
        
          setUserGroups(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllUserGroups",
            "LoadAllUserGroups",
            userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const LoadAllPositions = async () => {
    var userID = ""
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await placeHolderAPI 
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
 // console.log(e.target.files[0])

  const imagevalues = {
    userid: values.user_id,
    image: e.target.files[0]
  }

  const image = new FormData()
  image.append("file",e.target.files[0])

    try {
     
        const requestImg = await placeHolderAPI .post("/users/upload-image/" + values.user_id, image, {

          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })

        handleLogout()

    } catch (err) {
      alert(err)
    }


}

const handleUpdatePassword = async () => {
  var userID = ""

  try {

    const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);
      userID = tokenDecoded.result[0].userDisplayID;

        const isValid = (password.newpass === password.confirmpass ? true : false)
       
        if(isValid) {
          const pass_values = {
            password: hash_password(password.newpass),
            userid: userID
          }

        const request = await placeHolderAPI .post('/users/update-password', pass_values);
        const response = await request.data;
         
        if (response.message.includes("Update Success")) {

          showToast('Profile',
          "Profile successfully updated",
          'success'
          )
          handleLogout()
        } else {
          showToast("Error in Updating Password",
          response.message,
        'error')

          const useEffectLogs = new Logs(
            errorStatus,
            "Login",
            "Function /UpdatePassword",
          response.message,
          userID
          );

            useEffectLogs.insertLogs(useEffectLogs);


        }
      } else {
        showToast('Profile',
        'Password do noit match',
        'warning')
      }

  } catch (err) {
   
      const errorStatus = err.code;


      if (errorStatus.includes("ERR_NETWORK")) {
        showToast("Error in Updating Password",
         errorStatus,
        'error')
      }

      if (errorStatus.includes("ERR_BAD_REQUEST")) {
        const useEffectLogs = new Logs(
          errorStatus,
          "Login",
          "Function /UpdatePassword",
          err.response.data.message,
          userID
        );
        
        showToast("Error in Updating Password",
                'Please wait while we are logging error',
                'error')

        useEffectLogs.insertLogs(useEffectLogs);

      } else {
        const useEffectLogs = new Logs(
          errorStatus,
          "Login",
          "Function /UpdatePassword",
          err,
          userID
        );

        showToast("Error in Updating Password",
                'Please wait while we are logging error',
                'error')

        useEffectLogs.insertLogs(useEffectLogs);
      }
  }
}

  return (
    <>
      {/* TABLET AND DESKTOP RESPONSIVE */}

  
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}> 
      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1.2fr" }} templateRows='1fr' > 

        <Card bg={graphCardBg}>

        <Card bg={'white'}>
          <Tabs  variant="unstyled">
            <TabList>
              <Tab >Profile</Tab>
              <Tab > Security</Tab>
            </TabList>
            <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="none"
          />
           <TabPanels>
              <TabPanel>
                <Card  my={{ sm: "15px", xl: "0px" }}>
                  <Flex direction='column' >
                    <Flex align='center' mb='18px'>
                      <Text
                       align={'end'}
                       w={'100px'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Group:{" "}
                      </Text>        
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
                    </Flex>
                    <Flex align='center' mb='18px'>
                      <Text
                       align={'end'}
                       w={'100px'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Position:{" "}
                      </Text>        
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
                    </Flex>
                    <Flex align='center' mb='18px'>
                      <Text
                       align={'end'}
                       w={'100px'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Firstname:{" "}
                      </Text>        
                      <Input
                        onChange={ e => {
                          setProfile( { ...values, user_firstname: e.target.value } )}}
                        
                        placeholder="Firstname..."
                        defaultValue= { values.user_firstname}
                      />
                    </Flex>
                    <Flex align='center' mb='18px'>
                      <Text
                       align={'end'}
                       w={'100px'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Lastname:{" "}
                      </Text>        
                      <Input
                        onChange={ e => {
                          setProfile( { ...values, user_lastname: e.target.value } )}}
                        placeholder="Lastname..."
                        defaultValue={values.user_lastname}
                      />
                    </Flex>
                    <Flex align='center' mb='18px'>
                      <Text
                       align={'end'}
                       w={'100px'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Email:{" "}
                      </Text>        
                      <Input
                        onChange={ e => {
                          setProfile( { ...values, user_email: e.target.value } )}}
                        defaultValue={values.user_email}
                        placeholder="Email..."
                      />
                    </Flex>
                    <Flex direction='column' align='center' w='100%' py='14px'>
                    <Button  colorScheme="green" onClick={updateHandler}>
                      Update Profile
                    </Button>    

                    </Flex>
                    
                  </Flex>
                </Card>
              </TabPanel>
              <TabPanel>
                <Card  my={{ sm: "24px", xl: "0px" }}>
                  <Flex direction='column' >
                    <Flex align='center' mb='18px'>
                        <Text
                          align={'end'}
                          w={'200px'}
                          fontSize='md'
                          color={textColor}
                          fontWeight='bold'
                          me='10px'>
                          New Password:{" "}
                        </Text>        
                        <Input
                          type="password"
                          onChange={ e => {
                            setPassword( { ...password, newpass: e.target.value } )}}
                            
                          placeholder="New Password..."
                         //defaultValue={password.newpass || "************"}
                        />
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text
                         align={'end'}
                         w={'200px'}
                          fontSize='md'
                          color={textColor}
                          fontWeight='bold'
                          me='10px'>
                          Confirm Password:{" "}
                        </Text>        
                        <Input
                            type="password"
                            onChange={ e => {
                              setPassword( { ...password, confirmpass: e.target.value } )}}
                              
                            placeholder="Confirm Password..."
                           //defaultValue={password.confirmpass || "************"}
                        />
                    </Flex>
                  </Flex>
                  <Flex direction='column' align='center' w='100%' >
                    <Button  colorScheme="green" onClick={handleUpdatePassword} >
                      Update Password
                    </Button>    

                    </Flex>
                </Card>

              </TabPanel>
           </TabPanels>
          </Tabs>
        </Card>

        </Card>

        <Card   p='22px'
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}
          bg= {graphCardBg}
          height={'420px'}>
            <Card bg={'white'}>
            <Flex direction='column' align='center' >
            <Box
              borderRadius="100%"
              bg="blackAlpha.100"
              w={250}
              h={250}
              overflow="hidden"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                src={
                  values?.imgFilename
                  ? 

                    `http://localhost:5001/image/static/${values?.imgFilename}`
        
                  :  imgDefault
                }
                w={250}
                h={250}
              />
            </Box>
            <br></br>
              <Input
                display="none"
                name="file"
                //id="file"
                type="file"
                mt={4}
                
                onChange={(e) => handleUploadImage(e)}
                id="file-input"
              />
              <FormLabel htmlFor="file-input">
                <Button
                  as="span"
                  size="sm"
                  colorScheme="green"
                  py={5}
                  rounded="4px"
                >
                  Upload Image
                </Button>
              </FormLabel>
            </Flex>
            </Card>
        </Card>
      </Grid>
    </Flex>

   
    </>
  );
}
