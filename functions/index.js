// import cors from 'cors'
// import express from 'express'
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

exports.randomQuest = functions.auth.user().onCreate(user => {
  const uid = user.uid

  randomtoDB(uid)

  return null
})

async function randomtoDB(uid) {
  const user = db.collection('users').doc(uid)

  const randomQ1 = Math.floor(Math.random() * 10)
  const randomQ2 = Math.floor(Math.random() * 10)
  const randomQ3 = Math.floor(Math.random() * 10)
  const randomQ4 = Math.floor(Math.random() * 10)

  await user.set({
    rQ1: randomQ1,
    rQ2: randomQ2,
    rQ3: randomQ3,
    rQ4: randomQ4,
  })

  console.log("Finish Random Quest for " + uid);
  
}
