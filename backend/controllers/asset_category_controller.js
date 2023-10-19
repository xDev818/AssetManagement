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

module.exports = {
    viewAllCategory

}