
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

 Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      New function getAssetStatusByName

*/

const create = () => {

  return "INSERT INTO tblUserAssetDetails(detailID,userSelectedID,assetID,assetStatusID,positionID,"
        + "departmentID,notescheckout,plancheckout,useridcheckout,dateInsert) values (?)";
  
}

const updateByID = () => {

  return   "UPDATE tblAssets SET assetStatusID = ?,"
          + "checkout_updateBy = ?,checkout_updatedate=?"
          + " where assetID = ?"

}

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

 const getAssetStatusByName = () => {

  return   "SELECT assetStatusID FROM tblAssetStatus"
          + " where statusName = 'For Deploy' "
}

 module.exports = {

    viewAllAssetsAvailable,
    getAssetStatusByName,
    create,
    updateByID
 }