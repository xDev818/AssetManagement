
/* 

    Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      created Checkout Asset

    Date : 10 / 25 / 23
    Author : Nole
    Activities
    Purpose : 
      // Generate UUID for DocReference


    Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
      Add Dialog Box for Checkout

*/

import { useLocation,Link } from 'react-router-dom'
import Logs from 'components/Utils/logs_helper'

import  { useEffect, useMemo, useState } from 'react'
import React from "react";

import axios from 'axios'
import decoder from 'jwt-decode'
import Datehelper from 'components/Utils/datehelper'
import { v4 as uuidv4 } from 'uuid';

import AssetDialog from 'components2/Configuration/AssetDialog/AssetDialog';


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
    Grid,
    GridItem,
    Text,

    Textarea,
    Button,
    ButtonGroup,
    
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
     useDisclosure,

     useToast

  } from "@chakra-ui/react";


  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
  import DatePicker from "react-datepicker";

  export default function ITCheckOut () {

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    var userID = ''
    var department_id = ''
    var position_id = ''
    var status_id = ''
    
    // const [checkout , setCheckout] = useState({
    //   userid:'',
    //   assetid:'',
    //   statusid:'',
    //   positionid:'',
    //   departmentid:'',
    //   notes:'',
    //   plancheckout: '',
    //   userid_checkout:'',
    // })
   
    const [users , setUsers] = useState([])
    const [assets,setAssets] = useState([])
    const [plan_date,setPlanDate] = useState( new Date()) 
    const [userSelected,setUserSelected] = useState('')
    const [notes,setNotes] = useState('')
    const [statID,setStatusID] = useState('')

     const [receiver_posid,setRecevierPosID] = useState('')
     const [receiver_deptid,setRecevierDepID] = useState('')


    const [btnstate,setbtnState] = useState()

    //var array = [];
    

    

    
    var checkoutData = {
      dataArray: [] // Replace [...arrayValues] with your initial array values
    }


    const [userdata,setUser] = useState({
      userid : '',
      deptid:'',
      positionid:''
    });


    const LoadallUsers = async () => {
      try {

        const res = await axios.get("/users");
        const data = await res.data;

        
        setUsers(res.data.result)
      
  
      } catch (err) {
        alert(err)
      }
    };

    const LoadAllAssets = async () => {
      try {

        const res = await axios.get("/assetcheckout/viewavailable-assets");
        const data = await res.data;

        
        setAssets(res.data.result)
      
  
      } catch (err) {
        alert(err)
      }
    };

    const getAssetStatus_ForDeploy = async () => {
      try {

        const res = await axios.get("/assetcheckout/get-assetstatus-byname");
        const data = await res.data;

        //console.log(res.data.result)
        setStatusID(res.data.result[0].assetStatusID)
      
  
      } catch (err) {
        alert(err)
      }
    };


  

    useEffect(() => {
      
      setbtnState('Checkout Asset')
      try {
       
        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);

        setUser({...userdata,
    
          userid : tokenDecoded.result[0].userDisplayID,
          deptid: tokenDecoded.result[0].departmentDisplayID,
          positionid : tokenDecoded.result[0].positionID
      })

        // userID = tokenDecoded.result[0].userDisplayID;



         LoadallUsers()
         LoadAllAssets()
         getAssetStatus_ForDeploy()

        // if(positionID) {
        
        //     axios.get('/positions/getPositionID/' + positionID)
        //     .then((res) => {
        //       setbtnState("Update")
        //         setPosition({
        //           ...values,
        //           positionid: res.data.result[0].positionDisplayID,
        //           positionname: res.data.result[0].positionName,
        //           description: res.data.result[0].description,
        //           departmentid: res.data.result[0].departmentDisplayID,
        //           departmentname: res.data.result[0].departmentName
        //         })
               
        //     })
        //     .catch((err) => {
        //       alert(err);
        //     });
          
        // } else {
        //   setbtnState("Save")
           
        //   setPosition({
        //     ...values,
        //     positionid: '',
        //     positionname: '',
        //     description: '',
        //     departmentid: '',
        //     departmentname: ''
        //   })
        // }

      }
      catch(err) {
        alert(err)
      }
    }, [])


    const handleSelectedAsset = (event,key) => { 

      const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if(isChecked) {
          checkoutData.dataArray.push(key)

        } else {

          const newArray = [...checkoutData.dataArray];
          const index = newArray.indexOf(key);
          if (index > -1) {
            newArray.splice(index, 1);
            // { dataArray: newArray });
            checkoutData.dataArray = newArray
          }

        }

      

    }

    function viewToastify(title,desc,status) {
      // const toast = useToast()
       return (
         
             toast({
               title: title,
               description: desc,
               status: status,
               duration: 2000,
               isClosable: true,
               position: "top"
             })
         
        
       )
     }
  

    const handleCheck = async (event) => {
      
     
      try {
        event.preventDefault()

        // Generate UUID for DocReference
        const datehelper = new Datehelper()
        const docid = uuidv4();
        var docRef_Checkin =  docid.slice(0,5).toUpperCase()
        docRef_Checkin = docRef_Checkin + datehelper.dateformat_MMDDHR()
        
        if(checkoutData.dataArray.length > 0)
         {
          
          var id = userSelected
          const res = await axios.get("/assetcheckout/get-userdeptpos_byID/" + id);
          const data = await res.data;

          var receiver_posid = res.data.result[0].positionDisplayID
          var receiver_deptid = res.data.result[0].departmentDisplayID


            for (let i = 0; i < checkoutData.dataArray.length; i++) {
              // Access each element of the array
              const value = checkoutData.dataArray[i];

            const checkoutvalues = {
              userid:userSelected ,
              assetid: value,
              statusid: statID,
              positionid: receiver_posid,
              departmentid: receiver_deptid,
              notes: notes,
              plancheckout: plan_date,
              userid_checkout: userdata.userid,
              docref: docRef_Checkin
            }


          
              var success = await axios.post('/assetcheckout/create-checkoutasset',checkoutvalues)
              .then((res) => {
                
              //  alert("Insert Successful")


                const InsertLogs = new Logs(
                  'Info',
                  "Asset Status",
                  "Function /handleUpdate",
                  ' Create   Position name :  ' + checkoutvalues.assetid,
                  userdata.userid
                )
      
                var request =  axios.post('/log',InsertLogs.getLogs())
                var response =  request.data

                /* 
                  Update the Assets to mark as deploy
                */
                  success = axios.post('/assetcheckout/update-checkoutasset_ForDeploy',checkoutvalues)
                  .then((res) => {
                
                  // alert("update Successful")
        
                    const InsertLogs = new Logs(
                      'Info',
                      "Asset Status",
                      "Function /handleUpdate",
                      ' Create   Position name :  ' + checkoutvalues.assetid,
                      userdata.userid
                    )
          
                    request = axios.post('/log',InsertLogs.getLogs())
                    response =  request.data

                  //  window.location.href = "/#/admin/checkout-viewer";

                  viewToastify(
                    "Checkout",
                    "Asset assigned successfully",
                    "success"
                  )
                  LoadAllAssets()

                  })
                  .catch((err) => {
                    alert(err);
                  });
                  

              })
              .catch((err) => {
                alert(err);
              });

          }
          checkoutData.dataArray = []
        }
        else {
          viewToastify(
            "Checkout",
            "Select Asset to Checkou",
            "warning"
          )

          }

       
      }
      catch (err) {
        alert(err)
      }
    }
    
    return (
      <>
        <Card
        w={{ base: "auto", md: "auto", lg: "auto" }}
        mx={{ base: 0, md: 0, lg: 3 }}
        >
        <Text fontWeight="bold" mb={5}>
          Checkout Asset
        </Text>

          <Stack>
          <FormControl>
          <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={3}
            >

          <GridItem>
              <Box>
              <FormLabel fontSize={{ base: "sm" }}>User </FormLabel>
                <Select placeholder='Select option' size='md'
                 onChange={ e => {
                  setUserSelected(e.target.value )}}
                  //value={values.departmentid}
                >
                  {users.map((user) => (
                    <option value={user.id} size='md'> 
                      {user.fullname}
                    </option>
                    ))
                    
                  }

                </Select>

              </Box>
              <Box>
                <FormLabel fontSize={{ base: "sm" }}>Description </FormLabel>
              <Textarea
              mb={4}
              id="notes"
              label="Notes"
              placeholder="Notes"
              // value={values.description}
               onChange={(e) => {
                 setNotes(e.target.value );
               }}
            />
          </Box>
          <Box>
          <FormLabel fontSize={{ base: "sm" }}> Date Checkout</FormLabel>
          <DatePicker
                  selected={plan_date}
                  showIcon
                  onChange={(plan_date) => setPlanDate(plan_date)}
                  value={plan_date}
          />
          </Box>
          </GridItem>
          <GridItem>
              {/* Something to put here */}
          </GridItem>

            </Grid>

          <Card>

          <Box>

          <TableContainer>
          <Table size="lg" id='assettable'>
              <Thead>
                <Tr>
                  <Th> </Th>
                  {/* <Th>Actions</Th> */}
                  <Th>Status</Th>
                  <Th>Type</Th>
                  <Th>Serial No</Th>
                  <Th>Asset Code</Th>
                  <Th>Asset Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                    <Tr key={asset.id} >

                      <Td>
                        <input type="checkbox" value={asset.id}
                        
                        onClick={(e) => handleSelectedAsset(e,asset.id)}
                        >
                        </input>
                      </Td>
                      {/* <Td>

                        <ButtonGroup>
                          <Button
                            colorScheme="red"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                asset.id,
                                asset.assetName
                              )
                            }
                          >
                            Delete
                          </Button>
                          <Button colorScheme="blue">
                            <Link
                              to={{
                                pathname: "/admin/assetcategory/" + asset.id ,
                                state: { categoryID: asset.id },
                              }}
                            >
                              Edit
                            </Link>
                          </Button>
                        </ButtonGroup>
                      </Td> */}

                      <Td>{asset.statusName}</Td>
                      <Td>{asset.typeName}</Td>
                      <Td>{asset.serialNo}</Td>
                      <Td>{asset.assetCode}</Td>
                      <Td>{asset.assetName}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            
          </TableContainer>


          

            <Button colorScheme="green" 
            onClick={(e) => handleCheck(e)}  >
              {/*
              onClick={onOpen}
              <Link

                  to={{
                  pathname: "/admin/assetstatusviewer"
                  }}>
              </Link> */}
              {btnstate}

             
            </Button>
            {/* <AssetDialog
                 handlleCheck={handleCheck}
                 alertheader = {"Checkout Asset"}
                 alertbody = { " Are you sure you want to Checkout Selected Assets?"}
                // onOpen={onOpen}
                 isOpen={isOpen}
                 onClose={onClose}
             //    cancelRef = {cancelRef}
                // leastDestructiveRef={cancelRef}
              /> */}


          </Box>
          </Card>
          </FormControl>
        </Stack>

        </Card>

        {/* <AlertDialog
            onOpen={onOpen}
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
      
              <AlertDialogContent>
                <AlertDialogHeader></AlertDialogHeader>
                 Check-out
              
                <AlertDialogCloseButton />
                <AlertDialogBody>
                Are you sure you want to assign assets?
                
                 
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button  ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button colorScheme='green' ml={3} onClick = {(e) => handleCheck(e) }>
              
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog> */}

      </>

      
    );
  }
  