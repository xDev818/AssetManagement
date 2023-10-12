// Packages
const mysql = require('../database')

const getCategoryByName = ( request, response ) => {

    const defaultUser = 'User'

    const stmt = "select categoryID from tblUserCategory where categoryName = ?"

    mysql.query( stmt, [ defaultUser ], ( err, result ) => {

        if( err || !result.length ) return response.status(404).send(
            {
                message: "No Record Found",
                message2: err
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
    getCategoryByName
}