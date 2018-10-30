#!/usr/bin/env node

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

// const dir = './sub/songs-exp'

function usage(){
  const exploded = process.argv[1].split('/')
  const executable = exploded[exploded.length - 1]

  console.log(process.argv.length)
  console.log(`\nUSAGE: \n      ./${executable} <root directory of songs folder> <path_for_json_file_output> \n`)
}


if (process.argv.length != 4) {
  usage()
  process.exit(1)
}

const songsRootFolder = process.argv[2].replace(/\/+$/, "")
const outputPath = process.argv[3]


// collect the file paths to be uploadd, which are the files that are exactly one directory deep
// i.e., valid media file(s) of a song must be under this song's folder, no deeper.
// e.g.:
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

function getLastTwoSegments(filepath) {
  let result = ''
  if (filepath) {
    let exploded = filepath.split('/')
    const length = exploded.length
    if (length > 2) {
      result = exploded[length - 2] + '/' + exploded[length - 1]
    }
  }
  return result
}

// media file paths will be rewritten in the format songs/file_folder/medium_file_name
async function upload(dir){
  const lists = await walk(dir)

  const configObj = require ('./serviceAccountKey-storage')
  // const configObj = require('./serviceAccountKey-hoandev')
  admin.initializeApp(configObj.config)

  let bucket = admin.storage().bucket()

  let successfulUploads = []
  let failedUploads = lists.badList
  const ops = {
    action: 'read',
    expires: '03-17-3025'
  }
  let options = {
    destination: 'filePath',
    resumable: true,
    validation: 'crc32c'
  }

  for (let filePath of lists.goodList) {
    process.stderr.write('.')

    let usefulPath = getLastTwoSegments(filePath)
    if (usefulPath) {
      try {
        options.destination = finalPath = "songs/" + usefulPath
        let file = await bucket.upload('./' + filePath, options)
        let signedURL = await file[0].getSignedUrl(ops)
        successfulUploads.push({
          path: options.destination,
          url: signedURL[0]
        })
      } catch (err) {
        console.error('Upload Error: ', err)
        failedUploads.push(filePath + `   ( *** network error : ${err.toString()} *** )`)
      }
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
  try {
    let uploads = await upload(songsRootFolder)
    process.stderr.write('\n')
    const combo = {
      success: uploads.success,
      failed: uploads.failed
    }
    const data = JSON.stringify(combo, null, 2)
    await fs.writeFile(outputPath, data)

    console.log('..........................')
    console.log(`SUCCESSFUL UPLOADS: ${uploads.success.length}`)
    console.log('..........................')
    console.log(`FAILED UPLOADS: ${uploads.failed.length}`)
    console.log('..........................')
  } catch (err) {
    console.error('Upload attempt failed: ', err)
  }
})()
