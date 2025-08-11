// ✅ Ini yang BENAR untuk handle webhook dari Midtrans
const midtransClient = require('midtrans-client');
const { MIDTRANS_SERVER_KEY } = require('../config');

let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: 'dummy-client-key' // tidak digunakan tapi wajib diisi
});

module.exports = coreApi;
