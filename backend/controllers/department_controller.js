// Packages
const mysql = require('../database')

const getDepartmentByName = ( request, response ) => {

    const defaultDepartment = 'Default Department'

    const stmt = "select departmentDisplayID from tbldepartments where departmentName = ?"

    mysql.query( stmt, [ defaultDepartment ], ( err, result ) => {

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
   getDepartmentByName
}