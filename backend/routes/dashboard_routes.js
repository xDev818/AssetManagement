/* 


    Date : 01 / 05 / 23
    Author : Nole
    Purpose : 
        Create dashobard routes
*/


const { Router } = require('express')


const {
    dashboard_AssetAmountPreviousYear,
    dashboard_Current_Acquired_Asset

} = require('../controllers/dashboard_controller')

const router = Router()


router.get('/dashboard/asset-acquired-PrevYear',dashboard_AssetAmountPreviousYear) 
router.get('/dashboard/asset-acquired-CurrentYear',dashboard_Current_Acquired_Asset) 


module.exports = router