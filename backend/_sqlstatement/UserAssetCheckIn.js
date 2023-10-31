
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller (User Checkin)


    */

      const viewAllAssetsfor_Deploy_ByUserID = () => {

        return   "SELECT assetsdetail.detailID,assetsdetail.assetID,asset.serialNo, "
            + "asset.assetCode,asset.assetName,status.statusName,type.typeName,department.departmentName,"
            + "COALESCE(DATE_FORMAT(assetsdetail.plancheckout, '%m/%d/%Y'),'') as date_checkout ,"
            + "concat(user.lastname,', ' , user.firstname) as fullname,assetsdetail.docRef_Checkin,"
            + "concat(userCheckout.lastname,', ' , userCheckout.firstname) as ReleasedBy,userCheckout.userDisplayID"
            + " FROM tblUserAssetDetails assetsdetail"
            + " inner join tblAssets asset on asset.assetID COLLATE utf8mb4_unicode_ci = assetsdetail.assetID"
            + " inner join tblAssetStatus status on status.assetStatusID COLLATE utf8mb4_unicode_ci = assetsdetail.assetStatusID"
            + " inner join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci  = assetsdetail.departmentID"
            + " inner join tblUsers user on user.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.userSelectedID"
            + " inner join tblUsers userCheckout on userCheckout.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.useridcheckout"
            + " inner join  tblAssetType type on type.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
            + " where assetsdetail.checkinby is null and user.userDisplayID = ? and assetsdetail.active_checkin = 1"
            + " ORDER BY assetsdetail.plancheckout ASC"

        
     }

     const update_Receive = () => {

      return "UPDATE tblUserAssetDetails SET checkinby = ?,"
            + "datecheckin = ?,active_checkin = ? "
            + " where detailID = ?"

      
   }


   const updateAssetDetail_Status = () => {

    return "UPDATE tblUserAssetDetails SET assetStatusID = ?"
          + " where detailID = ?"

    
 }

 const updateAsset_Status = () => {

  return "UPDATE tblAssets SET assetStatusID = ?,"
        + "updatedBy = ?,dateUpdated = ?"
        + " where assetID = ?"

  
}
    
     module.exports = {

        viewAllAssetsfor_Deploy_ByUserID,
        update_Receive,
        updateAssetDetail_Status,
        updateAsset_Status
     }