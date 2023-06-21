const express = require('express');
const articleApi = require('./routes/article');
const authorApi = require('./routes/author');
const newsletterApi = require('./routes/newsletter');
const req = require('express/lib/request');
const app = express();
const cors = require('cors');
require('dotenv').config();


require('./config/connect');

app.use(cors());
app.use(express.json());
app.use('/article', articleApi);
app.use('/author', authorApi);
app.use('/newsletter', newsletterApi);
app.use('/getimage', express.static('./uploads'));


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
