import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});


export const postJob = catchAsyncErrors(async (req , res , next) => {
  const role = req.user.role;
  if (role === "Job Seeker"){
    return next(new ErrorHandler("Job Seeker Cannot post a job!" , 400));
  }

  const {title , description , category , country , city , location , fiexdSalary , salaryFrom , salaryTo} = req.body;

  if( !title || !description || !category || !country || !city || !location ){
    return next(new ErrorHandler("Please provide all the information!" , 400));
  }

  if((!salaryFrom || !salaryTo) && !fiexdSalary){
    return next(new ErrorHandler("Please provide either Ranged salary or Fixed salary information!" , 400));
  }

  if(salaryFrom && salaryTo && fiexdSalary){
    return next(new ErrorHandler("Please provide only one salary option - Fixed salary or Ranged salary" , 400));
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title , 
    description , 
    category , 
    country , 
    city , 
    location , 
    fiexdSalary , 
    salaryFrom , 
    salaryTo,
    postedBy
    //we need this as it is required in the job schema so will get error crating a job if not provided
  });

  res.status(200).json({
    success: "true",
    message: "Job posted successfully!",
    job
  });

});



export const getMyjobs = catchAsyncErrors(async (req , res , next)=>{

  const role = req.user.role;
  if (role === "Job Seeker"){
    return next(new ErrorHandler("Job Seeker Cannot post a job!" , 400));
  }

  const myJobs = await Job.find({postedBy: req.user._id});
  

  res.status(200).json({
    success: "true",
    myJobs
  });

});



export const updateJob = catchAsyncErrors(async (req , res , next) =>{
  const role = req.user.role;
  if (role === "Job Seeker"){
    return next(new ErrorHandler("Job Seeker Cannot post a job!" , 400));
  }

  const {id} = req.params;
  
  let job = await Job.findById(id);

  if(!job){
   
      return next(new ErrorHandler("Oops! job not found!!" , 400));
  }

  job = await Job.findByIdAndUpdate(id , req.body , {
    new : true,
    runValidators: true,
    useFindAndModify: false

  }),

  res.status(200).json({
    success: true,
    message: "job updated successfully",
    job

  })

})



export const deleteJob = catchAsyncErrors(async(req , res , next)=>{
  
  const role = req.user.role;
  if (role === "Job Seeker"){
    return next(new ErrorHandler("Job Seeker Cannot post a job!" , 400));
  }

  const {id} = req.params;

  let job = await Job.findById(id);

  if(!job){
   
      return next(new ErrorHandler("Oops! job not found!!" , 400));
  }

  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted Successfully!"
  });




})
