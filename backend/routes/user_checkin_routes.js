/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 26 / 23
    Author : Nole
    Purpose : 
        create User_checkin_routes.js
     
*/


const { Router } = require('express')

const {
    viewAssetByUserID,
    usercheckin_update,
    //usercheckin_updateAssetStatusDetail,
    usercheckin_updateAssetStatus

} = require('../controllers/user_checkin_controller')

const {


} = require('../controllers/asset_status_controller')


const router = Router()

router.get('/user-checkin/view-fordeploy/:id',viewAssetByUserID) 
router.post('/user-checkin/update-checkin',usercheckin_update) 
//router.post('/user-checkin/update-checkin-status',usercheckin_updateAssetStatusDetail) 
router.post('/user-checkin/update-checkin-status-asset',usercheckin_updateAssetStatus) 

module.exports = router