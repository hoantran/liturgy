#!/usr/bin/env node

const fs = require('fs').promises
const path = require('path')
const readlineSync = require('readline-sync')
const revisedMediaFile = 'newMedia.json'
const utils = require('../../shared/utils/Misc')

// Must install gRPC and build it from source for firestore to work:
//     npm install grpc --build-from-source
//
const admin = require('firebase-admin')
// const project = require ('./serviceAccountKey-storage') // look in ./serviceAccountKe.sample.js for an example
const project = require('./serviceAccountKey-hoandev')

function usage(){
  const exploded = process.argv[1].split(path.sep)
  const executable = exploded[exploded.length - 1]

  console.log(`\nUSAGE: \n      .${path.sep}${executable} <upload json file> <songs json file> <media json file> </media><output file> \n`)
}


if (process.argv.length != 6) {
  usage()
  process.exit(1)
}

const tralingSlashesRegex = /(\/|\\)+$/
const uploadFile = process.argv[2].replace(tralingSlashesRegex, "")
const songFile = process.argv[3].replace(tralingSlashesRegex, "")
const mediaFile = process.argv[4].replace(tralingSlashesRegex, "")
const outputFile = process.argv[4].replace(tralingSlashesRegex, "")

async function readJsonFile (filePath) {
  let result = {}
  if (filePath) {
    let data = await fs.readFile(filePath)
    result = JSON.parse(data)
  }

  return result
}

async function writeJsonFile(objMap) {
  let valuesArray = [...objMap.values()]
  fs.writeFile(revisedMediaFile, JSON.stringify(valuesArray, null, 2))
}

function getDirectory(filePath) {
  if (filePath) {
    let exploded = filePath.split('/')
    return exploded[1]
  }
}

function getDirectoryAndFileName(filePath) {
  return filePath.split('/').slice(1).join('/')
}

function objectToMap(objs, key){
  let objMap = new Map
  objs.forEach(el => {
    if (objMap.has(el[key])) {
      console.log('Err: Redundant element:', el)
      console.log(objMap)
      process.exit(1)
    } else {
      objMap.set(el[key], el)
    }
  })
  return objMap
}

function getIndexedMap(objs, key, keyFunc){
  let objMap = new Map
  objs.forEach(el => {
    let hash = keyFunc ? keyFunc(el[key]) : el[key]
    if (objMap.has(hash)) {
      console.error(`Key collision : ${hash}`)
      process.exit(1)
    } else {
      objMap.set(hash, el)
    }
  })
  return objMap
}

function getIndexedMediaMap(objs, songIndexedByID) {
  let objMap = new Map
  let ambiguousMap = new Map
  objs.forEach(el => {
    const directory = songIndexedByID.get(el.song_id).path
    let hash = directory + '/' + el.file_name
    if (objMap.has(hash)) {
      if ( !ambiguousMap.has( hash ) ) {
        ambiguousMap.set(hash, [objMap.get( hash )])
      }
      ambiguousMap.get ( hash ).push(el)
    } else {
      objMap.set(hash, el)
    }
  })
  return { ambiguousFlag: ambiguousMap.size > 0, ambiguous: ambiguousMap, indexed: objMap }
}

