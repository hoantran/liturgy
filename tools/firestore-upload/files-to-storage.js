/*
Script to upload song media files to Firebase. Must have songs folder in the same directory
and generate service-key file via these instructions: https://hackernoon.com/filling-cloud-firestore-with-data-3f67d26bd66e

Written by Baotuan Nguyen referencing the following
1. Getting all local filepaths, https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
2. Uploading local file to Firebase Storage w/ Admin SDK,
https://stackoverflow.com/questions/51207162/how-can-i-upload-files-to-firebases-cloud-storage-with-a-path-using-the-admin-s
*/

const admin = require('./node_modules/firebase-admin');
const nodedir = require('node-dir');

//setup firebase admin sdk
const serviceAccount = require("./service-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "liturgy-website.appspot.com"
});

//create reference to Firebase storage bucket from credentials initialized above
var bucket = admin.storage().bucket();

//get all filepaths in local song directory (syncrhonusly)
var fileArray = nodedir.files('songs', {sync:true});

//upload each file with full filepath to Firebase Storage
fileArray.forEach(function(filepath){
    if(!filepath.includes("DS_Store")) //work around for MacOS DS_Store files
    {
      bucket
        .upload(filepath, {destination: filepath}) //returns a promise
        .then(() => console.log("successfully uploaded: "+ filepath))
        .catch(function(err){console.log("Error on uploading: "+filepath); console.log(err); /*process.exit()*/});
    }
});
