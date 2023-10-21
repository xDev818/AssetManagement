/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes

    Date : 10 / 19 / 23
    Author : Nole

    Purpose : 
        create asset_controller.js
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const createAsset = ( request, response ) => {

    const id = randomUUID() 
    const { asset_categoryid, asset_statusid,asset_supplierid,
        asset_serialno, asset_code,asset_name,asset_description,
        asset_purchase_amout,asset_purchase_date,
        assset_depreciated_amount,asset_depreciated_date,userID  } = request.body
    
   // if( !username ) return response.status(400).send( { message: "Username is required" } )

    const stmt = "INSERT INTO tblAssets(assetID,assetCategID,assetStatusID,"
            + "supplierID,serialNo,assetCode,assetName,description,"
            + "amount,datePurchase,amountDepreciatedYr,dateDepreciated,"
            + "createdBy,dateCreated) values (?)";
    
    const values = [
        id,asset_categoryid,asset_statusid,asset_supplierid,
        asset_serialno,asset_code,asset_name,asset_description,
        asset_purchase_amout,asset_purchase_date,
        assset_depreciated_amount,asset_depreciated_date,
        userID, utils_getDate()
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


const viewAllAssets = ( request, response ) => {

    const stmt = "SELECT assets.assetID as id,category.assetCategID,category.assetCategName,Assetstatus.statusName,"
           + " vendor.name,assets.serialNo, assets.assetCode, assets.assetName,"
            + "assets.description, FORMAT(assets.amount,2) as 'Amount', "
            + "COALESCE(DATE_FORMAT(assets.datePurchase, '%m/%d/%Y'),'') as date_purchase ,"
            + "FORMAT(assets.amountDepreciatedYr,2) as 'AmountYR' ,"
            + "COALESCE(DATE_FORMAT(assets.dateDepreciated, '%m/%d/%Y'),'') as date_depreciated   FROM tblAssets assets"
            + " INNER JOIN tblAssetCategory category on assets.assetCategID COLLATE utf8mb4_unicode_ci = category.assetCategID"
            + " INNER JOIN tblAssetStatus Assetstatus on assets.assetStatusID COLLATE utf8mb4_unicode_ci = Assetstatus.assetStatusID"
            + " INNER JOIN tblSuppliers vendor on assets.supplierID COLLATE utf8mb4_unicode_ci = vendor.supplierid"
            + " WHERE assets.active = 1"
            + " ORDER BY assets.assetName asc"

    

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

const deleteAsset = ( request, response ) => {

    const { assetid } = request.body

    const stmt = "DELETE FROM tblAssets WHERE assetID=?"
    
   
    mysql.query( stmt, [assetid], ( err, result ) => {

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

    const stmt = "SELECT assets.assetID as id,assets.assetCategID,category.assetCategName,"
    + " assets.assetStatusID, Assetstatus.statusName,"
    + " assets.supplierID,,vendor.name,assets.serialNo, assets.assetCode, assets.assetName,"
     + "assets.description, FORMAT(assets.amount,2) as 'Amount', "
     + "COALESCE(DATE_FORMAT(assets.datePurchase, '%m/%d/%Y'),'') as date_purchase ,"
     + "FORMAT(assets.amountDepreciatedYr,2) as 'AmountYR' ,"
     + "COALESCE(DATE_FORMAT(assets.dateDepreciated, '%m/%d/%Y'),'') as date_depreciated   FROM tblAssets assets"
     + " INNER JOIN tblAssetCategory category on assets.assetCategID COLLATE utf8mb4_unicode_ci = category.assetCategID"
     + " INNER JOIN tblAssetStatus Assetstatus on assets.assetStatusID COLLATE utf8mb4_unicode_ci = Assetstatus.assetStatusID"
     + " INNER JOIN tblSuppliers vendor on assets.supplierID COLLATE utf8mb4_unicode_ci = vendor.supplierid"
     + " WHERE assets.active = 1 and assets.assetID = ?"
     + " ORDER BY assets.assetName asc"
    
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

const updateAsset = ( request, response ) => {

    const { asset_id, asset_categoryid,asset_statusid, 
        asset_supplierid, asset_serialno,
        asset_code, asset_name, asset_description,
        asset_purchase_amout, asset_purchase_date, 
        assset_depreciated_amount, asset_depreciated_date, userID  } = request.body

   
    const stmt = "UPDATE tblAssets SET assetCategID = ?,"
                + "assetStatusID = ?,supplierID = ?,"
                + " serialNo = ?, assetCode = ?,"
                + " assetName = ?, description = ?,"
                + " amount = ?, datePurchase = ?,"
                + " amountDepreciatedYr = ?, dateDepreciated = ?,"
                + " updatedBy = ?, dateUpdated = ?,"
                + " where assetID = ?"
    
  
    mysql.query( stmt, [asset_categoryid,asset_statusid, 
        asset_supplierid , asset_serialno ,asset_code, asset_name , 
        asset_description, asset_purchase_amout, asset_purchase_date, 
        assset_depreciated_amount , asset_depreciated_date , 
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
