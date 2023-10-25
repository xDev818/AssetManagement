
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
        + "departmentID,notescheckout,plancheckout,useridcheckout,docRef_Checkin,dateInsert) values (?)";
  
}

const updateByID = () => {

  return   "UPDATE tblAssets SET assetStatusID = ?,"
          + "checkout_updateBy = ?,checkout_updatedate=?"
          + " where assetID = ?"

}

const updateReceiving = () => {

  return   "UPDATE tblUserAssetDetails SET active_checkin = ?"
          + " where detailID = ?"

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

 const viewAllAssetsCheckout = () => {

  return   "SELECT assetsdetail.detailID,assetsdetail.assetID,asset.serialNo, "
            + "asset.assetCode,asset.assetName,status.statusName,type.typeName,department.departmentName,"
            + "COALESCE(DATE_FORMAT(assetsdetail.plancheckout, '%m/%d/%Y'),'') as date_checkout ,"
            + "concat(user.lastname,', ' , user.firstname) as fullname,assetsdetail.docRef_Checkin,"
            + "concat(userCheckout.lastname,', ' , userCheckout.firstname) as ReleasedBy,assetsdetail.active_checkin"
            + " FROM tblUserAssetDetails assetsdetail"
            + " inner join tblAssets asset on asset.assetID COLLATE utf8mb4_unicode_ci = assetsdetail.assetID"
            + " inner join tblAssetStatus status on status.assetStatusID COLLATE utf8mb4_unicode_ci = assetsdetail.assetStatusID"
            + " inner join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci  = assetsdetail.departmentID"
            + " inner join tblUsers user on user.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.userSelectedID"
            + " inner join tblUsers userCheckout on userCheckout.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.useridcheckout"
            + " inner join  tblAssetType type on type.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
            + " where checkinby is null"
            + " ORDER BY assetsdetail.plancheckout ASC"

}

const getAssetStatusByName = () => {

  return   "SELECT assetStatusID FROM tblAssetStatus"
          + " where statusName = 'For Deploy' "
}

const getUserPosition_Department_ByID = () => {

  return   "SELECT position.positionDisplayID,department.departmentDisplayID,"
          + "user.lastname,position.positionName,department.departmentName FROM tblUsers user"
          + " left join tblPositions position on position.positionDisplayID COLLATE utf8mb4_unicode_ci = user.positionID"
          + " left join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci = position.departmentDisplayID"
          + " where user.userDisplayID = ?"

}

 module.exports = {

    viewAllAssetsAvailable,
    getAssetStatusByName,
    create,
    updateByID,
    viewAllAssetsCheckout,
    getUserPosition_Department_ByID,
    updateReceiving
 }