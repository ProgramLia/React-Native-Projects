// IMPORTS...
const {
     serviceRegister,
     serviceLogin,
     resendOtpService,
     verifyOtpService,
     forgotPasswordService,
     resetPasswordService,
     getProfileService,
     updatePinService, 
     emailOTPservice,
     updateEmailService,
     getUserService,
     updateProfileService,
     uploadPhotoService,
     updatePhotoService,
     getPhotoService,
     confirmPin,
     createUser,
     updateUser,
     deleteUser} = require("../../../services/users");

// ========== AUTH ========= //
async function register(req, res, next) {
     try {
          const response = await serviceRegister(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "Registration successful",
               data: {user: response.newUser, token:response.token,}})
     } catch (err) {
          next(err);
     }
}

async function login(req, res, next) {
     try {
          const response = await serviceLogin(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "Login successful",
               data: response})
     } catch (err) {
          next(err);
     }
}

async function resendOTP(req, res, next) {
     try {
          const response = await resendOtpService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "Success to resend OTP",})
     } catch (err) {
          next(err);
     }
}

async function verifyOTP(req, res, next) {
     try {
          const response = await verifyOtpService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "user verification successful",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

// ========= USERS ========== //
async function getUsers(req, res, next) {
     try{
          const response = await getUserService(req);
          res.status(200).json({
               code:"200",
               status:"OK",
               data:response.users,
               page:{
                    total_page:Math.ceil(response.total / response.limit),
                    total_items:response.total,
                    page:response.page,
                    limit:response.limit
               }
          })
     }catch(err){
          next(err);
     }
}

async function insertUser(req,res,next) {
     try {
          const response = await createUser(req);
          res.status(200).json({
               code:'200',
               status:"OK",
               message:"Success to create user",
               data:response,
          });
     }catch(err){
          next(err);
     }
}
async function editUser(req,res,next) {
     try {
          const response = await updateUser(req);
          res.status(200).json({
               code:'200',
               status:"OK",
               message:"Success to update user",
               data:response,
          });
     }catch(err){
          next(err);
     }
}
async function removeUser(req,res,next) {
     try {
          const response = await deleteUser(req);
          res.status(200).json({
               code:'200',
               status:"OK",
               message:"Success to delete user",
          });
     }catch(err){
          next(err);
     }
}

// ========== FORGOT-PASSWORD ========== //
async function forgotPassword(req, res, next) {
     try {
          const response = await forgotPasswordService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "OTP has been sent to your email",
               data: response,
          });
     } catch (err) {
          next(err);
     }
}

async function resetPassword(req, res, next) {
     try {
          const response = await resetPasswordService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "Reset password successfuly",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

// ========== EMAIL ========== //
async function emailOTP(req,res,next) {
      try {
          const response = await emailOTPservice(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

async function  updateEmail(req,res,next) {
       try {
          const response = await updateEmailService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "success update email",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

// ========== PROFILE ========== //
async function getProfile(req, res, next) {
     try {
          const response = await getProfileService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

async function updateProfile(req,res,next) {
       try {
          const response = await updateProfileService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

async function uploadPhoto(req,res,next) {
       try {
          const response = await updateProfileService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

async function getPhoto(req,res,next) {
     try{
          const response = await getPhotoService(req);
          res.status(200).json({
               code:"200",
               status:"OK",
               data:response,
          })
     }catch(err){
          next(err)
     }
}

async function uploadPhoto(req,res,next) {
     try {
          const response = await uploadPhotoService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

          })
     } catch (err) {
          next(err);
     }
}

async function updatePhoto(req,res,next) {
     try {
          const response = await updatePhotoService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message:"Update photo successfully",
               url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          })
     } catch (err) {
          next(err);
     }
}

// ========== PIN ========== //
async function pinOTP(req,res,next) {
     try {
          const response = await emailOTPservice(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "OTP has been sent to your email",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

async function pinConfirm(req, res, next) {
     try {
          await confirmPin(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message:"Confirmation success"
          })
     } catch (err) {
          next(err);
     }
}

async function updatePin(req, res, next) {
     try {
          const response = await updatePinService(req);
          res.status(200).json({
               code: "200",
               status: "OK",
               message: "success update pin",
               data: response,
          })
     } catch (err) {
          next(err);
     }
}

// EXPORTS...
module.exports = {
     register,
     login,
     resendOTP,
     verifyOTP,
     getUsers,
     insertUser,
     editUser,
     removeUser,
     forgotPassword,
     resetPassword,
     updatePin,
     getProfile,
     updateProfile,
     emailOTP,
     updateEmail,
     uploadPhoto,
     pinConfirm,
     updatePhoto,
     getPhoto,
};