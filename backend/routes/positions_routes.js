const { Router } = require("express");

const {
  getPositionByName,
  getPositionById,
  getViewAllPosition,
  updatePosition,
  deletePosition,
} = require("../controllers/positions_controller");

const router = Router();

router.get("/positions", getPositionByName);
router.post("/positions/viewallposition", getViewAllPosition);
router.post("/positions/getPositionID", getPositionById);
router.post("/positions/updatePosition", updatePosition);
router.post("/positions/deletePosition", deletePosition);

module.exports = router;
