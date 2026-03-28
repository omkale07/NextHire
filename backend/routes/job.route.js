const express = require('express')
const {postJob, getAllJobs, getJobById, getAdminJobs, deleteJob} = require('../controllers/job.controller')
const isAuthenticated = require('../middlewares/isAuthenticated.js');

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getAllJobs)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs)
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route("/delete/:id").delete(isAuthenticated, deleteJob)

module.exports = router;