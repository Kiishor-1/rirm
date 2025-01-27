const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");
const { applyForJob,cancelApplication, getApplications,sendEmailUpdate, deleteApplications  } = require("../controllers/userController");

router.get("/applications", authMiddleware, getApplications);
router.post("/apply/:jobId", authMiddleware, applyForJob);
router.delete("/cancel/:jobId", authMiddleware, cancelApplication);
router.post("/send-email-update", sendEmailUpdate);
router.delete("/delete-applications", deleteApplications);

module.exports = router;
