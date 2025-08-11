// IMPORTS...
const nodemailer = require("nodemailer");
const { EMAIL, GOOGLE_APP_PASSWORD } = require("../config");

const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: EMAIL,
          pass: GOOGLE_APP_PASSWORD
     }
});

async function mail(userEmail, otpCode, type) {
     try {
          const emailTemplate = type != "verify" ? `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #4CAF50;">🔐 OTP reset password</h2>
                <p>Hallo <b>${userEmail}</b>,</p>
                <p>Berikut adalah OTP kamu untuk proses reset password:</p>
                <div style="font-size: 22px; font-weight: bold; color: #333; margin: 10px 0 20px 0; background-color: #f9f9f9; padding: 10px 20px; display: inline-block; border-radius: 5px;">
                    ${otpCode}
                </div>
                <p>Token ini berlaku selama <b>5 menit</b>. Jangan berikan kode ini kepada siapapun.</p>
                <p>Jika kamu tidak merasa melakukan permintaan ini, silakan abaikan email ini.</p>
                <br/>
                <p>Salam hangat,</p>
                <p><b>Tim Capital App</b></p>
            </div>
        ` :   `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #4CAF50;">🔐 OTP Verification</h2>
                <p>Hallo <b>${userEmail}</b>,</p>
                <p>Berikut adalah kode OTP kamu untuk proses verifikasi:</p>
                <div style="font-size: 22px; font-weight: bold; color: #333; margin: 10px 0 20px 0; background-color: #f9f9f9; padding: 10px 20px; display: inline-block; border-radius: 5px;">
                    ${otpCode}
                </div>
                <p>Kode OTP ini berlaku selama <b>5 menit</b>. Jangan berikan kode ini kepada siapapun.</p>
                <p>Jika kamu tidak merasa melakukan permintaan ini, silakan abaikan email ini.</p>
                <br/>
                <p>Salam hangat,</p>
                <p><b>Tim Capital App</b></p>
            </div>`;
          return await transporter.sendMail({
               from: `"Capital App" <${EMAIL}>`,
               to: userEmail,
               subject: "Kode OTP Verifikasi Akun Capital",
               html: emailTemplate
          });
     } catch (err) {
          console.log(EMAIL);
          console.log(GOOGLE_APP_PASSWORD)
          console.error(err);
     }
}

// EXPORTS...
module.exports = { mail };
