// Packages
const mysql = require("../database");

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

const getPositionById = (req, res) => {
  const sql =
    "SELECT positions.positionDisplayID,positions.positionName,positions.description," +
    "departments.departmentDisplayID," +
    "departments.departmentName FROM tblPositions positions" +
    " INNER JOIN tblDepartments departments on departments.departmentDisplayID = positions.departmentDisplayID" +
    " WHERE positions.positionDisplayID = ?";

  mysql.query(sql, [req.body.rowId], (err, result) => {
    if (err) {
      res.json({
        message: "No Record Found",
        message2: err.message,
      });
    } else {
      if (result.length > 0) {
        res.json({ result, message: "Record Found" });
      } else {
        res.json({ message: "No Record Found" });
      }
    }
  });
};

const getViewAllPosition = (req, res) => {
  const sql =
    "SELECT positions.positionName,departments.departmentName,positions.description,positions.positionDisplayID as id" +
    " FROM tblPositions positions" +
    " INNER JOIN tblDepartments departments on departments.departmentDisplayID = positions.departmentDisplayID" +
    " ORDER BY positions.positionName";

  mysql.query(sql, (err, result) => {
    if (err) {
      res.json({
        message: "No Record Found",
        message2: err.message,
      });
    } else {
      if (result.length > 0) {
        res.json({ result, message: "Record Found" });
      } else {
        res.json({ message: "No Record Found" });
      }
    }
  });
};

const updatePosition = (req, res) => {
  const sqlUpdate =
    "UPDATE tblPositions SET positionName = ?,description = ?," +
    "departmentDisplayID = ?,updateBy = ?,dateUpdated = ?" +
    " where positionDisplayID = ? ";

  mysql.query(
    sqlUpdate,
    [
      req.body.name,
      req.body.description,
      req.body.deptid,
      req.body.userID,
      utils_getDate(),
      req.body.rowId,
    ],
    (err, result) => {
      if (err) {
        res.json({
          message: "Update Error",
          message2: err.message,
        });
      } else {
        res.json({
          message: "Update Success",
        });
      }
    }
  );
};

const deletePosition = (req, res) => {
  const sqlUpdate = "DELETE FROM tblPositions WHERE positionDisplayID=?";

  mysql.query(sqlUpdate, [req.body.rowId], (err, result) => {
    if (err) {
      res.json({
        message: "No Record Deleted",
        message2: err.message,
      });
    } else {
      //console.log("Success")
      //console.log(values)
      res.json({
        message: "Record Deleted",
      });
    }
  });
};

module.exports = {
  getPositionByName,
  getPositionById,
  getViewAllPosition,
  updatePosition,
  deletePosition,
};
