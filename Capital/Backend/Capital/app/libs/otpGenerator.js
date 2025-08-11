function generatorOTP() {
     let OTP = '';
     for(let i = 1; i <= 6; i++) {
          const data = Math.floor(Math.random() * 10);
          OTP += data;
     }
     return OTP;
}

module.exports = generatorOTP;