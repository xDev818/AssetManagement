
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 01 / 01 / 23
    Author : Nole
    Activities
    Purpose : 
      user Asset sql Statement


    */

      const viewAssets = () => {

        return "SELECT assetsdetail.detailID,assetsdetail.assetID,asset.serialNo,"
                + "asset.assetCode,asset.assetName,status.statusName,type.typeName,department.departmentName,"
                + "COALESCE(DATE_FORMAT(assetsdetail.datecheckin, '%m/%d/%Y'),'') as date_checkin ,"
                + "concat(user.lastname,', ' , user.firstname) as fullname,assetsdetail.docRef_Checkin"
                + " FROM tblUserAssetDetails assetsdetail"
                + " inner join tblAssets asset on asset.assetID COLLATE utf8mb4_unicode_ci = assetsdetail.assetID"
                + " inner join tblAssetStatus status on status.assetStatusID COLLATE utf8mb4_unicode_ci = assetsdetail.assetStatusID"
                + " inner join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci  = assetsdetail.departmentID"
                + " inner join tblUsers user on user.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.userSelectedID"
                + " inner join  tblAssetType type on type.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
                + " where user.userDisplayID = ?"
                + " and assetsdetail.pulloutBy is null"
                + " ORDER BY assetsdetail.plancheckout ASC"

  
        
     }

     const viewStatus = () => {

        return "SELECT status.assetStatusID,status.statusName FROM tblAssetStatus status"
               + " where status.vwdispose = '1' "
                + " ORDER BY status.statusName asc"
      
     }

     const pullout = () => {

        return "UPDATE tblUserAssetDetails SET notesPullout = ?,"
                + "statuspullout = ?,datepullout=?,pulloutBy=?,docRef_Pullout=?"
                + " where detailID = ?"
      
     }

     module.exports = {

        viewAssets,
        viewStatus,
        pullout
     }