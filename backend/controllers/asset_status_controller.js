/* 
    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      create asset_status_controller.js for Asset Status

    Date : 10 / 17 / 23
    Author : Nole
    Activities
    Purpose : 
      create function ViewAllAssetStatus
      create function getAssetStatusbyID

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create function deleteAssetStatus
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

    const stmt = "SELECT assetStatusID, statusName,statusDescription FROM tblAssetStatus"
                + " order by statusName asc"
    
             

    mysql.query( stmt, ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "No Records Found",
                message2: err.message
            }
        )
       
       
         response.status(200).send(
             {
                 message: "Records Found",
                 result
             }
         )

        //response.json({result,message: "Record Found"});

    })
}

// An instance to Load all Asset Status
const getAssetStatusbyID = ( request, response ) => {

    const { id } = request.params

    


    const stmt = "SELECT assetStatusID,statusName,statusDescription FROM tblAssetStatus"
                + " where assetStatusID = ?"
    

    mysql.query( stmt,[id], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "No Records Found",
                message2: err.message
            }
        )
       
         response.status(200).send(
             {
                 message: "Records Found",
                 result
             }
         )
       
    })
}

// An instance to Update Asset Status by ID
const updateAssetStatus = ( request, response ) => {

    const { statusid, statusname, description, userID  } = request.body

   
    const stmt = "UPDATE tblAssetStatus SET statusName = ?,"
    + "statusDescription = ?,updateBy = ?,dateUpdate = ?"
    + " where assetStatusID = ?"
    
    // const values = [
    //     statusname,
    //     description,
    //     userID,
    //     utils_getDate(),
    //     statusid
    // ];

   // console.log(values)
    mysql.query( stmt, [statusname,description,userID,utils_getDate(),statusid], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Update Error",
                message2: err.message
            }
        )
        
        response.status(200).send(
            {
                message: "Update Success"
            }
        )
        
     

    })

}

// An instance to Update Asset Status by ID
const deleteAssetStatus = ( request, response ) => {

    const { statusid} = request.body

    const stmt = "DELETE FROM tblAssetStatus WHERE assetStatusID=?"
    
    // const values = [
    //     statusname,
    //     description,
    //     userID,
    //     utils_getDate(),
    //     statusid
    // ];

   // console.log(values)
    mysql.query( stmt, [statusid], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Delete Error",
                message2: err.message
            }
        )
        
        response.status(200).send(
            {
                message: "Delete Success"
            }
        )
        
     

    })

}
    

module.exports = {
    createAssetStatus,
    ViewAllAssetStatus,
    getAssetStatusbyID,
    updateAssetStatus,
    deleteAssetStatus

}