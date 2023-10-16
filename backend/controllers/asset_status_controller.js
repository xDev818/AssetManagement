/* 
    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      create asset_status_controller.js for Asset Status

*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')


// An instance to Create new Asset Status
const createAssetStatus = ( request, response ) => {

    const id = randomUUID() 
    const { statusname, description, userID  } = request.body

   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    const stmt = "INSERT INTO tblAssetStatus(assetStatusID,statusName,statusDescription,"
            + "createdBy,dateCreated) values (?)";
    
    const values = [
        id,
        statusname,
        description,
        userID,
        utils_getDate()
    ];
    
    mysql.query( stmt, [values], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Insert Error",
                message2: err.message
            }
        )
        
        response.status(200).send(
            {
                message: "Insert Success"
            }
        )

    })

}

// An instance to Load all Asset Status
const ViewAllAssetStatus = ( request, response ) => {

    const stmt = "SELECT * FROM tblAssetStatus"
                + " order by statusName asc"
    
             

    mysql.query( stmt, ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "No Records Found",
                message2: err.message
            }
        )
       
       
        response.status(200).json(
            {
                message: "Records Found",
                data : result
           }
        )

       // console.log(result)

    })
}
    


module.exports = {
    createAssetStatus,
    ViewAllAssetStatus

}