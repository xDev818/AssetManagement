/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 19 / 23
    Author : Nole
    Purpose : 
        create asset_category_routes.js
     
*/

const { Router } = require('express')

const {
    viewAllCategory
} = require('../controllers/asset_category_controller')

const router = Router()

router.post('/assetcategory/viewassetcategory',viewAllCategory) //api call to insert new suppliers
