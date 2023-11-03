
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
      user Asset controller

    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
      viewPulloutAssetsbyID


    */

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')


const {
    viewAssets,
    viewStatus,
    pullout,
    viewPulloutAssets
  }  = require('../_sqlstatement/user_asset')


  const viewAllAssetsbyID = ( request, response ) => {

    const {id} = request.params
  //  console.log(id)
    mysql.query( viewAssets(),[id] ,( err, result ) => {
       
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

const viewPulloutAssetsbyID = ( request, response ) => {

    const {id} = request.params
  //  console.log(id)
    mysql.query( viewPulloutAssets(),[id] ,( err, result ) => {
       
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

const viewAllStatus = ( request, response ) => {

    mysql.query( viewStatus(),( err, result ) => {
       
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


const Pullout = ( request, response ) => {

    const {userid,detailid,statusid,notes,planpullout,docref} = request.body

    const date_pullout = new Date(planpullout)
    const pulloutnotify = parseInt('1')

    mysql.query( pullout(),[notes,statusid,pulloutnotify,date_pullout,userid,docref,detailid],( err, result ) => {
       
        if( err ) return response.status(400).send(
            {
                message: "Error in Pullout",
                message2: err.message
            }
        )

         response.status(200).send(
             {
                 message: "Pullout success"
             }
         )
    })
}

const UpdateAsset = ( request, response ) => {

    const {assetid,userid} = request.body

    mysql.query( pullout(),[notes,statusid,date_pullout,userid,docref,detailid],( err, result ) => {
       
        if( err ) return response.status(400).send(
            {
                message: "Error in Pullout",
                message2: err.message
            }
        )

         response.status(200).send(
             {
                 message: "Pullout success"
             }
         )
    })
}

module.exports = {
    viewAllAssetsbyID,
    viewAllStatus,
    Pullout,
    UpdateAsset,
    viewPulloutAssetsbyID
}
