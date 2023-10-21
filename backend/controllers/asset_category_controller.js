/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes

    Date : 10 / 19 / 23
    Author : Nole

    Purpose : 
        create asset_category_controller.js
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')


const createAssetCategory = ( request, response ) => {

    const id = randomUUID() 
    const { asset_categoryname, asset_categorydescription, userID  } = request.body
    
   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    const stmt = "INSERT INTO tblAssetCategory(assetCategID,assetCategName,description,"
            + "createdBy,dateCreated) values (?)";
    
    const values = [
        id,
        asset_categoryname,
        asset_categorydescription,
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

// An instance to Load all Suppliers
const viewAllCategory = ( request, response ) => {

    const stmt = "SELECT assetCategID as id,assetCategName,description FROM tblAssetCategory"
            + " ORDER BY assetCategName ASC"
    

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


const getCategoryByID = ( request, response ) => {

    const { id } = request.params

    const stmt = "SELECT assetCategID as id,assetCategName,description FROM tblAssetCategory"
                + " WHERE assetCategID = ?"
    
    

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

const updateAssetCategory = ( request, response ) => {

    const { asset_categoryid, asset_categoryname,asset_categorydescription, userID  } = request.body

   
    const stmt = "UPDATE tblAssetCategory SET assetCategName = ?,"
                + "description=?, updateBy = ?,dateUpdate = ?"
                + " where assetCategID = ?"
    
  
    mysql.query( stmt, [asset_categoryname,asset_categorydescription,userID,utils_getDate(),asset_categoryid], ( err, result ) => {

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


// An instance to Delete Asset Category by ID
const deleteAssetCategory = ( request, response ) => {

    const { asset_categoryid } = request.body

    const stmt = "DELETE FROM tblAssetCategory WHERE assetCategID=?"
    
   
    mysql.query( stmt, [asset_categoryid], ( err, result ) => {

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
    viewAllCategory,
    deleteAssetCategory,
    getCategoryByID,
    createAssetCategory,
    updateAssetCategory


}