const express = require('express');
const mognodb = require('mongodb');
// const MongoClient = mognodb.MongoClient;

const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await loadPostCollection();
	res.send(await posts.find({}).toArray());
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
