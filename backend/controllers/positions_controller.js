/*
Date : 10 / 18 / 23
Author : Nole
Activities
Purpose : 

  create function createPosition 
  update function getViewAllPosition
  update function updatePosition
  create function deletePosition

*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

// An instance to Create new Department
const createPosition = ( request, response ) => {

  const id = randomUUID() 
  const { positionname, description, departmentid, userID  } = request.body

 // if( !username ) return response.status(400).send( { message: "Username is required" } )


  const stmt = "INSERT INTO tblPositions(positionDisplayID,positionName,"
  + "description,departmentDisplayID,createdBy,dateCreated) values (?)";


  const values = [
      id,
      positionname,
      description,
      departmentid,
      userID,
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

const getPositionByName = (request, response) => {
  const defaultPosition = "Default Position";

  const stmt =
    "select positionDisplayID from tblPositions where positionName = ?";

  mysql.query(stmt, [defaultPosition], (err, result) => {
    if (err || !result.length)
      return response.status(404).send({
        message: "No Record Found",
        message2: err,
      });

    response.status(200).send({
      message: "Record Found",
      result,
    });
  });
};

const getPositionById = (request, response) => {

  const { id } = request.params

  const stmt =
    "SELECT positions.positionDisplayID,positions.positionName,positions.description," +
    "departments.departmentDisplayID," +
    "departments.departmentName FROM tblPositions positions" +
    " INNER JOIN tblDepartments departments on departments.departmentDisplayID = positions.departmentDisplayID" +
    " WHERE positions.positionDisplayID = ?";


      mysql.query( stmt, [id],( err, result ) => {

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

};

const getViewAllPosition = (request, response) => {

  const stmt =
    "SELECT positions.positionDisplayID as id,positions.positionName,departments.departmentName,positions.description"
    + " FROM tblPositions positions"
    + " INNER JOIN tblDepartments departments on departments.departmentDisplayID = positions.departmentDisplayID"
    + " ORDER BY positions.positionName"

    mysql.query(stmt, (err, result) => {

        if (err || !result.length)
          return response.status(404).send({
            message: "No Record Found",
            message2: err,
          });

        response.status(200).send({
          message: "Record Found",
          result
          
      });
    })
}

const updatePosition = (request, response) => {

  const { positionid, positionname, description, departmentid, userID  } = request.body

  const stmt =
    "UPDATE tblPositions SET positionName = ?,description = ?," 
    + "departmentDisplayID = ?,updateBy = ?,dateUpdated = ?" 
    + " where positionDisplayID = ? "

  
    mysql.query( stmt, [positionname,description,
                departmentid,userID,utils_getDate(),positionid], ( err, result ) => {

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

};

const deletePosition = (request, response) => {

  const { positionID } = request.body

 

  const stmt = "DELETE FROM tblPositions WHERE positionDisplayID=?";

    mysql.query(stmt, [positionID] ,(err, result) => {

      if (err) return response.status(400).send(
        {
            message: "Update Error",
            message2: err.message
        })

      response.status(200).send({
        message: "Delete Successfull"
        
      });

     
    })
};

module.exports = {
  createPosition,
  getPositionByName,
  getPositionById,
  getViewAllPosition,
  updatePosition,
  deletePosition
};
