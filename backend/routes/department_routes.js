const { Router } = require('express')

const {
    
    getDepartmentByName

} = require('../controllers/department_controller')

const router = Router()

router.get('/departments', getDepartmentByName)

module.exports = router