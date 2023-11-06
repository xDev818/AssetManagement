
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

 

 module.exports = {

    PreviousYear_Amount,
    currentYear_Acquired,
    asset_deployed

 }