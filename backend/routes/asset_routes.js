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
    deleteAsset,
    getAssetByID,
    createAsset,
    updateAsset,

} = require('../controllers/asset_controller')

const router = Router()

router.get('/asset/view-AllAssets',viewAllAssets) 
router.get('/asset/getAssetByID/:id',getAssetByID) 
router.post('/asset/delete-AssetByID',deleteAsset) 
router.post('/asset/create-AssetByID',createAsset) 
router.post('/asset/update-AssetByID',updateAsset) 


module.exports = router