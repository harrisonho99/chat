const dirpath = require("../../helper/path").dirPath
var admin = require("firebase-admin");

// firebase admin SDK
var serviceAccount = require(dirpath + "/chat-test-f624b-firebase-adminsdk-optsp-85b218d62b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin