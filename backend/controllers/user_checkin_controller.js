
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 25 / 23
    Author : Nole
    Activities
    Purpose : 
        create user_checkin_controller.js


*/


// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const {
    viewAllAssetsfor_Deploy_ByUserID,
    update_Receive,
    updateAssetDetail_Status,
    updateAsset_Status


  }  = require('../_sqlstatement/UserAssetCheckIn')

  
  const viewAssetByUserID = ( request, response ) => {
    const { id } = request.params
    
    mysql.query(viewAllAssetsfor_Deploy_ByUserID(), [id], ( err, result ) => {

       
        if( err ) return response.status(400).send(
            {
                message: "Error in loading asset by user",
                message2: err.message
            }
        )
       
        if(!result.length ) return  response.status(200).send(
            {
                message: "No Record Found"
            }
        )

        response.status(200).send(
            {
                message: "Record Found",
                result
            }
        )
        
    })

}

const usercheckin_update = ( request, response ) => {
    
    const { statID, detailID } = request.body

    const active = parseInt('1')

    mysql.query(update_Receive(), [statID,utils_getDate(),active,detailID], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Update Error",
                message2: err.message
            }
        )

         response.status(200).send(
             {
                 message: "Update Success",
                 result
             }
         )

    })

}

const usercheckin_updateAssetStatusDetail = ( request, response ) => {
    
    const { statID,detailID } = request.body
    // console.log(detailID)  
    // console.log(statID)
    
    
    mysql.query(updateAssetDetail_Status(), [statID,detailID], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Update Error",
                message2: err.message
            }
        )

         response.status(200).send(
             {
                 message: "Update Success",
                 result
             }
         )

    })

}

const usercheckin_updateAssetStatus = ( request, response ) => {
    
    const { assetID, statID,userid } = request.body
    console.log(request.body)
    mysql.query(updateAsset_Status(), [statID,userid,utils_getDate(),assetID], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Update Error",
                message2: err.message
            }
        )

         response.status(200).send(
             {
                 message: "Update Success",
                 result
             }
         )

    })
}


module.exports = {
    viewAssetByUserID,
    usercheckin_update,
    usercheckin_updateAssetStatusDetail,
    usercheckin_updateAssetStatus

}