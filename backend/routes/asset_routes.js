/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 19 / 23
    Author : Nole
    Purpose : 
        create asset_routes.js
     
*/

const { Router } = require('express')

const {
    viewAllAssets,
    deleteAsset

} = require('../controllers/asset_controller')

const router = Router()

router.get('/asset/view-AllAssets',viewAllAssets) 

router.post('/asset/delete-AssetByID',deleteAsset) 


module.exports = router