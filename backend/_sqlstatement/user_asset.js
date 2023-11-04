
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
                + "concat(user.lastname,', ' , user.firstname) as fullname,assetsdetail.docRef_Checkin,assetsdetail.docRef_Pullout"
                + " FROM tblUserAssetDetails assetsdetail"
                + " inner join tblAssets asset on asset.assetID COLLATE utf8mb4_unicode_ci = assetsdetail.assetID"
                + " inner join tblAssetStatus status on status.assetStatusID COLLATE utf8mb4_unicode_ci = assetsdetail.assetStatusID"
                + " inner join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci  = assetsdetail.departmentID"
                + " inner join tblUsers user on user.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.checkinby"
                + " inner join tblAssetType type on type.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
                + " where assetsdetail.checkinby = ?"
                + " and assetsdetail.pulloutBy is null"
                + " ORDER BY assetsdetail.plancheckout ASC"

  
        
     }

    const viewPulloutAssets = () => {

    return "SELECT assetsdetail.detailID,assetsdetail.assetID,asset.serialNo,"
            + "asset.assetCode,asset.assetName,status.statusName,type.typeName,department.departmentName,"
            + "COALESCE(DATE_FORMAT(assetsdetail.datecheckin, '%m/%d/%Y'),'') as date_checkin ,"
            + "concat(user.lastname,', ' , user.firstname) as fullname,assetsdetail.docRef_Checkin,assetsdetail.docRef_Pullout"
            + " FROM tblUserAssetDetails assetsdetail"
            + " inner join tblAssets asset on asset.assetID COLLATE utf8mb4_unicode_ci = assetsdetail.assetID"
            + " inner join tblAssetStatus status on status.assetStatusID COLLATE utf8mb4_unicode_ci = assetsdetail.statuspulloutID"
            + " inner join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci  = assetsdetail.departmentID"
            + " inner join tblUsers user on user.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.pulloutBy"
            + " inner join tblAssetType type on type.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
            + " where assetsdetail.pulloutBy = ?"
            + " ORDER BY asset.assetName ASC"
    }

    const viewITPulloutAssets = () => {

      return "SELECT assetsdetail.detailID,assetsdetail.assetID,asset.serialNo,"
              + "asset.assetCode,asset.assetName,status.statusName,type.typeName,department.departmentName,"
              + "concat(user.lastname,', ' , user.firstname) as fullname,assetsdetail.docRef_Pullout,"
              + "assetsdetail.statuspulloutID"
              + " FROM tblUserAssetDetails assetsdetail"
              + " inner join tblAssets asset on asset.assetID COLLATE utf8mb4_unicode_ci = assetsdetail.assetID"
              + " inner join tblAssetStatus status on status.assetStatusID COLLATE utf8mb4_unicode_ci = assetsdetail.statuspulloutID"
              + " inner join tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci  = assetsdetail.departmentID"
              + " inner join tblUsers user on user.userDisplayID COLLATE utf8mb4_unicode_ci = assetsdetail.pulloutBy"
              + " inner join  tblAssetType type on type.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
              + " WHERE assetsdetail.pulloutBy IS NOT NULL AND assetsdetail.pullout_receivedby IS NULL"
              + " ORDER BY asset.assetName ASC"
      }
  
     const viewStatus = () => {

        return "SELECT status.assetStatusID,status.statusName FROM tblAssetStatus status"
               + " where status.vwdispose = '1' "
                + " ORDER BY status.statusName asc"
      
     }

     const pullout = () => {

        return "UPDATE tblUserAssetDetails SET notesPullout = ?,"
                + "statuspulloutID = ?,pulloutnotify = ?,datepullout=?,pulloutBy=?,docRef_Pullout=?"
                + " where detailID = ?"
     }

    const pulloutReceive = () => {

      return "UPDATE tblUserAssetDetails SET pullout_receivedby = ?,"
              + "pullout_datereceived = ?"
              + " where detailID = ?"
    }

    const updatepulloutAssetStatus = () => {

      return "UPDATE tblUserAssetDetails SET pullout_receivedby = ?,"
              + "pullout_datereceived = ?"
              + " where detailID = ?"
    }
     module.exports = {

        viewAssets,
        viewStatus,
        pullout,
        viewPulloutAssets,
        viewITPulloutAssets,
        pulloutReceive
     }