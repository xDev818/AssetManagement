/*
Date : 10 / 18 / 23
Author : Nole
Activities
Purpose : 

  create function createPosition 
  update function getViewAllPosition
  update function updatePosition
  create function deletePosition

    Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
      Import sqlStatement(/_sqlstatement/Position) controller

*/

// Packages
const mysql = require('../database')
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

// Date helper
const { utils_getDate } = require('../utils/date_helper')

const {
  create,
  getByName,
  getAll,
  getByID , 
  updateByID , 
  deleteByID 
}  = require('../_sqlstatement/Position')


// An instance to Create new Department
const createPosition = ( request, response ) => {

  const id = randomUUID() 
  const { positionname, description, departmentid, userID  } = request.body

 // if( !username ) return response.status(400).send( { message: "Username is required" } )

  const values = [
      id,
      positionname,
      description,
      departmentid,
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

const getPositionByName = (request, response) => {
  const defaultPosition = "Default Position";



  mysql.query(getByName(), [defaultPosition], (err, result) => {
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

};

const getViewAllPosition = (request, response) => {

    mysql.query(getAll(), (err, result) => {

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

  
    mysql.query( updateByID(), [positionname,description,
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

     mysql.query(deleteByID(), [positionID] ,(err, result) => {

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
