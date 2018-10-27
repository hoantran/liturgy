/*
Script to upload song media files to Firebase. Must have songs folder in the same directory
and generate service-key file via these instructions: https://hackernoon.com/filling-cloud-firestore-with-data-3f67d26bd66e

Written by Baotuan Nguyen referencing the following
1. Getting all local filepaths, https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
2. Uploading local file to Firebase Storage w/ Admin SDK,
https://stackoverflow.com/questions/51207162/how-can-i-upload-files-to-firebases-cloud-storage-with-a-path-using-the-admin-s
*/

const admin = require('firebase-admin')
const fs = require('fs').promises
const path = require('path')
const dir = './songs-exp'


function isSignedIn(auth) {
  console.log(auth)
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Signed In')
      return true
    } else {
      // No user is signed in.
      console.log('NOT signed in')
      return fasle
    }
  })
}

function createUserHoan(auth) {
  console.log('CREATING A USER')

  auth
    .createUser({
      uid: 'hoan',
      email: 'hoan@bluepego.com',
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: 'hoantran',
      displayName: 'Hoan Tran',
      photoURL:
        'https://i.pinimg.com/originals/de/52/5a/de525aeff9ddd92b96b5bc0714709e63.jpg',
      disabled: false
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid)
      console.log('userRecord:', userRecord)
    })
    .catch(function(error) {
      console.log('Error creating new user:', error)
    })
}

function expStorage() {
  // const configObj = require ('./serviceAccountKey-storage')
  const configObj = require('./serviceAccountKey-hoandev')
  admin.initializeApp(configObj.config)

  let bucket = admin.storage().bucket()

  // const fs = require('fs')
  // const filePath = './ps 126 the lord has done/ps 126 the lord has done great things for us.mp3.1.mp3'
  const filePath =
    'ps 126 the lord has done/ps 126 the lord has done great things for us.vocal.1.pdf'
  const options = {
    destination: filePath,
    resumable: true,
    validation: 'crc32c',
    metadata: {
      metadata: {
        song: filePath
      }
    }
  }
  bucket.upload('./' + filePath, options, (err, file) => {
    // Your bucket now contains:
    // - "new-image.png" (with the contents of `local-image.png')
    console.log('ERR: ', err)
    // `file` is an instance of a File object that refers to your new file.
    console.log('FILE: ', file)
  })
}

function walkFiles(){
  const fs = require('fs').promises
  const path = require('path')
  const dir = './songs'
  let layer = 0

  const walk = async (dir, filelist = []) => {
    layer += 1
    console.log(`DIR: ${dir}`)
    const files = await fs.readdir(dir)

    for (file of files) {
      const filepath = path.join(dir, file)
      const stat = await fs.stat(filepath)

      if (stat.isDirectory()) {
        filelist = await walk(filepath, filelist)
      } else {
        console.log(`LAYER {${layer}}:`, filepath)
        filelist.push(file)
      }
    }

    layer -= 1

    return filelist;
  }

  console.log(walk(dir))
}


// walk main directory, and get only files that are exactly one directory deep
// i.e., valid media file(s) of a song must be under this song's folder, no deeper
// songs/ not_valid_media_file_here
// songs/ song folder/ valid_media_file1
// songs/ song folder/ valid_media_file2
// songs/ song folder/ another folder/ not_valid_media_file_here
async function walk(dir, fileLists = { goodList: [], badList: [] }, depth = 0 ) {
  depth += 1
  const files = await fs.readdir(dir)

  for (file of files) {
    if (file.includes("DS_Store")) {
      continue
    }

    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)

    if (stat.isDirectory()) {
      filelist = await walk(filePath, fileLists, depth)
    } else {
      if (depth == 2) {
        fileLists.goodList.push(filePath)
      } else {
        fileLists.badList.push(filePath + `   ( *** wrong directory depth @ ${depth}. It should be 2 *** )`)
      }
    }
  }

  depth -= 1

  return fileLists;
}

async function upload(dir){
  const lists = await walk(dir)

  const configObj = require ('./serviceAccountKey-storage')
  // const configObj = require('./serviceAccountKey-hoandev')
  admin.initializeApp(configObj.config)

  let bucket = admin.storage().bucket()

  let successfulUploads = []
  let failedUploads = lists.badList

  for (let filePath of lists.goodList) {
    console.log(filePath)
    const options = {
      destination: filePath,
      resumable: true,
      validation: 'crc32c'
    }
    
    try {
      await bucket.upload('../' + filePath, options)
      successfulUploads.push(filePath)
    } catch (err) {
      console.error('Upload Error: ', err)
      failedUploads.push(filePath + `   ( *** network error : ${err.toString()} *** )`)
    }
   }
   
  return {  success: successfulUploads, 
            failed: failedUploads
  }
}

// getList(dir).then((list) =>  {
//   console.log('..........................')
//   // console.log(list)
// })

// ( async () => { 
//   fileLists = await walk(dir)
//   console.log('..........................')
//   console.log("SUCCESSFUL UPLOADS")
//   console.log(fileLists.goodList)
//   console.log('..........................')
//   console.log("FAILD UPLOADS")
//   console.log(fileLists.badList)  
// })()

( async () => {
  let uploads = await upload(dir)
  console.log('..........................')
  console.log("SUCCESSFUL UPLOADS")
  console.log(uploads.success)
  console.log('..........................')
  console.log("FAILED UPLOADS")
  console.log(uploads.failed)
})()





// walkFiles()

// const nodedir = require('node-dir');

// //setup firebase admin sdk
// const serviceAccount = require("./service-key.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "liturgy-website.appspot.com"
// });

// //create reference to Firebase storage bucket from credentials initialized above
// var bucket = admin.storage().bucket();

// //get all filepaths in local song directory (syncrhonusly)
// var fileArray = nodedir.files('songs', {sync:true});

// //upload each file with full filepath to Firebase Storage
// fileArray.forEach(function(filepath){
//     if(!filepath.includes("DS_Store")) //work around for MacOS DS_Store files
//     {
//       bucket
//         .upload(filepath, {destination: filepath}) //returns a promise
//         .then(() => console.log("successfully uploaded: "+ filepath))
//         .catch(function(err){console.log("Error on uploading: "+filepath); console.log(err); /*process.exit()*/});
//     }
// });
