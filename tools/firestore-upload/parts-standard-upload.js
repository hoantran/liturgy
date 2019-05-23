#!/usr/bin/env node

/*
Uploading legacy (MySQL) liturgy parts to Firestore parts

- Generate new id (uuid)
- Keep the same section title and part name
- Create order of the part by converting legacy local-to-the-section order to the global order

*/

const admin = require('firebase-admin')
const fs = require('fs').promises
const path = require('path')
const readlineSync = require('readline-sync')
// const project = require ('./serviceAccountKey-storage') // look in ./serviceAccountKe.sample.js for an example
const project = require('./serviceAccountKey-hoandev')
const default_parts_path = './sql_json_dump/worship.parts.json'

function usage(){
  const exploded = process.argv[1].split(path.sep)
  const executable = exploded[exploded.length - 1]

  console.log(`\nUSAGE: \n      .${path.sep}${executable} <path_for_json_file_of_legacy_parts_data> \n`)
  console.log(`defaulting path to: ${default_parts_path} \n`)
}

var parts_path = default_parts_path
console.log(`LENGTH: ${process.argv.length}`)
if (process.argv.length != 3) {
  usage()
} else {
  parts_path = process.argv[2].replace(/(\/|\\)+$/, "")
  console.log(`HERE: ${parts_path}`)
}

console.log(`path: ${parts_path} \n`)

//
// FUNCTIONS
//
async function readJsonFile (filePath) {
  let result = {}
  if (filePath) {
    let data = await fs.readFile(filePath)
    result = JSON.parse(data)
  }

  return result
}

//
// Kick it off
//
( async () => {
  try {
    const legacy_parts = await readJsonFile(parts_path)
    console.log('..........................')
    // console.log(`${legacy_parts}`)

    // console.log("TYPE OF: ", typeof legacy_parts)
    // console.log("KEYS OF: ", typeof Object.values(legacy_parts))

    var standardParts = []
    console.log("standardParts: ", Array.isArray(standardParts))
    console.log("legacy_parts: ", Array.isArray(legacy_parts))

    let sorted = legacy_parts.sort( (a,b) => {
      if (a['section'] > b['section']) {
        return 1
      } else if (a['section'] < b['section']) {
        return -1
      } else {
        return a['part_order'] - b['part_order']
      }
    })

    console.log('..................')
    sorted.forEach(element => {
      console.log(element)
    });

  } catch (err) {
    console.error('Upload attempt failed: ', err)
  }
})()