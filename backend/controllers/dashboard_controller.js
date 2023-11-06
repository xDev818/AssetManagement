/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 


   Date : 01 / 05 / 23
    Author : Nole
    Activities
    Purpose : 
      Create Dashboard COntroller
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const {
    PreviousYear_Amount,
    currentYear_Acquired,
    asset_deployed
  }  = require('../_sqlstatement/Dashboard')



  const dashboard_AssetAmountPreviousYear = ( request, response ) => {

    const curDate = new Date(utils_getDate())
    const prevyear = curDate.getFullYear() - 1
   // console.log(prevyear)
    mysql.query(PreviousYear_Amount(), [prevyear], ( err, result ) => {

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

const dashboard_Current_Acquired_Asset = ( request, response ) => {

   // const curDate = new Date(utils_getDate())
   // const currentyear = curDate.getFullYear()
   // console.log(currentyear)
    //const stmt =  "call getAssetAcquired(?)"
    mysql.query(currentYear_Acquired(),  ( err, result ) => {

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

const dashboard_Asset_Deploy = ( request, response ) => {

    // const curDate = new Date(utils_getDate())
    // const currentyear = curDate.getFullYear()
    // console.log(currentyear)
     //const stmt =  "call getAssetAcquired(?)"
     mysql.query(asset_deployed(),  ( err, result ) => {
 
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
    dashboard_AssetAmountPreviousYear,
    dashboard_Current_Acquired_Asset,
    dashboard_Asset_Deploy
}