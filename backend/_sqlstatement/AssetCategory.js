
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
      To separate all the SQL Statement from the controller (Asset Category)

*/


const create = () => {

    return "INSERT INTO tblAssetCategory(assetCategID,assetCategName,description,"
    + "createdBy,dateCreated) values (?)";
    
 }
 
 const getByName = () => {
 
     return ''
     // "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return "SELECT assetCategID as id,assetCategName,description FROM tblAssetCategory"
            + " ORDER BY assetCategName ASC"
    
 }

const getByID = () => {

    return    "SELECT assetCategID as id,assetCategName,description FROM tblAssetCategory"
            + " WHERE assetCategID = ?"
}

const updateByID = () => {

    return  "UPDATE tblAssetCategory SET assetCategName = ?,"
            + "description=?, updateBy = ?,dateUpdate = ?"
            + " where assetCategID = ?"
}

const deleteByID = () => {
    return  "DELETE FROM tblAssetCategory WHERE assetCategID=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }