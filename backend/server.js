const express = require('express');
const articleApi = require('./routes/article');
const authorApi = require('./routes/author');
const req = require('express/lib/request');
const app = express();
const cors = require('cors');
require('dotenv').config();


require('./config/connect');

app.use(cors());
app.use(express.json());
app.use('/article', articleApi);
app.use('/author', authorApi);
app.use('/getimage', express.static('./uploads'));


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
