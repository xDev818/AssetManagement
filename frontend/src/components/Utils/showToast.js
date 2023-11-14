import {

    useToast
  
  } from "@chakra-ui/react";


   
   
 function showToast (title,desc,stat)  {
      
      
  const  toast = useToast();
      return (
        
        
          
          toast({
            title: title,
            description: desc,
            status: stat,
            duration: 2000,
            isClosable: true,
            position: "top"
          })
        
      );
  
  }



  export default showToast;

