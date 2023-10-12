// Packages
const mysql = require('../database')
const { randomUUID } = require('crypto')


// Date helper
const { utils_getDate } = require('../utils/date_helper')


// Generate Random ID
const id = randomUUID() 


// An instance to put a log
const putLog = ( request, response ) => {

    const { logtype, module, logfunction, logvalues, userID } = request.body

    const stmt = "INSERT INTO tblLogs(logID,logtype,module,"
    + "logfunction,logvalues,createdBy,dateCreated) values (?)";

    const values = [
        id,
        req.body.logtype,
        req.body.module,
        req.body.logfunction,
        req.body.logvalues,
        req.body.userID,
        utils_getDate()
    ];
      
    connection.query( stmt, [values], ( err, result ) => {
        if(err) {
            
            res.json({
                message: "Insert Error",
                message2: err.message});
        }else {

            res.json({
                message: "Insert Success"});
        }

     })

}

module.exports = {
    putLog
}