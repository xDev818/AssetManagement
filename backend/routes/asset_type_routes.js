/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 21 / 23
    Author : Nole
    Purpose : 
        create asset_type_routes.js
        create    

            router.get('/assettype/viewasset-type',viewAllAssetType) 
            router.post('/assettype/delete-assettype',deleteAssetType) 
            router.get('/assettype/get-AssetTypeByID/:id',getAssetTypeByID) 
            router.post('/assettype/create-AssetType',createAssetType) 
            router.post('/assettype/update-AssetType',updateAssetType) 

*/

const { Router } = require('express')

const {
    viewAllAssetType,
    deleteAssetType,
    getAssetTypeByID,
    createAssetType,
    updateAssetType
} = require('../controllers/asset_type_controller')

const router = Router()

router.get('/assettype/viewasset-type',viewAllAssetType) 
router.post('/assettype/delete-assettype',deleteAssetType) 
router.get('/assettype/get-AssetTypeByID/:id',getAssetTypeByID) 
router.post('/assettype/create-AssetType',createAssetType) 
router.post('/assettype/update-AssetType',updateAssetType) 


module.exports = router
