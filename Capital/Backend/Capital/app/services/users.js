// IMPORTS...
const userModel = require("../api/v1/models/users");
const historyModel = require("../api/v1/models/history");
const verifyModel = require("../api/v1/models/verify");
const forgotPassworModel = require("../api/v1/models/forgotPassword");
const imageModel = require("../api/v1/models/image");
const { BadRequest } = require("../errors/badRequest");
const { Conflict } = require("../errors/conflict");
const generatorOTP = require("../libs/otpGenerator");
const bcryptjs = require("bcryptjs")
const { createToken } = require("../libs/jwt");
const { mail } = require("../libs/nodemiler");
const { Unauthorized } = require("../errors/unauthorized");
const { NotFound } = require("../errors/notFound");
const fs = require("fs");
const path = require("path");

// ========== AUTH ========== //
async function serviceRegister(req) {
     const { username, email, password, confirmPassword, phone } = req.body;
     const user = await userModel.findOne({ email });
     if (user) throw new Conflict("invalid credentials");
     if (password != confirmPassword) throw new BadRequest("Password confirmation does not match");
     let OTP;
     let isUnique = true;
     while (isUnique) {
          OTP = generatorOTP();
          if (!await verifyModel.findOne({ otp: OTP, expire_at: { $gt: new Date() } })) isUnique = false;
     }
     const newUser = await userModel.create({ username, email, password, phone });
     await verifyModel.create({ user_id: newUser._id, otp: OTP, expire_at: new Date(Date.now() + 5 * 60 * 1000) });
     await forgotPassworModel.create({ user_id: newUser.id, token: null, expire_at: null });
     await mail(newUser.email, OTP, "verify");
     const token = createToken({ _id: newUser._id });
     return { newUser, token, };
}

async function serviceLogin(req) {
     const { email, password } = req.body;
     const user = await userModel.findOne({ email })
     if (!user) throw new Unauthorized("Invalid email or password");
     if (!user.is_verified) throw new Unauthorized("account has not been verified");
     if (!await bcryptjs.compare(password, user.password)) throw new Unauthorized("Invalid email or password");
     const token = createToken({ _id: user._id, })
     return token;
}

async function resendOtpService(req) {
     const verify = await verifyModel.findOne({ user_id: req.user._id });
     const user = await userModel.findById(req.user._id);
     if (!verify) throw new NotFound("User not found");
     let OTP;
     let isUnique = true;
     while (isUnique) {
          OTP = generatorOTP();
          if (!await verifyModel.findOne({ otp: OTP, expire_at: { $gt: new Date() } })) isUnique = false;
     }
     if (OTP == verifyModel.otp) OTP = generatorOTP();
     verify.otp = OTP;
     verify.expire_at = new Date(Date.now() + 5 * 60 * 1000);
     verify.save();
     await mail(user.email, OTP, "verify");
     return;
}

async function verifyOtpService(req) {
     const { otp } = req.body;
     const verify = await verifyModel.findOne({ user_id: req.user._id });
     if (!verify) throw new Unauthorized("Invalid authentication");
     if (verify.expire_at < Date.now()) throw new BadRequest("OTP expired");
     if (!await bcryptjs.compare(otp, verify.otp)) throw new Unauthorized("Invalid OTP")
     verify.otp = null;
     verify.expire_at = null;
     await verify.save();
     await userModel.findByIdAndUpdate(req.user._id, { is_verified: true });
     return;
}

// ========== PROFILE ========== //
async function getProfileService(req) {
     const user = await userModel.findById(req.user._id);
     if (!user) throw new NotFound("User not found");
     return user;
}

async function updateProfileService(req) {
     const { _id } = req.params;
     const { username, phone, birthday } = req.body;
     return await userModel.findByIdAndUpdate(_id, { username, phone, birthday }, { new: true, upsert: true });
}

async function getPhotoService(req) {
     const userPhoto = await imageModel.findOne({ user_id: req.user._id });
     return userPhoto;
}

