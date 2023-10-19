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
    viewAllCategory,
    deleteAssetCategory,
    getCategoryByID,
    createAssetCategory,
    updateAssetCategory

} = require('../controllers/asset_category_controller')

const router = Router()

router.get('/assetcategory/viewassetcategory',viewAllCategory) 
router.post('/assetcategory/deleteassetcategory',deleteAssetCategory) 
router.get('/assetcategory/getCategoryByID/:id',getCategoryByID) 
router.post('/assetcategory/createAssetCategory',createAssetCategory) 
router.post('/assetcategory/updateAssetCategory',updateAssetCategory) 


module.exports = router

