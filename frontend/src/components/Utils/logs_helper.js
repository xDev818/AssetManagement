import axios from 'axios'
import { placeHolderAPI } from 'index'
class Logs {

   #errorDbConnection = "Server is not running"
   #db = "Database"

   constructor ( logtype, module, logfunction, logvalues, userID ) {
      
         this.logtype = logtype
         this.module = module
         this.logfunction = logfunction
         this.logvalues = logvalues
         this.userID = userID
      
   }

   getLogs () {

      const logValues = {
         logtype: this.logtype,
         module: this.module,
         logfunction: this.logfunction,
         logvalues: this.logvalues,
         userID: this.userID,
      }

      return logValues

   }

   getMessage () {

      return this.logtype === "DB" ? this.#errorDbConnection : this.logvalues

   }

   async insertLogs ( logs ) {

      try {

         const request = await placeHolderAPI
         .post("/log", logs);
         const response = await request.data;

         return 'Success'

       } catch (err) {

        return err;
     

      }

   }

}

export default Logs