/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 19 / 23
    Author : Nole
    Purpose : 
        create usergroup_routes.js
*/

const { Router } = require('express')

const {
    viewAllUserGroup,
    deleteUserGroup,
    getUserGroupByID,
    createUserGroup,
    updateAssetCategory
} = require('../controllers/usergroup_controller')

const router = Router()
router.get('/usergroup/viewuser-group',viewAllUserGroup) 
router.post('/usergroup/delete-usergroup',deleteUserGroup) 
router.get('/usergroup/getUserGroupByID/:id',getUserGroupByID) 
router.post('/usergroup/create-usergroup',createUserGroup) 
router.post('/usergroup/update-usergroup',updateAssetCategory) 

module.exports = router