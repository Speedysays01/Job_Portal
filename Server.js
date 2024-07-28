import app from './App.js';
import cloudinary from 'cloudinary';
import cors from 'cors';


app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key:  process.env.CLOUDINARY_CLIENT_API,
    api_secret:  process.env.CLOUDINARY_CLIENT_SECRET
});

app.listen(process.env.PORT , ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});