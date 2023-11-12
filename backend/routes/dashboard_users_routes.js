/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 11 / 12 / 23
    Author : Nole
    Purpose : 
        create dashboard_users_routes.js
     
*/

const { Router } = require('express')

const {
    viewAProfile

} = require('../controllers/dashboard_users_controller')

const router = Router()

router.get('/dashboard/users-viewProfile/:id',viewAProfile) 



module.exports = router