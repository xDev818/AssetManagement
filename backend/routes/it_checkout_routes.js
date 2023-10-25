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
    updateAssetForDeploy,
    ITCheckout_getAssetsCheckout,
    ITCheckout_getUserDepartmentPosition_ByID,
    updateAssetReceiving 

} = require('../controllers/it_checkout_controller')


const router = Router()

router.get('/assetcheckout/viewavailable-assets',ITCheckout_viewAllAssetsAvailable) 
router.get('/assetcheckout/get-assetstatus-byname',ITCheckout_getAssetStatusByName) 
router.get('/assetcheckout/get-assetcheckout-byIT',ITCheckout_getAssetsCheckout) 
router.get('/assetcheckout/get-userdeptpos_byID/:id',ITCheckout_getUserDepartmentPosition_ByID) 
router.post('/assetcheckout/create-checkoutasset',createCheckout_Asset) 
router.post('/assetcheckout/update-checkoutasset_ForDeploy',updateAssetForDeploy) 
router.post('/assetcheckout/activate-receiving',updateAssetReceiving) 


module.exports = router