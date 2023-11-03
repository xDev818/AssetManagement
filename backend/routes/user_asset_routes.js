
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
      user Asset routes


    */

const { Router } = require('express')

const {
    viewAllAssetsbyID,
    viewAllStatus,
    Pullout,
    viewPulloutAssetsbyID,
    UpdateAsset,

} = require('../controllers/user_asset_controller')

const router = Router()

router.get('/user-asset/viewstatus',viewAllStatus) 
router.post('/user-asset/pullout-asset',Pullout) 
router.get('/user-asset/viewallByID/:id',viewAllAssetsbyID) 
router.get('/user-asset/viewPulloutByID/:id',viewPulloutAssetsbyID) 
//router.get('/user-asset/view-Pullout-ByDocRef/:id',viewPulloutAssetsbyDocRefNo) 
router.post('/user-asset/update-asset',UpdateAsset) 
// router.post('/assetcategory/updateAssetCategory',updateAssetCategory) 

module.exports = router