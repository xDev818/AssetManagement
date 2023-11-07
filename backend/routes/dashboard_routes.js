/* 


    Date : 01 / 05 / 23
    Author : Nole
    Purpose : 
        Create dashobard routes
*/


const { Router } = require('express')


const {
    dashboard_AssetAmountPreviousYear,
    dashboard_Current_Acquired_Asset,
    dashboard_Asset_Deploy,
    dashboard_LogInfo,
    dashboard_AssetMovement,
    dashboard_AssetPerDept,
    dashboard_AssetStatus,
    dashboard_AssetType,
    dashboard_AssetCategory

} = require('../controllers/dashboard_controller')

const router = Router()


router.get('/dashboard/asset-acquired-PrevYear',dashboard_AssetAmountPreviousYear) 
router.get('/dashboard/asset-acquired-CurrentYear',dashboard_Current_Acquired_Asset) 
router.get('/dashboard/asset-deploy',dashboard_Asset_Deploy) 
router.get('/dashboard/loginfo',dashboard_LogInfo) 
router.get('/dashboard/asset-movement',dashboard_AssetMovement) 
router.get('/dashboard/asset-perDept',dashboard_AssetPerDept) 
router.get('/dashboard/asset-Status',dashboard_AssetStatus) 
router.get('/dashboard/asset-Type',dashboard_AssetType) 
router.get('/dashboard/asset-Category',dashboard_AssetCategory) 


module.exports = router