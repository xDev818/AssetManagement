import React from "react";
import {

    useToast
  
  } from "@chakra-ui/react";

  class ShowError {

     toast = new useToast()
   
    viewTotast(title,desc,status) {
      
      
     
          toast({
            title: title,
            description: desc,
            status: status,
            duration: 2000,
            isClosable: true,
            position: "bottom"
          })
      
    
      
  }

  }



export default ShowError;

