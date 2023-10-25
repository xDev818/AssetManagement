/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 25 / 23
    Author : Nole
    Activities
    Purpose : 
      To separate all the SQL Statement from the controller (User CheckIn)


*/


const create = () => {

    return "INSERT INTO tblUserAssetDetails(detailID,userSelectedID,assetID,assetStatusID,positionID,"
          + "departmentID,notescheckout,plancheckout,useridcheckout,docRef_Checkin,dateInsert) values (?)";
    
  }

  module.exports = {

    create
 }
