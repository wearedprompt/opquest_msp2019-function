// import express from 'express'
// import cors from 'cors'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const app = express();

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

// Random Quest when Create Account
exports.randomQuest = functions.auth.user().onCreate(user => {
  const uid = user.uid

  return randomtoDB(uid)
})

// Random Quest and Store in Firestore
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
    Q1status: false,
    Q2status: false,
    Q3status: false,
    Q4status: false,
  })

  console.log('Finish Random Quest for ' + uid)
}

exports.questStatus = functions.https.onCall((data, context) => {
  const user = db.collection('users').doc(context.auth.uid)
  user
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        const Qstatus = {
          Q1status: doc.data().Q1status,
          Q2status: doc.data().Q2status,
          Q3status: doc.data().Q3status,
          Q4status: doc.data().Q4status
        }
        console.log(Qstatus)
        return 
      }
    })
    .catch(err => {
      console.log('Error getting document', err)
    })
})
