
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
      To separate all the SQL Statement from the controller (Suppliers)
*/

const create = () => {

    return "INSERT INTO tblSuppliers(supplierid,name,address,"
    + "contactno,email,createdBy,dateCreated) values (?)";
    
 }
 
 const getByName = () => {
 
     return  "select positionDisplayID from tblPositions where positionName = ?";
    
 }

 const getAll = () => {

    return    "SELECT supplierid as id,name as supplierName,address,contactno,email FROM tblSuppliers"
            + " ORDER BY supplierName ASC"
    
 }

const getByID = () => {

    return  "SELECT supplierid as id,name as supplierName,address,contactno,email FROM tblSuppliers"
            + " WHERE supplierid = ?"
}

const updateByID = () => {

    return    "UPDATE tblSuppliers SET name = ?,"
            + "address = ?,contactno = ?,email = ?, updateBy = ?,dateUpdate = ?"
            + " where supplierid = ?"
}

const deleteByID = () => {
    return "DELETE FROM tblSuppliers WHERE supplierid=?"
}

 module.exports = {

    create,
    getByName,
    getAll,
    getByID , 
    updateByID , 
    deleteByID 
 }