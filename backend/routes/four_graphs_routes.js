/* 

Info : The routes was made and controlled by Jinshin 
            The current Author can add and update the routes

    Date : 10 / 24 / 23
    Author : Nole
    Purpose : 
        create four_graph_routes.js
     
*/

const { Router } = require('express')

const {
    fourgraphs_TotalAssetsAvailable,
    fourgraphs_NoAssetsDeployed,
    fourgraphs_AssetsAvailable,
    fourgraphs_AssetsForDeploy,
    fourgraphs_AssetsPullout,

} = require('../controllers/four_graphs_controller')

const router = Router()

router.get('/fourgraphs/total-asset-available',fourgraphs_TotalAssetsAvailable) 
router.get('/fourgraphs/totalno-asset-deployed',fourgraphs_NoAssetsDeployed) 
router.get('/fourgraphs/totalno-asset-available',fourgraphs_AssetsAvailable) 
router.get('/fourgraphs/totalno-asset-fordeploy',fourgraphs_AssetsForDeploy) 
router.get('/fourgraphs/totalno-asset-pullout',fourgraphs_AssetsPullout) 





module.exports = router