/*

Date : 10 / 14 / 23
Author : Nole
Activities
Purpose : 
  Create log_routes
  
*/

const { Router } = require('express')

const {
    
    putLog,
    getAllLogs,
    getLog,
    getUserLogsInfo

} = require('../controllers/logs_controller')

const router = Router()

router.post('/log', putLog) // Api call to create log


module.exports = router