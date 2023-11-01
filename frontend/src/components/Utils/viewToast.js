
import {

    useToast
  
  } from "@chakra-ui/react";

function viewToastify(title,desc,status) {

    const toast = useToast()

    return (
        toast({
          title: title,
          description: desc,
          status: status,
          duration: 2000,
          isClosable: true,
          position: "bottom"
        })
    
    )
    
}

export default viewToastify;

