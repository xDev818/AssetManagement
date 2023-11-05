

/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 24 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller (Four Grpahs)

*/


const getTotalAmount_Assets = () => {

    return  "SELECT FORMAT(sum(assets.amount),2) as 'Amount' "
            + "  FROM tblAssets assets"
            + " WHERE assets.active = 1"
    
 }

 const getCount_AssetsNotAvailable = () => {

        return  "SELECT count(assetID) as 'NotAvailable' FROM tblAssets asset"
                + " INNER JOIN tblAssetStatus status on asset.assetStatusID COLLATE utf8mb4_unicode_ci = status.assetStatusID"
                + " where status.statusName not in('Available','Deployed','For Deploy')  and asset.active = '1'"
        
     }

 const getCount_Assets_Deployed = () => {

    return  "SELECT count(assets.assetID) as 'Count' "
            + "  FROM tblAssets assets"
            + " inner join tblAssetStatus stat on stat.assetStatusID = assets.assetStatusID"
            + " WHERE assets.active = 1  and stat.statusName = 'Deployed' "
    
 }


 const getCount_Assets_ForDeploy = () => {

    return  "SELECT count(assets.assetID) as 'ForDeploy' "
            + "  FROM tblAssets assets"
            + " inner join tblAssetStatus stat on stat.assetStatusID = assets.assetStatusID"
            + " WHERE assets.active = 1  and stat.statusName = 'For Deploy' "
    
 }

 const getCount_Assets_Available = () => {

    return  "SELECT count(assets.amount) as 'Available' "
            + "  FROM tblAssets assets"
            + " inner join tblAssetStatus stat on stat.assetStatusID = assets.assetStatusID"
            + " WHERE assets.active = 1  and stat.statusName = 'Available' "
    
 }

//  const getCount_Assets_PullOut = () => {

//     return  "SELECT count(assetID) as Pullout FROM tblAssets assets"
//             + " inner join tblAssetStatus stat on stat.assetStatusID = assets.assetStatusID"
//             + " where active = '1' and stat.statusName IN ('Lost/Stolen','Depreciated',"
//             + " 'Broken  Not Fixable','Out of Warranty','Out of Repair / Not Serviceable',"
//             + " 'Defective')"
    
//  }

 const viewSchedulePulloutAssets = () => {

        return "SELECT count(assetsdetail.assetID) as 'ForPullout'"
                + "  FROM tblUserAssetDetails assetsdetail"
                + " WHERE assetsdetail.pulloutBy IS NOT NULL AND assetsdetail.pullout_receivedby IS NULL"
        }

module.exports = {

        getTotalAmount_Assets,
   
    getCount_Assets_Deployed,
    getCount_Assets_Available,
    getCount_Assets_ForDeploy,
    //getCount_Assets_PullOut,
    getCount_AssetsNotAvailable,
    viewSchedulePulloutAssets
 }