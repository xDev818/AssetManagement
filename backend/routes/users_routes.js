// Jinshin
const { Router } = require('express')
const mysql = require('../database')
const fileUpload = require('express-fileupload')
const extentions = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

const {
    
    createUser,
    loginUser,
    verifyUserToken,
    verifyUsername,
    verifyEmail,
    getAllUsers,
    getAllUsersByLastname,
    getUserByActive,
    getUserProfile,
    updateUserProfile,
    deleteOldUserById,
    deleteAllOldUsers,
    updateProfile,
    uploadImage

} = require('../controllers/users_controller')

const router = Router()

router.use(fileUpload())

router.post('/users', createUser) // Api call to create / register a new user
router.post('/users/login', loginUser) // Api call to logged a user in
router.post('/users/verify', verifyUserToken) // Api call to verify user's token
router.post('/users/username/verify', verifyUsername) // Api call to verify user's username
router.post('/users/email/verify', verifyEmail) // Api call to verify user's email
router.get('/users', getAllUsers) // Api call to get all the users
router.get('/users/ByLas', getAllUsersByLastname) // Api call to get all the users by their lastname
router.get('/users/ByAct',getUserByActive) // Api call to get all the users base on active status
router.get('/users/:id', getUserProfile) // Api call to a single user
//router.put('/users/:id', updateUserProfile) // Api call to update a single user
router.post('/users/update-profile', updateProfile) // Api call to update a single user


router.delete('/users/:id', deleteOldUserById) // Api call to delete an old data by ID
router.delete('/users', deleteAllOldUsers) // Api call to delete all datas base on row ID's

router.post('/users/upload-image/:userid', 
    (request,response) => {

        const {userid} = request.params
       // console.log(request.files)

        
            const files = request.files
            let image = ""

            // if(files.file) {

            //     console.log("meron file")
            //     console.log(userid)

            // } else {
            //     console.log("no file")
            // }

            const file = files.file
            const type = file.mimetype
            const name = file.name
            const newName = Date.now() + name
          
            if ( !extentions.filter( ex => ex === type ).length ) return response.status(400).send(
                {
                    message: `Only 'png', 'jpg', 'jpeg', 'webp' are allowed. This ${type} is not allowed`,
                    data: {
                    allowed: "png, jpg, jpeg, webp",
                    notAllowed: type
                    }
                }
            )

            file.mv(`../backend/images/static/${newName}`, err => {

                if ( err ) return response.status(400).send(
                   {
                      message: "Failed to updated the user's profile",
                      err
                   }
                )

                const stmt = "UPDATE tblUsers SET imgFilename = ?"
                + " where userDisplayID = ?"

                mysql.query( stmt, [ newName,userid ], ( err, result ) => {

                    if( err ) return response.status(404).send(
                          {
                             message: "Update Error",
                             message2: err
                          }
                    )

                    response.status(200).send(
                        {
                           message: "Image updated successfully",
                           newName
                           // token
                        }
                     )

            })
            

        })

    }
)



module.exports = router
// End Jinshin