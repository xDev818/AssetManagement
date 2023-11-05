
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 01 / 05 / 23
    Author : Nole
    Activities
    Purpose : 
      Get total asset amount in previous year

*/

const PreviousYear_Amount = () => {

    return  "select IFNULL(FORMAT(sum(asset.amount),2),'0.00') as 'Amount' from tblAssets asset"
        + " where YEAR(convert(asset.datePurchase,date)) = ?"
        + " and asset.active = '1' "
    
 }

 const currentYear_Acquired = () => {

    return  "call getAssetAcquired(YEAR(CURDATE()))"
    
 }
 

 module.exports = {

    PreviousYear_Amount,
    currentYear_Acquired

 }