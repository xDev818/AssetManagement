/* 

Date : 10 / 18 / 23
Author : Nole
Activities
Purpose : 
  create function founction
    router.get('/departments', getDepartmentByName)
    router.post('/create-department', createDepartment)
    router.get('/get_all_departments', getallDepartments)
    router.get('/getDepartmentByID/:id', getDepartmentByID)
    router.post('/updateDepartmentByID', updateDepartmentByID)

*/

const { Router } = require('express')

const {
    createDepartment,
    getDepartmentByName,
    getallDepartments,
    getDepartmentByID,
    updateDepartmentByID,
    deleteDepartmentByID

} = require('../controllers/department_controller')

const router = Router()

router.get('/departments', getDepartmentByName)
router.post('/create-department', createDepartment)
router.get('/get_all_departments', getallDepartments)
router.get('/getDepartmentByID/:id', getDepartmentByID)
router.post('/updateDepartmentByID', updateDepartmentByID)
router.post('/deleteDepartmentByID', deleteDepartmentByID)

module.exports = router