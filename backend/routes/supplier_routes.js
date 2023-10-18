/*

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        create supplier_routes.js

*/

const { Router } = require('express')

const {
    viewAllSuppliers,
    deleteSupplier,
    getSupplierID,
    createSupplier,
    updateAssetStatus
} = require('../controllers/suppliers_controller')

const router = Router()

router.post('/suppliers/createSupplier',createSupplier) //api call to insert new suppliers
router.post('/suppliers/updateSupplier',updateAssetStatus) //api call to update suppliers
router.get('/suppliers/viewallsuppliers',viewAllSuppliers) //api call to Load all suppliers
router.post('/suppliers/deleteSupplier',deleteSupplier) //api call to Load all suppliers
router.get('/suppliers/getSupplierID/:id',getSupplierID) //api call to Load all suppliers
module.exports = router