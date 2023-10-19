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


const createUserGroup = ( request, response ) => {

    const id = randomUUID() 
    const { usergroup_name, usergroup_description, userID  } = request.body
   
   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    const stmt = "INSERT INTO tblUserCategory(categoryID,categoryName,categoryDesc,"
            + "createdBy,dateCreated) values (?)";
    
    const values = [
        id,
        usergroup_name,
        usergroup_description,
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

const updateAssetCategory = ( request, response ) => {

    const { usergroup_id, usergroup_name,usergroup_description, userID  } = request.body

   
    const stmt = "UPDATE tblUserCategory SET categoryName = ?,"
                + "categoryDesc=?, updateBy = ?,dateUpdate = ?"
                + " where categoryID = ?"
    
  
    mysql.query( stmt, [usergroup_name,usergroup_description,userID,utils_getDate(),usergroup_id], ( err, result ) => {

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
    viewAllUserGroup,
    deleteUserGroup,
    getUserGroupByID,
    createUserGroup,
    updateAssetCategory

}