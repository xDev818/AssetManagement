/*
Date : 10 / 18 / 23
Author : Nole
Activities
Purpose : 
  create function getallDepartments 
  create function getDepartmentByID
  create function createDepartment
  create function updateDepartmentByID
*/

// Packages
const mysql = require("../database");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

const {
  create,
  getByName,
  getAll,
  getByID,
  updateByID,
  deleteByID,
} = require("../_sqlstatement/Department");



// Date helper
const { utils_getDate } = require("../utils/date_helper");

// An instance to Create new Department

const createDepartment = ( request, response ) => {

    const id = randomUUID() 
    const { departmentname, description, userID  } = request.body


  
    const values = [
        id,
        departmentname,
        description,
        userID,
        utils_getDate()
    ];
    
    mysql.query( create(), [values], ( err, result ) => {

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

const getDepartmentByName = ( request, response ) => {

    const defaultDepartment = 'Default Department'
    
   
    mysql.query( getByName(), [ defaultDepartment ], ( err, result ) => {

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

//Load all Active Departments
const getallDepartments = ( request, response ) => {

    


    mysql.query( getAll(), ( err, result ) => {

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

//Load all Active Departments
const getDepartmentByID = ( request, response ) => {

    const { id } = request.params


    mysql.query( getByID(), [id],( err, result ) => {

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

// An instance to update Department by ID
const updateDepartmentByID = ( request, response ) => {

    const { departmentid, departmentname, description, userID  } = request.body

   // if( !username ) return response.status(400).send( { message: "Username is required" } )

  
    
    mysql.query( updateByID(), [departmentname,description,userID,utils_getDate(),departmentid], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Update Error",
                message2: err.message
            }
        )
        
        response.status(200).send(
            {
                message: "Update Success"
            }
        )

    })

}

// An instance to Update Asset Status by ID
const deleteDepartmentByID = ( request, response ) => {

    const { departmentid} = request.body

    
    mysql.query( deleteByID(), [departmentid], ( err, result ) => {

        if( err ) return response.status(400).send(
            {
                message: "Delete Error",
                message2: err.message
            }
        )
        
        response.status(200).send(
            {
                message: "Delete Success"
            }
        )
        
     

    })

}
    


module.exports = {
  createDepartment,
  getDepartmentByName,
  getallDepartments,
  getDepartmentByID,
  updateDepartmentByID,
  deleteDepartmentByID,
};
