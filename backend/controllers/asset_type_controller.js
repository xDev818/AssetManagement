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
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const createAssetType = ( request, response ) => {

    const id = randomUUID() 
    const { asset_categoryid,asset_typename, asset_typedescription, userID  } = request.body
  
   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    const stmt = "INSERT INTO tblAssetType(typeID,assetCategID,typeName,description,"
            + "createdBy,dateCreated) values (?)";
    
    const values = [
        id,
        asset_categoryid,
        asset_typename,
        asset_typedescription,
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

const viewAllAssetType = ( request, response ) => {

    const stmt = "SELECT assettype.typeID as id,category.assetCategName,assettype.typeName,"
        + "assettype.description FROM tblAssetType assettype"
        + " INNER JOIN tblAssetCategory category on assettype.assetCategID COLLATE utf8mb4_unicode_ci  = category.assetCategID"
        + " ORDER BY typeName ASC"
    

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
    })
}

const deleteAssetType = ( request, response ) => {

    const { asset_typeid } = request.body

    const stmt = "DELETE FROM tblAssetType   WHERE typeID=?"
    
   
    mysql.query( stmt, [asset_typeid], ( err, result ) => {

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


    const stmt = "SELECT assettype.typeID as id,assettype.assetCategID ,category.assetCategName,assettype.typeName,"
        + "assettype.description FROM tblAssetType assettype"
        + " INNER JOIN tblAssetCategory category on assettype.assetCategID COLLATE utf8mb4_unicode_ci  = category.assetCategID"
        + " WHERE assettype.typeID = ?"
        

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

const updateAssetType = ( request, response ) => {

    const { asset_typeid,asset_categoryid, asset_typename,asset_typedescription, userID  } = request.body

   
    const stmt = "UPDATE tblAssetType SET assetCategID = ?,typeName = ?,"
                + "description=?, updatedBy = ?,dateUpdated = ?"
                + " where typeID = ?"
    
  
    mysql.query( stmt, [asset_categoryid,asset_typename,asset_typedescription,userID,utils_getDate(),asset_typeid], ( err, result ) => {

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