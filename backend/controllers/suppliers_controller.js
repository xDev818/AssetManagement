/* 
    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create suppliers_controller.js
      create function ViewAllAssetStatus

    Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/Suppliers) controller
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
  }  = require('../_sqlstatement/Suppliers')

const createSupplier = ( request, response ) => {

    const id = randomUUID() 
    const { suppliername, address, contactno,email, userID  } = request.body
   
   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    
    const values = [
        id,
        suppliername,
        address,
        contactno,
        email,
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

// An instance to Load all Suppliers
const viewAllSuppliers = ( request, response ) => {

 
    
             
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

const getSupplierID = ( request, response ) => {

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

const updateAssetStatus = ( request, response ) => {

    const { supplierid, suppliername, address,contactno,email, userID  } = request.body

    mysql.query( updateByID(), [suppliername,address,contactno,email,userID,utils_getDate(),supplierid], ( err, result ) => {

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

// An instance to delete Catgegory by ID
const deleteSupplier = ( request, response ) => {

    const { supplierid} = request.body
  
   
    mysql.query( deleteByID(), [supplierid], ( err, result ) => {

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
    createSupplier,
    viewAllSuppliers,
    updateAssetStatus,
    deleteSupplier,
    getSupplierID

}