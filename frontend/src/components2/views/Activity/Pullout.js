
/* 


    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
      Pullout

*/

import { useLocation,Link } from 'react-router-dom'
import Logs from 'components/Utils/logs_helper'

import  { useEffect, useMemo, useState } from 'react'
import React from "react";

import axios from 'axios'
import decoder from 'jwt-decode'
import Datehelper from 'components/Utils/datehelper'
import { v4 as uuidv4 } from 'uuid';

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

  export default function Pullout () {

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    // var userID = ''
    // var department_id = ''
    // var position_id = ''
    
    const [assets,setAssets] = useState([])
    const [status,setStatus] = useState([])

    const [pullout_date,setPulloutDate] = useState( new Date()) 
    const [statusSelected,setStatusSelected] = useState('')
    const [notes,setNotes] = useState('')
    const [statID,setStatusID] = useState('')

    //  const [receiver_posid,setRecevierPosID] = useState('')
    //  const [receiver_deptid,setRecevierDepID] = useState('')


    //var array = [];
    

    
    var pulloutData = {
      dataArray: [] // Replace [...arrayValues] with your initial array values
    }


    const [userdata,setUser] = useState({
      userid : '',
      deptid:'',
      positionid:''
    });


    const LoadAllAssets = async (id) => {
      try {

        const res = await axios.get("/user-asset/viewallByID/" + id)
        const data = await res.data;

        setAssets(res.data.result)
      
  
      } catch (err) {
        alert(err)
      }
    };

    const LoadAStatus = async (id) => {
      try {

        const res = await axios.get("/user-asset/viewstatus")
        const data = await res.data;

        setStatus(res.data.result)
      
  
      } catch (err) {
        alert(err)
      }
    };

 

    useEffect(() => {
      
      try {
       
        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);

        setUser({...userdata,
    
          userid : tokenDecoded.result[0].userDisplayID,
          deptid: tokenDecoded.result[0].departmentDisplayID,
          positionid : tokenDecoded.result[0].positionID
      })
        LoadAStatus()
        LoadAllAssets(tokenDecoded.result[0].userDisplayID)

      }
      catch(err) {
        alert(err)
      }
    }, [])


    const handleSelectedAsset = (event,detailID) => { 

      const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if(isChecked) {
          pulloutData.dataArray.push(detailID)

        } else {

          const newArray = [...pulloutData.dataArray];
          const index = newArray.indexOf(detailID);
          if (index > -1) {
            newArray.splice(index, 1);
            // { dataArray: newArray });
            pulloutData.dataArray = newArray
          }

        }

       // alert(pulloutoutData.dataArray)
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
  
    const handlePullout = async (event) => {
      
      try {
        event.preventDefault()

        // Generate UUID for DocReference
        const datehelper = new Datehelper()
        const docid = uuidv4();
        var docRef_Pullout =  docid.slice(0,5).toUpperCase()
        docRef_Pullout = docRef_Pullout + datehelper.dateformat_MMDDHR()
        
        if(pulloutData.dataArray.length > 0)
         {

            for (let i = 0; i < pulloutData.dataArray.length; i++) {
              // Access each element of the array
              const value = pulloutData.dataArray[i];

              const pulloutvalues = {
                userid:userdata.userid ,
                detailid: value,
                statusid: statusSelected,
                notes: notes,
                planpullout: pullout_date,
                docref: docRef_Pullout
              }
                /* 
                  Update the Assets to as Pullout
                */
              const pulloutsuccess = await axios.post('/user-asset/pullout-asset',pulloutvalues)
              .then((res) => {
                
                const InsertLogs = new Logs(
                  'Info',
                  "Asset Status",
                  "Function /handleUpdate",
                  ' Create   Position name :  ' + pulloutvalues.detailid,
                  userdata.userid
                )
      
                var request =  axios.post('/log',InsertLogs.getLogs())
                var response =  request.data

                /* 
                  Update the Assets Mark Status based on StatusID
                */
                  success = axios.post('/user-asset/update-asset',{})
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
                    "Pullout",
                    "Asset pullout successfully",
                    "success"
                  )

                  LoadAllAssets(userdata.userid)

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
            "Pullout",
            "Select Asset to Pullout",
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
          Pullout Asset
        </Text>

          <Stack>
          <FormControl>
          <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={3}
            >

          <GridItem>
          <Box>
              <FormLabel fontSize={{ base: "sm" }}>Status </FormLabel>
                <Select placeholder='Select option' size='md'
                 onChange={ e => {
                  setStatusSelected(e.target.value )}}
                  //value={values.departmentid}
                >
                  {status.map((stat) => (
                    <option value={stat.assetStatusID} size='md'> 
                      {stat.statusName}
                    </option>
                    ))
                    
                  }

                </Select>

              </Box>
              <Box>
                <FormLabel fontSize={{ base: "sm" }}>Notes </FormLabel>
              <Textarea
              mb={4}
              id="notes"
              label="Notes"
              placeholder="Notes"
             
               onChange={(e) => {
                 setNotes(e.target.value );
               }}
            />
          </Box>
          <Box>
          <FormLabel fontSize={{ base: "sm" }}> Date Pullout </FormLabel>
          <DatePicker
                  selected={pullout_date}
                  showIcon
                  onChange={(pullout_date) => setPulloutDate(pullout_date)}
                  value={pullout_date}
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
                  <Th></Th>
                  {/* <Th>Actions</Th> */}
                  <Th>Ref No</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Serial No</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                    <Tr key={asset.detailID} >

                      <Td>
                        <input type="checkbox" value={asset.detailID}
                        
                        onClick={(e) => handleSelectedAsset(e,asset.detailID)}
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

                    <Td>{asset.docRef_Checkin}</Td> 
                    <Td>{asset.typeName}</Td>
                    <Td>{asset.statusName}</Td>
                    <Td>{asset.serialNo}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>

                    </Tr>
                  ))}
              </Tbody>
            </Table>
            
          </TableContainer>


          

            <Button colorScheme="green" 
            onClick={(e) => handlePullout(e)}  >
              {/*
              onClick={onOpen}
              <Link

                  to={{
                  pathname: "/admin/assetstatusviewer"
                  }}>
              </Link> */}
              Pullout

             
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
  