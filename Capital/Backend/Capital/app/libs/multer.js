// IMPORTS...
const multer = require("multer");
const path= require("path");

const storage  = multer.diskStorage({
     destination: (req, file, cb) => cb(null , "public/images"),
     filename: (res , file, cb) => {
          const extension = path.extname(file.originalname);
          const filename = Date.now() + "-photo" + extension;
          cb(null , filename);
     }
});

const fileFilter = (req, file,  cb) => {
     const allowTypes = ["image/jpg" , "image/png" , "image/jpeg" , "image/webp"];
     if(!allowTypes.includes(file.mimetype)) cb(new Error("Only image files are allowed (jpg, png, webp)"), false);
     cb(null , true);
}
const  upload = multer({
   storage:storage,
   fileFilter:fileFilter,
   limits:{fileSize: 2 * 1024 * 1024}
})

module.exports = upload;