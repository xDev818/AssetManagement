const { Router } = require('express')

const {
    
    getCategoryByName

} = require('../controllers/categories_controller')

const router = Router()

router.post('/categories', getCategoryByName)

module.exports = router