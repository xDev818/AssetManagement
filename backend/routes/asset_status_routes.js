/* 
    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      create asset_status_routes.js for Asset Status
         *** router.post('/status',createAssetStatus) 
         *** router.get('/getViewallStatus',ViewAllAssetStatus)

*/

const { Router } = require('express')

const {
    createAssetStatus,
    ViewAllAssetStatus,
    getAssetStatusbyID
} = require('../controllers/asset_status_controller')

const router = Router()

router.post('/status',createAssetStatus) //api call to create Asset Status
router.get('/getallStatus',ViewAllAssetStatus) // api to view all Asset Status
router.get('/getStatusbyID/:id',getAssetStatusbyID) // api to view all Asset Status

module.exports = router