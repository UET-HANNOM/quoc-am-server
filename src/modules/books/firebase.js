var admin = require("firebase-admin");

var serviceAccount = require("./quoc-am-storage-firebase-adminsdk-imw6w-6453fc3ff2.json");
var projectId = "quoc-am-storage";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `quoc-am-storage.appspot.com`,
});
const bucket = admin.storage().bucket();
module.exports = {
  bucket,
};
