/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes

    Date : 10 / 19 / 23
    Author : Nole

    Purpose : 
        create asset_controller.js

   Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/Assets) controller
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
  }  = require('../_sqlstatement/Assets')

const createAsset = ( request, response ) => {

    const id = randomUUID() 
    const { asset_typeid, asset_statusid,asset_supplierid,
        asset_serialno, asset_code,asset_name,asset_description,
        asset_purchase_amout,asset_purchase_date,
        assset_depreciated_amount,asset_depreciated_date,userID  } = request.body
    
   // if( !username ) return response.status(400).send( { message: "Username is required" } )

   const dPurchase = new Date(asset_purchase_date)
   const ddepreceiated = new Date(asset_depreciated_date)
    
    const values = [
        id,asset_typeid,asset_statusid,asset_supplierid,
        asset_serialno,asset_code,asset_name,asset_description,
        asset_purchase_amout,dPurchase,
        assset_depreciated_amount,ddepreceiated,
        userID, utils_getDate()
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


const viewAllAssets = ( request, response ) => {

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

const deleteAsset = ( request, response ) => {

    const { assetid } = request.body

    mysql.query( deleteByID(), [assetid], ( err, result ) => {

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

const getAssetByID = ( request, response ) => {

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

const updateAsset = ( request, response ) => {

    const { asset_id, asset_typeid,asset_statusid, 
        asset_supplierid, asset_serialno,
        asset_code, asset_name, asset_description,
        asset_purchase_amout, asset_purchase_date, 
        assset_depreciated_amount, asset_depreciated_date, userID  } = request.body

        const damount = parseFloat(asset_purchase_amout)
        const damountdep = parseFloat(assset_depreciated_amount)
        const dPurchase = new Date(asset_purchase_date)
        const ddepreceiated = new Date(asset_depreciated_date)

    mysql.query( updateByID(), [asset_typeid,asset_statusid, 
        asset_supplierid , asset_serialno ,asset_code, asset_name , 
        asset_description, damount, dPurchase, 
        damountdep , ddepreceiated , 
        userID,utils_getDate(),asset_id], ( err, result ) => {

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
    viewAllAssets,
    deleteAsset,
    getAssetByID,
    createAsset,
    updateAsset


}