async function uploadPhotoService(req) {
     if (!req.file) throw new BadRequest("No file uploaded");
     const exist = await imageModel.findOne({ user_id: req.user._id });
     if (exist) {
          const filePath = path.join(__dirname, "../../public/images", req.file.filename);
          fs.unlink(filePath, (err) => {
               if (err) console.error("Error deleting uploaded file:", err);
          });
          throw new Conflict("Photo already uploaded");
     } else {
          await imageModel.create({
               user_id: req.user._id,
               filename: req.file.filename,
               url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          });
     }
     return
}

async function updatePhotoService(req) {
     if (!req.file) throw new BadRequest("No file uploaded");
     const image = await imageModel.findOne({ user_id: req.user._id });
     if (!image) throw new NotFound("Photo not found");
     if (image.filename) {
          const filePath = path.join(__dirname, "../../public/images", image.filename);
          fs.unlink(filePath, (err) => {
               if (err) console.error("Error deleting old file:", err);
          });
     }
     image.filename = req.file.filename;
     image.url = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
     await image.save();
     return;
}

// ========== USERS ========== //
async function getUserService(req) {
     const { phone, email, username, is_verified, keyword, page = 1, limit = 20 } = req.query;
     const user_id = req.user._id;
     const filter = {};

     // Exclude current user
     if (user_id) {
          filter._id = { $ne: user_id };
     }

     // Keyword-based search (username, email, phone)
     if (keyword) {
          filter.$or = [
               { username: { $regex: keyword, $options: "i" } },
               { email: { $regex: keyword, $options: "i" } },
               { phone: { $regex: keyword, $options: "i" } }
          ];
     }

     // Filter by verification status
     if (is_verified !== undefined) {
          filter.is_verified = is_verified === "true";
     }

     // Pagination
     const pageNumber = parseInt(page);
     const limitNumber = parseInt(limit);
     const skip = (pageNumber - 1) * limitNumber;

     const total = await userModel.countDocuments(filter);
     const users = await userModel
          .find(filter)
          .skip(skip)
          .limit(limitNumber);

     return { page: pageNumber, limit: limitNumber, skip, total, users };
}


async function createUser(req) {
     const { username, password, email, phone, role } = req.body;
     let condition = {}
     if (email) condition.email = email;
     if (phone) condition.phone = phone;
     const user = await userModel.findOne(condition);
     if (user) throw new Conflict("User already exists");
     const newUser = await userModel.create({ username, email, phone, role, password });
     return newUser;
}

async function updateUser(req) {
     const { user_id } = req.params;
     const { username, email, phone, role, password } = req.body;
     const user = await userModel.findById(user_id);
     if (!user) throw new NotFound("User not found");
     user.username = username;
     user.phone = phone;
     user.email = email;
     user.password = password;
     user.role = role;
     await user.save();
     return user;
}

async function deleteUser(req) {
     const { user_id } = req.params;

     const user = await userModel.findById(user_id);
     if (!user) throw new NotFound("User not found");

     // Cari foto jika ada, dan hapus dari server
     const image = await imageModel.findOne({ user_id });
     if (image?.filename) {
          const filePath = path.join(__dirname, "../../public/images", image.filename);
          fs.unlink(filePath, (err) => {
               if (err) console.error("Error deleting image file:", err);
          });
     }

     // Hapus semua yang berhubungan dengan user
     await Promise.all([
          verifyModel.deleteOne({ user_id }),
          forgotPassworModel.deleteOne({ user_id }),
          imageModel.deleteOne({ user_id }),
          historyModel.deleteMany({ user_id }) // pastikan history pakai field `user_id`
     ]);

     // Hapus user terakhir
     await userModel.findByIdAndDelete(user_id);

     return;
}


