/* 

Info : The routes was made and controlled by Jinshin 
        The current Author can add and update the routes


   Date : 11 / 12 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/DashBoardUsers) 
*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')



const {

LoadProfile

  }  = require('../_sqlstatement/DashboardUsers')


const viewAProfile = ( request, response ) => {

    const { id } = request.params

    mysql.query( LoadProfile(),[id] ,( err, result ) => {
       
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
    viewAProfile,
    

}
