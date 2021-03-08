const express = require('express');
const mognodb = require('mongodb');
// const MongoClient = mognodb.MongoClient;

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
	const posts = await loadPostCollection();
	res.send(await posts.find({}).toArray());
});

// Add posts

router.post('/', async (req, res) => {
	const posts = await loadPostCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date(),
	});
	res.status(201).send();
});

// Delete post

router.delete('/:id', async (req, res) => {
	const posts = await loadPostCollection();
	await posts.deleteOne({ _id: new mognodb.ObjectID(req.params.id) });
	res.status(200).send();
});

const uri =
	'mongodb+srv://vue_full_stack:21101986@testdb.bkqth.mongodb.net/vue_express?retryWrites=true&w=majority';

async function loadPostCollection() {
	const client = await mognodb.MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client.db('vue_express').collection('posts');
}
module.exports = router;
