import express from "express";
import {employerGetAllApplications , jobseekerGetAllApplications , jobseekerDeleteApplication , postApplication} from "../controllers/applicationController.js";
import {isAuthorized} from "../middlewares/auth.js"

const router = express.Router();

/*router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
*/
router.get("/employer/getall" , isAuthorized, employerGetAllApplications);

router.get("/jobSeeker/getall" ,isAuthorized , jobseekerGetAllApplications);

router.delete("/delete/:id" ,isAuthorized, jobseekerDeleteApplication);

router.post("/post" ,isAuthorized, postApplication);


//the is Authorized is required here as the user data is going to be passed on to the actual function from this function itself
export default router;