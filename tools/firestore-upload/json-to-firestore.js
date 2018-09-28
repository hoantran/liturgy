/* https://hackernoon.com/filling-cloud-firestore-with-data-3f67d26bd66e */

//setup firebase admin sdk
const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./service-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-liturgy.firebaseio.com"
});

//loading json converted sql files
const songs= require("./sql_json_dump/worship.songs.json");
const composer_song = require("./sql_json_dump/worship.composer_song.json");
const media_list = require("./sql_json_dump/worship.media.json");


//create arrays for composers and media
songs.forEach(function(element){
    element.composers = []
    element.medias = []
    element.tags = []
});

//add composers to each song
composer_song.forEach(function(element){
    songs.find(song => song.id == element.song_id).composers.push(element.composer_id);
});


media_list.forEach(function(element){
    songs.find(song => song.id == element.song_id).medias.push(element.file_name)
});

//write songs collection to FireStore
songs.forEach(function(element){
    admin.firestore().collection("songs").doc(String(element.id)).set(element)
        .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
}); 