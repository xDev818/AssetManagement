
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

    Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
      New SQL Statement to get Status ID of 'Deploy'

*/


const create = () => {

    return "INSERT INTO tblAssetStatus(assetStatusID,statusName,statusDescription,"
            + "createdBy,dateCreated) values (?)";
    
 }
 
 const getIDByName = () => {
 
     return "SELECT assetStatusID,statusName,statusDescription FROM tblAssetStatus"
        + " where statusName = ?"
    
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
    getIDByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }