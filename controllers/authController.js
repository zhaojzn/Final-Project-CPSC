const express = require('express')
const router = express.Router()
const util = require('../models/util.js')
const User = require("../models/user")

router.post('/register', async (req, res) => {
    const { email, password, confirm } = req.body

    if (password !== confirm) {
        console.log('Passwords do not match')
        return res.redirect('/index.html')
    }

    const client = util.getMongoClient(false)
    try {
        await client.connect()
        const db = client.db()
        const usersCollection = db.collection('users')

        const existingUser = await usersCollection.findOne({ email })
        if (existingUser) {
            console.log('User already exists')
            return res.redirect('/index.html')
        }

        const newUser = {
            email,
            password, 
            role: 'member',
            createdAt: new Date()
        }
        await util.insertOne(usersCollection, newUser)
        console.log("User registered successfully")
        
        req.session.user = newUser
        return res.redirect('/member.html')
    } catch (error) {
        console.error("Registration error:", error)
        return res.redirect('/index.html')
    } finally {
        client.close()
    }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const client = util.getMongoClient(false)
  try {
      await client.connect()
      const db = client.db()
      const usersCollection = db.collection('users')
      const user = await usersCollection.findOne({ email })
      if (!user || user.password !== password) {
          console.log('Invalid credentials')
          return res.redirect('/index.html')
      }
      console.log("User logged in:", user)
      req.session.user = user
      
      // Redirect based on user role:
      if (user.role === 'admin') {
          return res.redirect('/admin.html')
      } else if (user.role === 'guest') {
          return res.redirect('/guest.html')
      } else {
          return res.redirect('/member.html')
      }
  } catch (error) {
      console.error("Login error:", error)
      return res.redirect('/index.html')
  } finally {
      client.close()
  }
})


router.get('/userRole', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ role: req.session.user.role });
  } else {
    // if not logged in, assume guest
    res.json({ role: 'guest' });
  }
});


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err)
            return res.status(500).send("Error logging out")
        }
        return res.redirect('/index.html')
    })
})

module.exports = router
