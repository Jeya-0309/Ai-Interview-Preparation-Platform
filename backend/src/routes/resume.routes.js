const express = require("express");

const {
  analyzeResume,
} = require(
  "../controllers/resume.controller"
);

const protect = require(
  "../middleware/auth.middleware"
);

const upload = require(
  "../middleware/upload.middleware"
);

const router = express.Router();


router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  analyzeResume
);

module.exports = router;