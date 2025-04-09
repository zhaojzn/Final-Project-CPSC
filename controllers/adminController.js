const express = require('express')
const router = express.Router()
const util = require('../models/util.js')
const config = require("../server/config/config")
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId





router.delete('/posts/:id', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const postId = req.params.id;
  const client = util.getMongoClient(false);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('Posts').deleteOne({ _id: new ObjectId(postId) });
    if (result.deletedCount === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  } finally {
    client.close();
  }
});


router.get('/users', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const client = util.getMongoClient(false);
    try {
      await client.connect();
      const db = client.db();
      const users = await db.collection('users').find({}).toArray();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.close();
    }
  });
  
  router.put('/users/:id', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const { id } = req.params;
    const { role } = req.body;
    const client = util.getMongoClient(false);
    const mongodb = require('mongodb');
    try {
      await client.connect();
      const db = client.db();
      const result = await db.collection('users').updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { role: role } }
      );
      if (result.modifiedCount === 1) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.close();
    }
  });
  

module.exports = router