const white = /[\s|:|,|\.|;|@|#|%|^|&|\*|\\]+/g
function stripAndSplit(s1) {
  let stripped = s1.replace(white, " ").toLowerCase()
  return stripped.split(' ')
}

function stripMediumSuffixes(s1) {
  return s1.split('.').slice(0, -3).join('.')
}

function convolve(s1, s2) {
  let count = 0
  for ( let x of s1 ) {
    for ( let y of s2 ) {
      if ( x === y ){
        ++count
      }
    }
  }
  return count
}

function selectHighestRank(candidates, songIndexedByID) {
  console.log('..........................')
  console.log('MEDIA FILE: ', candidates[0].file_name)
  console.log('..........................')

  for (let index = 0; index < candidates.length; index++){
    const song_id = candidates[index].song_id
    const title = songIndexedByID.get(song_id).title
    console.log(`Choice ${index}: ${title}`)
  }
  const maxChoice = candidates.length - 1
  while (true)  {
    let userChoice = readlineSync.question(`Select choice 0 - ${maxChoice}: `)
    if (userChoice >= 0 && userChoice <= maxChoice) {
      return userChoice
    }
  }
}

function highestRankIndex(candidates, songIndexedByID) {
  let highestIndex = 0
  if (candidates.length > 1) {
    for (let index = 0; index < candidates.length; index++){
      if (candidates[index].ranking > candidates[highestIndex].ranking) {
        highestIndex = index
      }
    }
    for (let index = 0; index < candidates.length; index++){
      if (candidates[index].ranking == candidates[highestIndex].ranking && index != highestIndex) {
        console.error('Ambiguous choices. Clarify which song this media file belongs to.')
        return selectHighestRank(candidates, songIndexedByID)
      }
    }

  }
  return highestIndex
}

function clarifyMediaMap(ambigious, indexed, songIndexedByID) {
  for (let [hash, candidates] of ambigious.entries() ) {
    let mediumName = candidates[0].file_name
    const a1 = stripAndSplit(stripMediumSuffixes(mediumName))
    for ( let medium of candidates ) {
      let title = songIndexedByID.get(medium.song_id).title
      let a2 = stripAndSplit(title)
      medium.ranking = convolve(a1,a2)
    }

    const highestIndex = highestRankIndex(candidates,songIndexedByID)
    indexed.set(hash, candidates[highestIndex])
  }
}

async function addSongsToFirestore(songArray){
  admin.initializeApp(project.config)
  let firestore = admin.firestore()
  const settings = {timestampsInSnapshots: true}
  firestore.settings(settings)

  for (let song of songArray) {
    await firestore.collection('songs').add(song)
  }
}

// extract instrument from path:
// for example: filePath == 'songs/40 days/40 days.guitar.1.pdf'
// extract 'guitar' from filePath
// if not valid, return 'unknown'
function mediumTypeFrom(filePath) {
  let extension = ''
    try { 
      extension = filePath.split('/').slice(-1)[0].split('.').slice(-3,-2)[0].toLowerCase() 
    } catch (error) { 
    }
    return utils.mediumType(extension)
}

(async () => {
  try {
    const songs = await readJsonFile(songFile)
    const media = await readJsonFile(mediaFile)
    const songIndexedByID = getIndexedMap(songs, 'id')
    let mediaIndexedObj = getIndexedMediaMap(media, songIndexedByID)
    if ( mediaIndexedObj.ambiguousFlag ) {
      clarifyMediaMap(mediaIndexedObj.ambiguous, mediaIndexedObj.indexed, songIndexedByID)
      // Verifying ...
      // for (let hash of mediaIndexedObj.ambiguous.keys() ) {
      //   let medium = mediaIndexedObj.indexed.get(hash)
      //   let title = songIndexedByID.get(medium.song_id).title

      //   console.log(title, ' FOR ', medium)
      // } 
      await writeJsonFile(mediaIndexedObj.indexed)
    } else {
      console.log('All good! No need to clarify media map.')
    }

    let mediaIndexedByDirectoryAndMedium = mediaIndexedObj.indexed
    let uploads = await readJsonFile(uploadFile)
    let songMap = new Map
    let uploadsWithNoSongs = []
    uploads.success.forEach(element => {
      const hash = getDirectoryAndFileName(element.path)
      const medium = mediaIndexedByDirectoryAndMedium.get(hash) 
      if (medium) {
        let mediumType = mediumTypeFrom(element.path)
        const song_id = medium.song_id
        const media = {
          type: mediumType,
          url: element.path
        }
        if (songMap.has(song_id)){
          songMap.get(song_id).media.push(media)
        } else {
          const oldSong = songIndexedByID.get(song_id)
          songMap.set(song_id, {
            legacyid: oldSong.id,
            title: oldSong.title,
            firstline: oldSong.firstline,
            publisherid: oldSong.publisherid,
            media: [media]
          })
        }
      } else {
        uploadsWithNoSongs.push(element)
      }
    }) 
    await addSongsToFirestore([...songMap.values()])
    console.log('..................')
    if (uploadsWithNoSongs.length != 0) {
      console.log('..................')
      console.log('The following uploads do not attach to any song:')
      console.log(uploadsWithNoSongs)
    }
    console.log('DONE')
  } catch (err) {
    console.error('Failed to collate songs collection', err)
  }
})()