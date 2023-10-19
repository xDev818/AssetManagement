/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes


 Date : 10 / 19 / 23
    Author : Nole

    Purpose : 
        create usergroup_controller.js
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const viewAllUserGroup = ( request, response ) => {

    const stmt = "SELECT categoryID as id,categoryName,categoryDesc FROM tblUserCategory"
            + " ORDER BY categoryName ASC"
    

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

const deleteUserGroup = ( request, response ) => {

    const { usergroup_id } = request.body

    const stmt = "DELETE FROM tblUserCategory WHERE categoryID=?"
    
   
    mysql.query( stmt, [usergroup_id], ( err, result ) => {

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

const getUserGroupByID = ( request, response ) => {

    const { id } = request.params

    const stmt = "SELECT categoryID as id,categoryName,categoryDesc FROM tblUserCategory"
                + " WHERE categoryID = ?"
    
    

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

module.exports = {
    viewAllUserGroup,
    deleteUserGroup,
    getUserGroupByID

}