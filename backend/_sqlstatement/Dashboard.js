
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 01 / 05 / 23
    Author : Nole
    Activities
    Purpose : 
      Get total asset amount in previous year

*/

const PreviousYear_Amount = () => {

    return  "select IFNULL(FORMAT(sum(asset.amount),2),'0.00') as 'Amount' from tblAssets asset"
        + " where YEAR(convert(asset.datePurchase,date)) = ?"
        + " and asset.active = '1' "
    
 }

 const currentYear_Acquired = () => {

    return  "call getAssetAcquired(YEAR(CURDATE()))"
    
 }

 const asset_deployed = () => {

   return  "SELECT dept.departmentDisplayID,dept.shortName,"
           + "(SELECT IFNULL(count(detail.detailID),'0') as cnt FROM assetmngt.tblUserAssetDetails detail"
           + " INNER JOIN  tblAssetStatus stat on stat.assetStatusID COLLATE utf8mb4_unicode_ci = detail.assetStatusID"
           + " where detail.departmentID COLLATE utf8mb4_unicode_ci = dept.departmentDisplayID"
           + " and stat.statusName = 'Deployed'"
           + " and detail.checkinby is not null"
           + " and detail.pulloutBy is null"
           + " and detail.pullout_receivedby is null"
           + ") as Count "
           + " FROM assetmngt.tblDepartments dept"
           + " where dept.shortName not in ('Default','-')"
           + " order by dept.shortName asc"
   
}

const view_logInfo = () => {

   return  "SELECT log.logID,get_DisplayName(log.createdBy) as DisplayName,get_UserImageFile(log.createdBy) as ImageFile,"
           + "log.logtype,log.module,log.logfunction,log.logvalues,"
           + " log.createdBy,COALESCE(DATE_FORMAT(log.dateCreated, '%m/%d/%Y'),'') as dateatecreated,"
           + " get_UserDepartment(log.createdBy) as Department FROM tblLogs log"
           + "  order by log.dateCreated desc LIMIT 50"
          
}

const view_assetmovement = () => {

   return  "call Asset_Movement()"
   
}



const view_assetPerDept = () => {

   return  "SELECT dept.departmentDisplayID,dept.shortName,"
             + "(SELECT IFNULL(count(detail.assetID),'0') as CntDept"
             + " FROM tblUserAssetDetails detail"
             + " where detail.checkinby is not null"
             + "  and detail.pulloutBy is null"
             + "  and detail.departmentID COLLATE utf8mb4_unicode_ci = dept.departmentDisplayID"
             + ") as assetdept FROM assetmngt.tblDepartments dept"
             + " where dept.shortName not in('-','Default')"
             + " order by dept.shortName asc"
   
}

const view_assetStatus = () => {

   return  "SELECT stat.assetStatusID,stat.statusName,"
             + "(SELECT IFNULL(count(asset.assetID),'0') as CntAsset"
             + " FROM tblAssets asset"
             + " where asset.assetStatusID COLLATE utf8mb4_unicode_ci = stat.assetStatusID"
             + "  and asset.active = '1'"
             + "  ) as CntStatus"
             + " FROM tblAssetStatus stat"
             + "  ORDER BY stat.statusName ASC"
   
}
const view_assetType = () => {

   return  "SELECT types.typeID,types.typeName,"
             + "(SELECT IFNULL(count(asset.assetID),'0') as CntType"
             + " FROM tblAssets asset"
             + " where asset.typeID COLLATE utf8mb4_unicode_ci = types.typeID"
             + "  and asset.active = '1'"
             + " ) as Current"
             + " FROM tblAssetType types"
             + " order by Current desc"
   
}

const view_assetCategory = () => {

   return  "SELECT Category.assetCategID,Category.assetCategName as Category,"
             + "(SELECT IFNULL(count(asset.assetID),'0') as CntType"
             + " FROM tblAssets asset"
             + " INNER JOIN tblAssetType assetType on assetType.typeID COLLATE utf8mb4_unicode_ci = asset.typeID"
             + "  where assetType.assetCategID COLLATE utf8mb4_unicode_ci = Category.assetCategID"
             + " and asset.active = '1'"
             + " ) as Current"
             + " FROM tblAssetCategory Category"
             + " order by Current  desc"
}

const view_assetLocations = () => {

   return  "SELECT locations.locationid,locations.name,"
             + "(SELECT IFNULL(count(details.detailID),'0') as count FROM tblUserAssetDetails details"
             + " INNER JOIN tblDepartments dept on dept.departmentDisplayID COLLATE utf8mb4_unicode_ci = details.departmentID"
             + " INNER JOIN tblLocations location on location.locationid COLLATE utf8mb4_unicode_ci = dept.locationid"
             + " INNER JOIN tblAssetStatus stats on stats.assetStatusID COLLATE utf8mb4_unicode_ci = details.assetStatusID"
             + " WHERE location.locationid = locations.locationid"
             + " and stats.statusName = 'Deployed'"
             + " and details.checkinby is not null"
             + " and details.pulloutBy is null"
             + " ) as count"
             + " FROM tblLocations locations"
             + " ORDER by locations.orderid asc"
}
const view_assetCondition = () => {

   return  "call sp_get_Condition()"
   
}

 module.exports = {

    PreviousYear_Amount,
    currentYear_Acquired,
    asset_deployed,
    view_logInfo,
    view_assetmovement,
    view_assetPerDept,
    view_assetStatus,
    view_assetType,
    view_assetCategory,
    view_assetCondition,
    view_assetLocations

 }