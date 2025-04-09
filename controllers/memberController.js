const express = require('express')
const router = express.Router()
const util = require('../models/util.js')
const config = require("../server/config/config")
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

const ensureMember = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'member') {
        console.log("Access denied. Only members can create posts.")
        return res.redirect('/index.html')
    }
    next()
}

router.get('/member.html', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/index.html')
    }
    res.sendFile('member.html', { root: config.ROOT })
})





router.get('/posts', async (req, res, next) => {
    const client = util.getMongoClient(false);
    try {
        await client.connect();
        const collection = client.db().collection('Posts');
        const posts = await util.findAll(collection, {}); 
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.close();
    }
});


router.get('/post/:ID', async (req, res, next) => {
  const reviewId = req.params.ID
  const client = util.getMongoClient(false)
  try {
    await client.connect()
    const db = client.db()
    const postsCollection = db.collection('Posts')
    const review = await postsCollection.findOne({ _id: new ObjectId(reviewId) })
    if (!review) {
      return res.status(404).json({ error: "Review not found" })
    }
    res.status(200).json({ post: review })
  } catch (error) {
    console.error("Error fetching review:", error)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    client.close()
  }
})


router.post('/addPost', ensureMember, async (req, res) => {
    const { topic, message, rating } = req.body;
    const userEmail = req.session.user.email;

    const client = util.getMongoClient(false);
    try {
        await client.connect();
        const db = client.db();
        const postsCollection = db.collection('Posts');
        const post = {
            Topic: topic,
            Message: message,
            Rating: rating,
            By: userEmail,
            At: new Date().toUTCString()
        };
        await util.insertOne(postsCollection, post);
        console.log("Post added successfully with rating:", rating);
        return res.redirect('/posts.html');
    } catch (error) {
        console.error("Error adding post:", error);
        return res.redirect('/member.html');
    } finally {
        client.close();
    }
});


module.exports = router
