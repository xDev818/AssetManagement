// Jinshin
const { Router } = require('express')

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
    deleteAllOldUsers

} = require('../controllers/users_controller')

const router = Router()

router.post('/users', createUser) // Api call to create / register a new user
router.post('/users/login', loginUser) // Api call to logged a user in
router.post('/users/verify', verifyUserToken) // Api call to verify user's token
router.post('/users/username/verify', verifyUsername) // Api call to verify user's username
router.post('/users/email/verify', verifyEmail) // Api call to verify user's email
router.get('/users', getAllUsers) // Api call to get all the users
router.get('/users/ByLas', getAllUsersByLastname) // Api call to get all the users by their lastname
router.get('/users/ByAct',getUserByActive) // Api call to get all the users base on active status
router.get('/users/:id', getUserProfile) // Api call to a single user
router.put('/users/:id', updateUserProfile) // Api call to update a single user
router.delete('/users/:id', deleteOldUserById) // Api call to delete an old data by ID
router.delete('/users', deleteAllOldUsers) // Api call to delete all datas base on row ID's

module.exports = router
// End Jinshin