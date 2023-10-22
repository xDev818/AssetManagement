
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
      To separate all the SQL Statement from the controller (Asset Status)

*/


const create = () => {

    return "INSERT INTO tblAssetStatus(assetStatusID,statusName,statusDescription,"
            + "createdBy,dateCreated) values (?)";
    
 }
 
 const getByName = () => {
 
     return ''
     // "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return  "SELECT assetStatusID, statusName,statusDescription FROM tblAssetStatus"
            + " order by statusName asc"
    
 }

const getByID = () => {

    return   "SELECT assetStatusID,statusName,statusDescription FROM tblAssetStatus"
            + " where assetStatusID = ?"
}

const updateByID = () => {

    return   "UPDATE tblAssetStatus SET statusName = ?,"
            + "statusDescription = ?,updateBy = ?,dateUpdate = ?"
            + " where assetStatusID = ?"
}

const deleteByID = () => {
    return  "DELETE FROM tblAssetStatus WHERE assetStatusID=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }