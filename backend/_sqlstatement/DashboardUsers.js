/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 11 / 12 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller (DashBoard Users)

*/


const LoadProfile = () => {

    return "SELECT users.userDisplayID as id,concat(TRIM(users.lastname),  ', ', TRIM(users.firstname)) as FullName,"
    + " users.email,users.imgFilename,pos.positionName,dept.departmentName,categ.categoryName,"
    + " COALESCE(DATE_FORMAT(users.dateCreated, '%m/%d/%Y'),'') as date_created,users.active,loc.name as 'Location' FROM assetmngt.tblUsers users"
    + " INNER JOIN tblPositions pos ON pos.positionDisplayID COLLATE utf8mb4_unicode_ci = users.positionID "
    + " INNER JOIN tblDepartments dept ON dept.departmentDisplayID COLLATE utf8mb4_unicode_ci = pos.departmentDisplayID"
    + " INNER JOIN tblUserCategory categ ON categ.categoryID COLLATE utf8mb4_unicode_ci = users.groupTypeID"
    + " INNER JOIN tblLocations loc on loc.locationid COLLATE utf8mb4_unicode_ci = dept.locationid"
    + " WHERE users.userDisplayID = ?"
    
    
 }
 

 module.exports = {

    LoadProfile,
   
 }