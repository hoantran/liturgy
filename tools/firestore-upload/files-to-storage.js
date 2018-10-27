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

// be sure to specify directory to upload. it should start at songs/
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
      await bucket.upload('./' + filePath, options)
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

//
// Kick it off
//
( async () => {
  let uploads = await upload(dir)
  console.log('..........................')
  console.log("SUCCESSFUL UPLOADS")
  console.log(uploads.success)
  console.log('..........................')
  console.log("FAILED UPLOADS")
  console.log(uploads.failed)
})()