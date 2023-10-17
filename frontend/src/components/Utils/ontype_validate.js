// Jinshin
import axios from 'axios'
import Logs from './logs_helper'

class OnType_Validate {

   static network = "ERR_NETWORK"
   static bad_request = "ERR_BAD_REQUEST"

   static async username ( input, values ) {

      try {

         if ( values.length === 0 ) {

            console.log("Username is required")
            input.style.border = "1px solid red"
   
         } else if (values.length < 5) {

            console.log("Username must be atleast over 6 characters length")
            input.style.border = "1px solid red"

         } else {

            const request = await axios.post("/users/username/verify", { values })
   
            const response = await request.data
   
            if ( response.message.includes("Username is available") ) {

               console.log(response.message)
               input.style.border = "1px solid green"

            }

         }

      } catch ( err ) {

         const errorStatus = err.code

         if ( errorStatus.includes(this.network) ) {

            const verifyUserLogs = new Logs(
               "DB",
               "Signin",
               "onChange, Ontype_Valid, /users/username/verify",
               err,
               ""
            )
            alert( verifyUserLogs.getMessage() )

         }

         if ( errorStatus.includes( this.bad_request ) ) {
            
            if ( err.response.data.message.includes("Username is already taken") ) {

               console.log(err.response.data.message)
               input.style.border = "1px solid orange"

               const verifyUserLogs = new Logs(
                  "Error",
                  "Signin",
                  "onChange, Ontype_Valid, /users/username/verify",
                  err.response.data.message,
                  ""
               )

               alert( verifyUserLogs.getMessage() )

            }

         }

      }

   }

   static password ( input, values ) {

   

   }


}

export default OnType_Validate
// End Jinshin