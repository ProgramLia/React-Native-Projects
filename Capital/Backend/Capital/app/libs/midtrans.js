const midtransClient = require('midtrans-client');
const { MIDTRANS_SERVER_KEY } = require('../config');

let snap = new midtransClient.Snap({
    isProduction: false, // Ubah ke true saat live
    serverKey: MIDTRANS_SERVER_KEY,
});

module.exports = snap;
