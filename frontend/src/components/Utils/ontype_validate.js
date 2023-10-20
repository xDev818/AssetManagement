// Jinshin
import axios from 'axios'
import Logs from './logs_helper'

class OnType_Validate {

   static network = "ERR_NETWORK"
   static bad_request = "ERR_BAD_REQUEST"
   static emails = ["@gmail.com", "@yahoo.com"]

   static async username ( input, module, values ) {

      if ( module.includes("signup") ) {

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

      } else {

         if ( values.length === 0 ) {
   
               console.log("Username is required")
               input.style.border = "1px solid red"
      
         } else {
            
            input.style.border = "1px solid green"

         }
         
      }

   }

   static async email ( input, values ) {

      try {

         if ( values.length === 0 ) {

            console.log("Email is required")
            input.style.border = "1px solid red"
   
         } else if ( values.length < 11 ) {

            console.log("Email is invalid")
            input.style.border = "1px solid red"

         } else {

            const request = await axios.post("/users/email/verify", { values })
   
            const response = await request.data
   
            if ( response.message.includes("Email is available") ) {

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
               "onChange, Ontype_Valid, /users/email/verify",
               err,
               ""
            )
            alert( verifyUserLogs.getMessage() )

         }

         if ( errorStatus.includes( this.bad_request ) ) {
            
            if ( err.response.data.message.includes("Email is already taken") ) {

               console.log(err.response.data.message)
               input.style.border = "1px solid orange"

               const verifyUserLogs = new Logs(
                  "Error",
                  "Signin",
                  "onChange, Ontype_Valid, /users/email/verify",
                  err.response.data.message,
                  ""
               )

               alert( verifyUserLogs.getMessage() )

            }

         }

      }

   }

   static password ( input, module, values ) {

      if ( module.includes("signup") ) {

         if( !values.length ) {

            console.log("Password is required")
            input.style.border = "1px solid red"

         } else if ( values.length < 5 ) {

            console.log("Password must be atleast 8 characters length")
            input.style.border = "1px solid red"

         } else {

            input.style.border = "1px solid green"

         }

      } else {

         if ( !values.length ) {

            console.log("Password is required")
            input.style.border = "1px solid red"

         } else {

            input.style.border = "1px solid black"

         }

      }

   }

   static confirm_password ( other_password_input, input, module, values ) {

      if ( module.includes("signup") ) {

         if ( !values.length ) {

            console.log("Confirm password is required")
            input.style.border = "1px solid red"

         } else if ( values !== other_password_input.target.value ) {

            console.log("Password is not match ")
            input.style.border = "1px solid red"

         } else {

            input.style.border = "1px solid green"

         }

      }

   }

}

export default OnType_Validate
// End Jinshin