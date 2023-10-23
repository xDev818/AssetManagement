
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
      To separate all the SQL Statement from the controller (User Group)

*/


const create = () => {

    return  "INSERT INTO tblUserCategory(categoryID,categoryName,categoryDesc,"
            + "createdBy,dateCreated) values (?)"
    
 }
 
 const getByName = () => {
 
     return ''
     // "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return "SELECT categoryID as id,categoryName,categoryDesc FROM tblUserCategory"
    + " ORDER BY categoryName ASC"
    
 }

const getByID = () => {

    return   "SELECT categoryID as id,categoryName,categoryDesc FROM tblUserCategory"
    + " WHERE categoryID = ?"
}

const updateByID = () => {

    return  "UPDATE tblUserCategory SET categoryName = ?,"
    + "categoryDesc=?, updateBy = ?,dateUpdate = ?"
    + " where categoryID = ?"
}

const deleteByID = () => {
    return   "DELETE FROM tblUserCategory WHERE categoryID=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }