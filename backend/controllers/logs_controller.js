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

// An Instance to get all the logs
const getAllLogs = ( request, resposnse ) => {

    const stmt = "SELECT log.logID as id,log.logtype,log.module,log.logfunction,log.logvalues,"
    + "users.displayName,COALESCE(DATE_FORMAT(log.dateCreated, '%m/%d/%Y'),'') as dateatecreated  FROM tblLogs log"
    + " INNER JOIN tblUsers users on users.userDisplayID = log.createdBy"
    + " where logtype <> 'Info'"
    + " ORDER BY log.dateCreated desc"
    

    mysql.query(stmt, [], ( err, result ) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Record Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Record Found",
                result
            }
        )

    })

}

// An Instance to get the log by Id
const getLog = ( request, response ) => {

    const { rowId } = request.params

    const stmt = "SELECT * FROM tblLogs"
    + " where logID = ?"

    mysql.query( stmt, [ req.body.rowId ], ( err,result ) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Record Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Record Found",
                result
            }
        )

    })

}

// An Instance to get the log's user info
const getUserLogsInfo = ( request, response ) => {

    const { departmentID } = request.body

    const sql = "SELECT log.logID as id,log.logtype,log.module,log.logfunction,log.logvalues,"
    + "COALESCE(DATE_FORMAT(log.dateCreated, '%m/%d/%Y'),'') as dateatecreated,"
    + "concat('Hi ',users.firstname) as fname,users.imgFilename,"
    + "(select userCreated.imgFilename from tblUsers userCreated  where userCreated.userDisplayID = log.createdBy limit 1 )"
    + " as usercreatedImg  FROM tblLogs log"
    + " INNER JOIN tblUsers users on users.userDisplayID = log.userID"
    + " left join tblUsers userCreated on users.userDisplayID = log.createdBy"
    + " inner join tblPositions pos on pos.positionDisplayID = users.positionID"
    + " inner join tblDepartments dept on dept.departmentDisplayID = log.departmentID"
    + " where (logtype = 'Info') and (log.active=1) and dept.departmentDisplayID = ?"
    + " ORDER BY log.dateCreated desc"

    mysql.query( sql, [ departmentID ], ( err, result ) => {

    if( err || !result.length ) return response.status(400).send(
        {
            message: "No Record Found",
            message2: err.message
        }
    )

    response.status(200).send(
        {
            message: "Record Found",
            result
        }
    )

    })

}

module.exports = {
    putLog
}