


import {
    // FormLabel,
    //   Table,
    //   Thead,
    //   Tbody,
    //   Tr,
    //   Th,
    //   Td,
    //   TableContainer,
    //   Stack,
    //   Box,
    //   Input,
    //   FormControl,
    //   Select,
    //   Grid,
    //   GridItem,
    //   Text,
    //   Textarea,
    //   Button,
    //   ButtonGroup,
      AlertDialog,
      AlertDialogBody,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogContent,
      AlertDialogOverlay,
      AlertDialogCloseButton,
      useDisclosure,
      Button
    } from "@chakra-ui/react";
    import Card from "components/Card/Card";
    import  { useEffect, useState } from 'react'
import React from "react";



   export default function AssetDialog({
    isOpen,
   // onOpen,
    onClose,
   // cancelRef,
    alertheader,
    alertbody,
    handleCheck
   }) {

        const { onOpen} = useDisclosure()
        const cancelRef = React.useRef()
      
        return (
          <>
          
            {/* <Button onClick={onOpen}>Discard</Button> */}
            <AlertDialog
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
                 {alertheader} 
              
                <AlertDialogCloseButton />
                <AlertDialogBody>
                {alertbody}
                
                 
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button colorScheme='red' ml={3}onClick={handleCheck }>
                  {/* onClick={handlleCheck} */}
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
          </>
        )
      }