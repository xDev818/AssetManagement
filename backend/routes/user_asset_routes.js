
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
    viewITPullout_Assets,
    PulloutReceive,
    UpdateAssetStatus
} = require('../controllers/user_asset_controller')

const router = Router()

router.get('/user-asset/viewstatus',viewAllStatus) 
router.post('/user-asset/pullout-asset',Pullout) 
router.get('/user-asset/viewallByID/:id',viewAllAssetsbyID) 
router.get('/user-asset/viewPulloutByID/:id',viewPulloutAssetsbyID) 
router.get('/user-asset/view-ITPullout',viewITPullout_Assets) 
router.post('/user-asset/update-asset',UpdateAsset) 
router.post('/user-asset/update-pullout-receive',PulloutReceive) 
router.post('/user-asset/update-pullout-assetStatus',UpdateAssetStatus) 

module.exports = router