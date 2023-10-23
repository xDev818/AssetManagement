
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller (Asset Checkout)

*/

const viewAllAssetsAvailable = () => {

    return  "SELECT assets.assetID as id,assets.typeID,type.typeName,assets.assetStatusID,Assetstatus.statusName,"
            + " assets.supplierid,vendor.name,assets.serialNo, assets.assetCode, assets.assetName,"
            + "assets.description, FORMAT(assets.amount,2) as 'Amount', "
            + "COALESCE(DATE_FORMAT(assets.datePurchase, '%m/%d/%Y'),'') as date_purchase ,"
            + "FORMAT(assets.amountDepreciatedYr,2) as 'AmountYR' ,"
            + "COALESCE(DATE_FORMAT(assets.dateDepreciated, '%m/%d/%Y'),'') as date_depreciated   FROM tblAssets assets"
            + " INNER JOIN tblAssetType type on assets.typeID COLLATE utf8mb4_unicode_ci = type.typeID"
            + " INNER JOIN tblAssetStatus Assetstatus on assets.assetStatusID COLLATE utf8mb4_unicode_ci = Assetstatus.assetStatusID"
            + " INNER JOIN tblSuppliers vendor on assets.supplierID COLLATE utf8mb4_unicode_ci = vendor.supplierid"
            + " WHERE assets.active = 1 and Assetstatus.statusName = 'Available'"
            + " ORDER BY assets.assetName asc"

    
 }

 module.exports = {

    viewAllAssetsAvailable,

 }