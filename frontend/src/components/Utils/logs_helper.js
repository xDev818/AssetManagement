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
         logtype: `Error: ${ this.logtype === "DB" ? this.#db : this.logtype }`,
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

}

export default Logs