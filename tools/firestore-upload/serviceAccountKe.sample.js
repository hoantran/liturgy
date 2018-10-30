
const admin = require('firebase-admin')

let serviceAccount = {
  "type": "service_account",
  "project_id": "storage-4fbc3",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----\n\n",
  "client_email": "nn.iam.gserviceaccount.com",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/someproject.iam.gserviceaccount.com"
}

exports.config =  {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-name.firebaseio.com',
  storageBucket: "project-name.appspot.com"
}