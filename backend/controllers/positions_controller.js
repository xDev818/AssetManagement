// Packages
const mysql = require('../database')

const getPositionByName = ( request, response ) => {

    const defaultPosition = 'Defaulttt Position'

    const stmt = "select positionDisplayID from tblPositions where positionName = ?"

    mysql.query( stmt, [ defaultPosition ], ( err, result ) => {

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
    getPositionByName
}