/* 

    Date : 10 / 14 / 23
    Author : Jinshin
    Activities
    Purpose : 
      Installed: bcryptjs is added in the backend folder, Inside backend folder do this command " npm i " to get the bcryptjs
      Functions: two functions was added: hash_password and compare_password

*/

const hashing = require('bcryptjs')

const hash_password = ( password ) => {

    const salt = hashing.genSaltSync()

    return hashing.hashSync( password, salt )

}

const compare_password = ( password, hashed_password ) => {

    return hashing.compareSync ( password, hashed_password )

}

module.exports = {
    hash_password,
    compare_password
}