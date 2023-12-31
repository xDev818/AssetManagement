/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes

    Date : 10 / 21 / 23
    Author : Nole

    Purpose : 
        create asset_type_controller.js
        create function 
            viewAllAssetType,
            deleteAssetType,
            getAssetTypeByID,
            createAssetType,
            updateAssetType


    Date : 10 / 22 / 23
        Author : Nole
        Activities
        Purpose : 
        Import sqlStatement(/_sqlstatement/AssetType) controller

*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const {
    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
  }  = require('../_sqlstatement/AssetType')

const createAssetType = ( request, response ) => {

    const id = randomUUID() 
    const { asset_categoryid,asset_typename, asset_typedescription, userID  } = request.body
  
   // if( !username ) return response.status(400).send( { message: "Username is required" } )


    
    const values = [
        id,
        asset_categoryid,
        asset_typename,
        asset_typedescription,
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

const viewAllAssetType = ( request, response ) => {

    

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
    })
}

const deleteAssetType = ( request, response ) => {

    const { asset_typeid } = request.body

    mysql.query( deleteByID(), [asset_typeid], ( err, result ) => {

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

const getAssetTypeByID = ( request, response ) => {

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

const updateAssetType = ( request, response ) => {

    const { asset_typeid,asset_categoryid, asset_typename,asset_typedescription, userID  } = request.body


  
    mysql.query( updateByID(), [asset_categoryid,asset_typename,asset_typedescription,userID,utils_getDate(),asset_typeid], ( err, result ) => {

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

module.exports = {
    viewAllAssetType,
    deleteAssetType,
    getAssetTypeByID,
    createAssetType,
    updateAssetType

}