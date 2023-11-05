/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes

   Date : 10 / 24 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/Four Grpahs) controller

   Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
      Add getTotal_AssetsAvailable

   Date : 01 / 05 / 23
    Author : Nole
    Activities
    Purpose : 
      getCount_AssetsNotAvailable,
      viewSchedulePulloutAssets
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const {
    getTotalAmount_Assets,
   getCount_AssetsNotAvailable,
    getCount_Assets_Deployed,
    getCount_Assets_Available,
    getCount_Assets_ForDeploy,
    //getCount_Assets_PullOut,
    viewSchedulePulloutAssets


  }  = require('../_sqlstatement/FourGraphs')

  const fourgraphs_TotalAmountAssetsAvailable = ( request, response ) => {
    
    mysql.query(getTotalAmount_Assets(),  ( err, result ) => {

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

const fourgraphs_CountAssetsForPullout = ( request, response ) => {
    
    mysql.query(viewSchedulePulloutAssets(),  ( err, result ) => {

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

const fourgraphs_CountAssetsNotAvailable = ( request, response ) => {
    
    mysql.query(getCount_AssetsNotAvailable(),  ( err, result ) => {

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

const fourgraphs_NoAssetsDeployed = ( request, response ) => {
    
    mysql.query(getCount_Assets_Deployed(),  ( err, result ) => {

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

const fourgraphs_AssetsAvailable = ( request, response ) => {
    
    mysql.query(getCount_Assets_Available(),  ( err, result ) => {

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

const fourgraphs_AssetsForDeploy = ( request, response ) => {
    
    mysql.query(getCount_Assets_ForDeploy(),  ( err, result ) => {

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

// const fourgraphs_AssetsPullout = ( request, response ) => {
    
//     mysql.query(getCount_Assets_PullOut(),  ( err, result ) => {

//         if( err ) return response.status(400).send(
//             {
//                 message: "No Records Found",
//                 message2: err.message
//             }
//         )

//          response.status(200).send(
//              {
//                  message: "Records Found",
//                  result
//              }
//          )

//     })

// }


module.exports = {
    fourgraphs_TotalAmountAssetsAvailable,
   fourgraphs_CountAssetsNotAvailable,
    fourgraphs_NoAssetsDeployed,
    fourgraphs_AssetsAvailable,
    fourgraphs_AssetsForDeploy,
    //fourgraphs_AssetsPullout,
    fourgraphs_CountAssetsForPullout
}