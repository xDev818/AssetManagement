// Jinshin
// Packages
const { Router, response } = require('express')
const mysql = require('../database')
const fileUpload = require('express-fileupload')

const extentions = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

const router = Router()

router.use(fileUpload())

router.post('/users/update/image/:id',

   ( request, response, next ) => {

      const { id } = request.params

      if ( !id || id.length !== 36 ) return response.status(400).send(
         {
               message: "Unable to update, Invalid ID"
         }
      )

      const checkUser = "select tblusers.userDisplayID from tblusers where userDisplayID = ?"

      mysql.query( checkUser, [ id ], ( err, result ) => {

         if ( err ) return response.status(400).send(
               {
                  message: "An error has accured, unable to update"
               }
         )

         if ( !result.length ) return response.send(
               {
                  message: "Unable to update, This account is no longer existed"
               }
         )
      })

      const files = request.files

      if ( !files ) return response.status(400).send(
         {
            message: "Please add an image"
         }
      )

      const file = files.file
      const type = file.mimetype
      const name = file.name

      if ( !extentions.filter( ex => ex === type ).length ) return response.status(400).send(
         {
            message: `Only 'png', 'jpg', 'jpeg', 'webp' are allowed. This ${type} is not allowed`,
            data: {
               allowed: "png, jpg, jpeg, webp",
               notAllowed: type
            }
         }
      )

      file.mv(`../backend/assets/images/${Date.now()}${name}`  , err => {

         if ( err ) return response.status(400).send(
            {
               message: "Failed to updated the user's profile",
               err
            }
         )
         
         next()

      })

   },
   ( request, response ) => {

      const { id } = request.params

      const registered = '0'

      const updateUser = "update tblusers set imgFilename = ?, isRegister = ? where userDisplayID = ?"

      mysql.query( updateUser, [ request.files.file.name, registered, id ], ( err, result ) => {

         if ( err ) return response.status(400).send(
            {
               message: "An error has occurred. Failed to update user's profile image",
               err
            }
         )

         response.status(201).send(
            {
               message: "User's profile updated successfully"
            }
         )

      })

   }

)

module.exports = router