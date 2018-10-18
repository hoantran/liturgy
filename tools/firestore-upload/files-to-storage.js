/*
Written by Baotuan Nguyen referencing the following
1. Getting all filepaths, https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
2. Uploading local file to Firebase Storage w/ Admin SDK, https://stackoverflow.com/questions/51207162/how-can-i-upload-files-to-firebases-cloud-storage-with-a-path-using-the-admin-s
*/

//setup firebase admin sdk
const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./service-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "liturgy-website.appspot.com"
    // databaseURL: "https://project-liturgy.firebaseio.com"
});

var bucket = admin.storage().bucket();

//get all filepaths in song directory
var fileArray = []
require('node-dir').files('songs', function(err, files) { fileArray = files; });

//upload each file with full filepath to Firebase Storage
console.log("Starting upload...");

fileArray.forEach(function(filepath){
    bucket.upload(filepath, {destination: filepath})
    console.log(filepath)
});
