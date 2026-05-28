const express = require("express");

const {
  createInterview,
  getInterviews, submitInterview,
} = require("../controllers/interview.controller");

const protect = require(
  "../middleware/auth.middleware"
);

const router = express.Router();

router.post("/", protect, createInterview);

router.get("/", protect, getInterviews);
router.put(
  "/submit",protect,submitInterview
);

module.exports = router;