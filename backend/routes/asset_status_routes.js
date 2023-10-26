/* 
    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      create asset_status_routes.js for Asset Status
         Create router.post('/status',createAssetStatus) 
         Create router.get('/getViewallStatus',ViewAllAssetStatus)
        router.post('/updateStatusbyID',updateAssetStatus) // api to update Asset Status by ID

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        Create router.post('/deleteStatusbyID',deleteAssetStatus) // api to delete Asset Status by ID

*/

const { Router } = require('express')

const {
    createAssetStatus,
    ViewAllAssetStatus,
    getAssetStatusbyID,
    updateAssetStatus,
    deleteAssetStatus,
    getAssetStatusByName
} = require('../controllers/asset_status_controller')

const router = Router()

router.post('/status',createAssetStatus) //api call to create Asset Status
router.get('/getallStatus',ViewAllAssetStatus) // api to view all Asset Status
router.get('/getStatusbyID/:id',getAssetStatusbyID) // api to view all Asset Status by ID
router.get('/getStatusbyname/:name',getAssetStatusByName) // api to view all Asset Status by Name

router.post('/updateStatusbyID',updateAssetStatus) // api to update Asset Status by ID
router.post('/deleteStatusbyID',deleteAssetStatus) // api to delete Asset Status by ID
module.exports = router