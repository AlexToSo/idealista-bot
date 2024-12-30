const functions = require('firebase-functions')
const admin = require('firebase-admin'); // Asume Firebase para la base de datos.
// Creation of an express app
const express = require('express')
const app = express()
require('dotenv').config({ path: '.env' })

const firebaseConfig = require(`./config/credentials.js`)

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: `https://${firebaseConfig.project_id}.firebaseio.com`
});

// Routes
app.use('/api/idealista', require('./routes/idealista.js'))
// app.use('/api/filters', require('./routes/filters'))

exports.app = functions.https.onRequest(app)