import express from "express";
import {deleteJob , getAllJobs , postJob , getMyjobs, updateJob} from "../controllers/jobController.js"
import {isAuthorized} from "../middlewares/auth.js"



const router = express.Router();

router.get("/getall" , getAllJobs);

router.post ("/post" , isAuthorized ,  postJob);

router.post ("/getMyJobs" , isAuthorized ,  getMyjobs);

router.put("/update/:id" , isAuthorized ,  updateJob);

router.delete("/delete/:id" , isAuthorized ,  deleteJob);

export default router;