// ========== FORGOT-PASSWORD ========== //
async function forgotPasswordService(req) {
     const { email } = req.body;
     const user = await userModel.findOne({ email });
     if (!user) throw new Unauthorized("Invalid email");
     let OTP;
     let isUnique = true;
     while (isUnique) {
          OTP = generatorOTP();
          if (!await verifyModel.findOne({ otp: OTP, expire_at: { $gt: new Date() } })) isUnique = false;
     }
     await forgotPassworModel.findOneAndUpdate({ user_id: user._id }, { otp: OTP, expire_at: new Date(Date.now() + 5 * 60 * 1000) });
     await mail(user.email, OTP, "reset");
     return;
}

async function resetPasswordService(req) {
     const { otp, password, confirmPassword } = req.body;
     const is_match = await forgotPassworModel.findOne({ otp });
     if (!is_match) throw new BadRequest("Invalid OTP");
     if (password != confirmPassword) throw new BadRequest("Password confirmation does not match");
     if (is_match.expire_at < Date.now()) throw new BadRequest("OTP expired");
     const user = await userModel.findById(is_match.user_id);
     if (!user) throw new NotFound("User not found");
     user.password = password;
     is_match.otp = null;
     is_match.expire_at = null;
     await is_match.save();
     await user.save();
     return;
}

// ========== UPDATE-EMAIL ========== //
async function emailOTPservice(req) {
     const { email } = req.body;
     const user = await userModel.findOne({ email });
     if (!user) throw new NotFound("User not found with this email");
     const verify = await verifyModel.findOne({ user_id: user._id });
     if (!verify) throw new NotFound("Verification record not found for this user");
     let OTP = generatorOTP();
     verify.otp = OTP;
     verify.expire_at = new Date(Date.now() + 5 * 60 * 1000);
     await verify.save();
     await mail(email, OTP, "verify");
     return verify;
}

async function updateEmailService(req) {
     const { otp, email, confirmEmail } = req.body;
     const user = await userModel.findOne({ _id: req.user._id });
     const verify = await verifyModel.findOne({ user_id: user._id });
     if (!user) throw new NotFound("User not found");
     if (verify.expire_at < Date.now()) throw new BadRequest("OTP expired");
     if (!await bcryptjs.compare(otp, verify.otp)) throw new BadRequest("Invalid OTP");
     if (email != confirmEmail) throw new BadRequest("Email confirmation does not match");
     user.email = email;
     verify.otp = null;
     verify.expire_at = null;
     await verify.save();
     await user.save();
     return user;
}

// ========= UPDATE-PIN ========== //
async function confirmPin(req) {
     const pinConfirmation = req.body.pin;
     const user = await userModel.findById(req.user._id);
     if (!user) throw new NotFound("User not found");
     if (user.pin == null) throw new BadRequest("please create a pin first");
     const confirm = await bcryptjs.compare(pinConfirmation, user.pin);
     if (!confirm) throw new BadRequest("Pin confirmation doesn't match");
     return;
}

async function updatePinService(req) {
     const { otp, pin, confirmPin } = req.body;
     const user = await userModel.findById(req.user._id);
     const verify = await verifyModel.findOne({ user_id: user._id });
     if (!user) throw new NotFound("User not found");
     if (!verify) throw new NotFound("Verification record not found for this user");
     if (!await bcryptjs.compare(otp, verify.otp)) throw new BadRequest("Invalid OTP");
     if (pin != confirmPin) throw new BadRequest("Pin confirmation does not match");
     user.pin = pin;
     verify.otp = null;
     verify.expire_at = null;
     await verify.save();
     await user.save();
     return user;
}

// EXPORTS...
module.exports = {
     serviceRegister,
     serviceLogin,
     resendOtpService,
     verifyOtpService,
     getUserService,
     createUser,
     updateUser,
     deleteUser,
     forgotPasswordService,
     resetPasswordService,
     getProfileService,
     updateProfileService,
     updateEmailService,
     emailOTPservice,
     updatePinService,
     confirmPin,
     uploadPhotoService,
     updatePhotoService,
     getPhotoService,
};