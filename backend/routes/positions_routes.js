const { Router } = require('express')

const {
    
    getPositionByName

} = require('../controllers/positions_controller')

const router = Router()

router.get('/positions', getPositionByName)

module.exports = router