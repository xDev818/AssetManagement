
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
      To separate all the SQL Statement from the controller (Position)

*/

const create = () => {

    return "INSERT INTO tblPositions(positionDisplayID,positionName,"
            + "description,departmentDisplayID,createdBy,dateCreated) values (?)";
    
 }
 
 const getByName = () => {
 
     return  "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return   "SELECT positions.positionDisplayID as id,positions.positionName,departments.departmentName,positions.description"
            + " FROM tblPositions positions"
            + " INNER JOIN tblDepartments departments on departments.departmentDisplayID = positions.departmentDisplayID"
            + " ORDER BY positions.positionName"
    
 }

const getByID = () => {

    return  "SELECT positions.positionDisplayID,positions.positionName,positions.description," +
            "departments.departmentDisplayID," +
            "departments.departmentName FROM tblPositions positions" +
            " INNER JOIN tblDepartments departments on departments.departmentDisplayID = positions.departmentDisplayID" +
            " WHERE positions.positionDisplayID = ?";
}

const updateByID = () => {

    return   "UPDATE tblPositions SET positionName = ?,description = ?," 
            + "departmentDisplayID = ?,updateBy = ?,dateUpdated = ?" 
            + " where positionDisplayID = ? "
}

const deleteByID = () => {
    return  "DELETE FROM tblPositions WHERE positionDisplayID=?";
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }