// Packages
const mysql = require('../database')
const { randomUUID } = require('crypto')


// Date helper
const { utils_getDate } = require('../utils/date_helper')


// Generate Random ID
const id = randomUUID() 


// An instance to register a new user
const createUser = ( request, response ) => {

    const stmt = "INSERT INTO tblUsers(userDisplayID,username,email,password,displayName,dateCreated) values (?)";
    const display = "Set your Display Name"
    const values = [
        id,
        req.body.username,
        req.body.email,
        req.body.password,
        display,
        utils_getDate()
    ];
      
    mysql.query( stmt, [values], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Insert Error",
                message2: err.message
            }
        )
        
        response.status(200).send(
            {
                message: "Insert Success"
            }
        )

    })

}

// An Instance to logged a user in
const loginUser = ( request, response ) => {

    const { username } = request.body

    const stmt = "SELECT users.userDisplayID,users.displayName,CONCAT(users.lastname ,', ', users.firstname) as Name,"
    + "users.email,users.imgFilename,userCategory.categoryName as userRole,department.departmentDisplayID,"
    + "department.departmentName,users.password FROM tblUsers users"
    + " inner join tblUserCategory userCategory on users.groupTypeID = userCategory.categoryID"
    + " inner join tblPositions positions on positions.positionDisplayID = users.positionID"
    + " inner join tblDepartments department on department.departmentDisplayID = positions.departmentDisplayID"
    + " where users.username = ? and users.active=1"
    // and users.password = ? 

    mysql.query( stmt, [ username ], ( err, result ) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Record Found",
                message2: err.message 
            }
        )

        response.status(200).send(
            {
                message: "Record Found",
                result
            }
        )

    })

}

// An Instance to get all the users
const getAllUsers = ( request, response ) => {

    const stmt = "SELECT users.userDisplayID as id,usercategory.categoryName,positions.positionName,"
    + "concat(users.lastname,', ' , users.firstname) as fullname,department.departmentName,"
    + "users.displayName,users.email,users.active"
    + " FROM tblUsers users"
    + " INNER JOIN tblUserCategory usercategory on usercategory.categoryID COLLATE utf8mb4_unicode_ci = users.groupTypeID"
    + " INNER JOIN tblPositions positions on positions.positionDisplayID COLLATE utf8mb4_unicode_ci = users.positionID"
    + " INNER JOIN tblDepartments department on department.departmentDisplayID COLLATE utf8mb4_unicode_ci = positions.departmentDisplayID"
    + " where users.active = 1"
    + " ORDER BY fullname"

    mysql.query( stmt, [], ( err,result ) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Records Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Records Found",
                result
            }
        )

    })

}

// An Instance to get all the users by lastname
const getAllUsersByLastname = ( request, response ) => {

    const stmt = "SELECT * FROM tblUsers ORDER BY lastname";

    mysql.query( stmt, [], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "No Record Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Records Found",
                result
            }
        )

    })

}

// An Instance to get users by active
const getUserByActive = ( request, response ) => {

    const stmt = "SELECT userDisplayID, concat(lastname,', ' , firstname) as fullname FROM tblUsers where active = 1";

    mysql.query( stmt, [], ( err, result) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Record Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Record Found",
                result
            }
        )

    })

}

// An Instance to get a user's profile
const getUserProfile = ( request, response ) => {

    const { userid } = request.body

    const stmt = "SELECT a.groupTypeID,b.categoryName,a.positionID,a.firstname,a.lastname,a.displayName,"
    + "a.email,a.imgFilename FROM tblUsers a INNER JOIN tblUserCategory b ON a.groupTypeID = b.categoryID " 
    + "WHERE a.userDisplayID = ?";

    mysql.query( stmt, [ userid ], ( err, result ) => {
        
        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Profile Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Profile Found",
                result
            }
        )

    })

}

// An Intance to update a user
const updateUserProfile = ( request, response ) => {

    const {

        firstname,
        lastname,
        email,
        positionID,
        categoryID,
        displayname,
        userDisplayID

    } = request.body

    const stmt = "UPDATE tblUsers SET `firstname` = ?,`lastname`= ?,`email`= ?,positionID = ?,"  
    + "`groupTypeID` = ?,`displayName`= ?,`updatedBy`=?,`dateUpdated`=? WHERE `userDisplayID` = ?";

    mysql.query( stmt, [
        firstname,
        lastname,
        email,
        positionID,
        categoryID,
        displayname,
        userDisplayID,
        utils_getDate()
    ], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Upload Error",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Upload Success"
            }
        )

    })

}

// An Instance to delete an old user data by ID
const deleteOldUserById = ( request, response ) => {

    const { irowSelectedID } = request.params

    const stmt = "UPDATE tblUsers SET active = 0 where userDisplayID = ?"

    mysql.query( stmt, [ irowSelectedID ], ( err, result ) => {

        if( err || !result.changedRows ) return response.status(404).send(
            {
                message: "No Record Deactivated",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Record Deactivated"
            }
        )

     })

}

// An Instance to delete all the old users data
const deleteAllOldUsers = ( request, response ) => {

    const { rowId } = request.body

    const stmt = "SELECT * FROM tblUserAssetDetails details"
    + " inner join tblAssetStatus stat on stat.assetStatusID COLLATE utf8mb4_unicode_ci = details.assetStatusID"
    + " where (stat.statusName = 'Deployed' or stat.statusName = 'For Deploy') "
    + " and details.userSelectedID = ?"

    mysql.query( stmt, [ rowId ], (err,result) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Record Found",
                message2: err.message
            }
        )

        response.status(200).send(
            {
                message: "Record Found",
                result
            }
        )

     })

}




module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getAllUsersByLastname,
    getUserByActive,
    getUserProfile,
    updateUserProfile,
    deleteOldUserById,
    deleteAllOldUsers
}