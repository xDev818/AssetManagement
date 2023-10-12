const { Router } = require('express')

const {
    
    getPositionByName

} = require('../controllers/positions_controller')

const router = Router()

router.post('/positions', getPositionByName)

module.exports = router