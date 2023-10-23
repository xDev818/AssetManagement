/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes

   Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/AssetCategory) controller
*/


// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const {
    viewAllAssetsAvailable,
    getAssetStatusByName,
    create,
    updateByID
  }  = require('../_sqlstatement/ITAssetCheckout')

  
  const ITCheckout_viewAllAssetsAvailable = ( request, response ) => {
    
    mysql.query(viewAllAssetsAvailable(),  ( err, result ) => {

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

const ITCheckout_getAssetStatusByName = ( request, response ) => {
    
    mysql.query(getAssetStatusByName(),  ( err, result ) => {

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


const createCheckout_Asset = ( request, response ) => {

    const id = randomUUID() 
    const { userid, assetid, statusid,positionid,departmentid,
        notes,plancheckout,userid_checkout} = request.body


   // if( !username ) return response.status(400).send( { message: "Username is required" } )
    const dplan = new Date(plancheckout)
    const values = [
        id,
        userid,
        assetid,
        statusid,
        positionid,
        departmentid,
        notes,
        dplan,
        userid_checkout,
        utils_getDate()
    ];
    console.log(values)
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


const updateAssetForDeploy = ( request, response ) => {

   // const { statusid, userid_checkout,assetid} = request.body
    const { userid, assetid, statusid,positionid,departmentid,
        notes,plancheckout,userid_checkout} = request.body
 
  
    mysql.query( updateByID(), [statusid,userid_checkout,utils_getDate(),assetid], ( err, result ) => {

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


// An instance to Load all Suppliers
const viewAllCategory = ( request, response ) => {



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


const getCategoryByID = ( request, response ) => {

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


// An instance to Delete Asset Category by ID
const deleteAssetCategory = ( request, response ) => {

    const { asset_categoryid } = request.body

   
    mysql.query( deleteByID(), [asset_categoryid], ( err, result ) => {

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
    ITCheckout_viewAllAssetsAvailable,
    ITCheckout_getAssetStatusByName,
    createCheckout_Asset,
    updateAssetForDeploy

}