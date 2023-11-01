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


    Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/AssetStatus) controller
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')


const {
    create,
    getIDByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
  }  = require('../_sqlstatement/AssetStatus')


// An instance to Create new Asset Status
const createAssetStatus = ( request, response ) => {

    const id = randomUUID() 
    const { statusname, description, userID  } = request.body

   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    
    const values = [
        id,
        statusname,
        description,
        userID,
        utils_getDate()
    ];
    
    mysql.query( create(), [values], ( err, result ) => {

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


           
    mysql.query( getAll(), ( err, result ) => {

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

const getAssetStatusByName = ( request, response ) => {

    const {name } = request.params


    mysql.query( getIDByName(), [name], ( err, result ) => {

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
   

    mysql.query( getByID(),[id], ( err, result ) => {

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


    // const values = [
    //     statusname,
    //     description,
    //     userID,
    //     utils_getDate(),
    //     statusid
    // ];

   // console.log(values)
    mysql.query( updateByID(), [statusname,description,userID,utils_getDate(),statusid], ( err, result ) => {

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

    // const values = [
    //     statusname,
    //     description,
    //     userID,
    //     utils_getDate(),
    //     statusid
    // ];

   // console.log(values)
    mysql.query( deleteByID(), [statusid], ( err, result ) => {

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
    deleteAssetStatus,
    getAssetStatusByName

}