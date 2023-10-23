
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller (Assets)

*/


const create = () => {

    return "INSERT INTO tblAssets(assetID,typeID,assetStatusID,"
    + "supplierID,serialNo,assetCode,assetName,description,"
    + "amount,datePurchase,amountDepreciatedYr,dateDepreciated,"
    + "createdBy,dateCreated) values (?)";
    
 }
 
 const getByName = () => {
 
     return ''
     // "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return  "SELECT assets.assetID as id,assets.typeID,type.typeName,assets.assetStatusID,Assetstatus.statusName,"
            + " assets.supplierid,vendor.name,assets.serialNo, assets.assetCode, assets.assetName,"
            + "assets.description, FORMAT(assets.amount,2) as 'Amount', "
            + "COALESCE(DATE_FORMAT(assets.datePurchase, '%m/%d/%Y'),'') as date_purchase ,"
            + "FORMAT(assets.amountDepreciatedYr,2) as 'AmountYR' ,"
            + "COALESCE(DATE_FORMAT(assets.dateDepreciated, '%m/%d/%Y'),'') as date_depreciated   FROM tblAssets assets"
            + " INNER JOIN tblAssetType type on assets.typeID COLLATE utf8mb4_unicode_ci = type.typeID"
            + " INNER JOIN tblAssetStatus Assetstatus on assets.assetStatusID COLLATE utf8mb4_unicode_ci = Assetstatus.assetStatusID"
            + " INNER JOIN tblSuppliers vendor on assets.supplierID COLLATE utf8mb4_unicode_ci = vendor.supplierid"
            + " WHERE assets.active = 1"
            + " ORDER BY assets.assetName asc"
    
 }

const getByID = () => {

    return    "SELECT assets.assetID as id,assets.typeID,type.typeName,Assetstatus.assetStatusID,Assetstatus.statusName,"
            + " assets.supplierid,vendor.name,assets.serialNo, assets.assetCode, assets.assetName,"
            + "assets.description, FORMAT(assets.amount,2) as 'Amount', "
            + "COALESCE(DATE_FORMAT(assets.datePurchase, '%m/%d/%Y'),'') as date_purchase ,"
            + "FORMAT(assets.amountDepreciatedYr,2) as 'AmountYR' ,"
            + "COALESCE(DATE_FORMAT(assets.dateDepreciated, '%m/%d/%Y'),'') as date_depreciated   FROM tblAssets assets"
            + " INNER JOIN tblAssetType type on assets.typeID COLLATE utf8mb4_unicode_ci = type.typeID"
            + " INNER JOIN tblAssetStatus Assetstatus on assets.assetStatusID COLLATE utf8mb4_unicode_ci = Assetstatus.assetStatusID"
            + " INNER JOIN tblSuppliers vendor on assets.supplierID COLLATE utf8mb4_unicode_ci = vendor.supplierid"
            + " WHERE assets.active = 1 and assets.assetID = ?"
            + " ORDER BY assets.assetName asc"
}

const updateByID = () => {

    return   "UPDATE tblAssets SET typeID = ?,"
            + "assetStatusID = ?,supplierID = ?,"
            + " serialNo = ?, assetCode = ?,"
            + " assetName = ?, description = ?,"
            + " amount = ?, datePurchase = ?,"
            + " amountDepreciatedYr = ?, dateDepreciated = ?,"
            + " updatedBy = ?, dateUpdated = ?"
            + " where assetID = ?"

}

const deleteByID = () => {
    return  "DELETE FROM tblAssets WHERE assetID=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }