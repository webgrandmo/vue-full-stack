const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server started on port ${port}`));
