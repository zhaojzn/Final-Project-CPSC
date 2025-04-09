const express = require('express');
const router = express.Router();
const util = require('../models/util.js');
const mongodb = require('mongodb');

router.get('/topMovies', async (req, res) => {
  const client = util.getMongoClient(false);
  try {
    await client.connect();
    const db = client.db();
    const postsCollection = db.collection('Posts');
    const topMovies = await postsCollection.find({})
      .sort({ Rating: -1 })
      .limit(10)
      .toArray();
    res.status(200).json(topMovies);
  } catch (error) {
    console.error("Error fetching top movies:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.close();
  }
});

module.exports = router;
