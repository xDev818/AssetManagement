
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
      To separate all the SQL Statement from the controller (Asset Type)

*/


const create = () => {

    return  "INSERT INTO tblAssetType(typeID,assetCategID,typeName,description,"
    + "createdBy,dateCreated) values (?)";
    
 }
 
 const getByName = () => {
 
     return ''
     // "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return "SELECT assettype.typeID as id,category.assetCategName,assettype.typeName,"
            + "assettype.description FROM tblAssetType assettype"
            + " INNER JOIN tblAssetCategory category on assettype.assetCategID COLLATE utf8mb4_unicode_ci  = category.assetCategID"
            + " ORDER BY typeName ASC"
    
 }

const getByID = () => {

    return   "SELECT assettype.typeID as id,assettype.assetCategID ,category.assetCategName,assettype.typeName,"
        + "assettype.description FROM tblAssetType assettype"
        + " INNER JOIN tblAssetCategory category on assettype.assetCategID COLLATE utf8mb4_unicode_ci  = category.assetCategID"
        + " WHERE assettype.typeID = ?"
}

const updateByID = () => {

    return  "UPDATE tblAssetType SET assetCategID = ?,typeName = ?,"
        + "description=?, updatedBy = ?,dateUpdated = ?"
        + " where typeID = ?"

}

const deleteByID = () => {
    return   "DELETE FROM tblAssetType WHERE typeID=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }