/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 23 / 23
    Author : Nole
    Purpose : 
        create asset_checkout_routes.js
     
*/

const { Router } = require('express')

const {
    ITCheckout_viewAllAssetsAvailable,
    ITCheckout_getAssetStatusByName,
    createCheckout_Asset,
    updateAssetForDeploy

} = require('../controllers/asset_chekout_controller')

const router = Router()

router.get('/assetcheckout/viewavailable-assets',ITCheckout_viewAllAssetsAvailable) 
router.get('/assetcheckout/get-assetstatus-byname',ITCheckout_getAssetStatusByName) 
router.post('/assetcheckout/create-checkoutasset',createCheckout_Asset) 
router.post('/assetcheckout/update-checkoutasset_ForDeploy',updateAssetForDeploy) 
//router.post('/assetcategory/createAssetCategory',createAssetCategory) 
//router.post('/assetcategory/updateAssetCategory',updateAssetCategory) 


module.exports = router