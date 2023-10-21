
/* 
    Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller

*/

const create = () => {

    return "INSERT INTO tblDepartments(departmentDisplayID,departmentName,"
             + "description,createdBy,dateCreated) values (?)"
    
 }
 
 const getByName = () => {
 
     return  "SELECT departmentDisplayID from tbldepartments where departmentName = ?"
    
 }

 const getAll = () => {

    return  "SELECT departmentDisplayID,departmentName,description FROM tbldepartments" 
                + " ORDER BY departmentName"
    
 }

const getByID = () => {

    return "SELECT departmentDisplayID,departmentName,description FROM tbldepartments" 
    + " WHERE departmentDisplayID = ?"
}

const updateByID = () => {

    return "UPDATE tblDepartments SET departmentName = ?,description = ?,"
    + "updatedBy = ?,dateUpdated = ?"
    + " where departmentDisplayID = ? "
}

const deleteByID = () => {
    return  "DELETE FROM tblDepartments WHERE departmentDisplayID=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }