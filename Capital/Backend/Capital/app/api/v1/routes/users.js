// IMPORTS...
const upload = require("../../../libs/multer");
const { authMiddleware, roleMiddleware } = require("../../../middleware/auth");
const { 
     register, 
     login, resendOTP, 
     verifyOTP, 
     forgotPassword, 
     resetPassword, 
     getProfile, 
     updatePin,
     emailOTP,
     updateEmail,
     getUsers,
     updateProfile,
     uploadPhoto,
     updatePhoto,
     getPhoto,
     confirmPin,
     pinConfirm,
     insertUser,
     editUser,
     removeUser
} = require("../controllers/users");
const router = require("express").Router();

// ========== AUTH =========== //
router.post("/auth/register" , register);
router.post("/auth/login" , login);
router.post("/auth/otp/send", authMiddleware , resendOTP);
router.post("/auth/otp/verify", authMiddleware , verifyOTP);

// ========== USERS ========== //
router.get("/users" , authMiddleware , roleMiddleware("admin") , getUsers);
router.post("/user" , authMiddleware , roleMiddleware("admin") , insertUser);
router.put("/user/:user_id" , authMiddleware , roleMiddleware("admin") , editUser);
router.delete("/user/:user_id" , authMiddleware , roleMiddleware("admin") , removeUser);

// ========== EMAIL ========== // 
router.post("/profile/email/otp" , authMiddleware , roleMiddleware("admin" , "user")  , emailOTP);
router.put("/profile/email" , authMiddleware , roleMiddleware("admin" , "user") , updateEmail);

// ========== PIN ========== //
router.post("/profile/pin/confirmation" , authMiddleware , roleMiddleware("admin" , "user") , pinConfirm);
router.put("/profile/pin" , authMiddleware , roleMiddleware("admin" , "user") , updatePin);

// ========= PHOTO ========= //
router.get("/profile/photo" , authMiddleware , roleMiddleware("admin" , "user") , getPhoto);
router.post("/profile/photo" , authMiddleware , roleMiddleware("admin" , "user") , upload.single("photo") , uploadPhoto);
router.put("/profile/photo" , authMiddleware , roleMiddleware("admin" , "user") , upload.single("photo") , updatePhoto);

// ========== PROFILE ========== //
router.get("/profile", authMiddleware , roleMiddleware("admin" , "user") , getProfile);
router.put("/profile/:_id" , authMiddleware , roleMiddleware("admin" , "user") , updateProfile);

// ========== FORGOT-PASSWORD ========== //
router.post("/forgot/otp", forgotPassword);
router.put("/forgot" , resetPassword);

// EXPORTS...
module.exports = router;