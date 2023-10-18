
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

const { Router } = require("express");

const {
  getPositionByName,
  getPositionById,
  getViewAllPosition,
  updatePosition,
  deletePosition, 
  createPosition
} = require("../controllers/positions_controller");

const router = Router();

router.post("/positions/createNewPosition", createPosition);
router.get("/positions", getPositionByName);
router.get("/positions/viewallpositions", getViewAllPosition);
router.get("/positions/getPositionID/:id", getPositionById);
router.post("/positions/updatePosition", updatePosition);
router.post("/positions/deletePosition", deletePosition);

module.exports = router;
