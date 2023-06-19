const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const multer = require('multer');


filename ='' ; 
const mystorage = multer.diskStorage({
    
    destination: './uploads',
    filename: (req, file, redirect) => {
    let date =  Date.now();
    let fl = date + '-' + file.mimetype.split('/')[1];
    redirect(null, fl);  
    filename = fl;  
}
});

const upload = multer({storage: mystorage});


router.post('/add', upload.any('image'), (req, res) => {
    let data = req.body;
    let article = new Article(data);
    article.date = new Date();
    article.image = filename;
    article.tags = data.tags.split(','); // Assign the tags to the article object
    article
      .save()
      .then((saved) => {
        filename = '';
        res.status(200).send({ message: 'Article saved' });
      })
      .catch((err) => {
        res.status(400).send({ message: 'Error saving article' });
      });
  });

router.get('/all', (req, res) => {
    Article.find()
    .then((articles) => {
        res.status(200).send(articles);
    }
    )
    .catch((err) => {
        res.status(400).send({message: 'Error getting articles'});
    }
    );
});

router.get('/getbyid/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
        res.status(200).send(article);
    }
    )
    .catch((err) => {
        res.status(400).send({message: 'Error getting article'});
    }
    );
});

router.get('/getbyidauthor/:id', (req, res) => {
    Article.find({ idAuthor: req.params.id }) // Querying articles with idAuthor matching req.params.id
      .then((articles) => {
        res.status(200).send(articles); // Sending successful response with retrieved articles
      })
      .catch((err) => {
        res.status(400).send({ message: 'Error getting articles' }); // Sending error response if there's an error
      });
  });

router.delete('/delete/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
    .then((article) => {
        res.status(200).send({message: 'Article deleted'});
    }
    )
    .catch((err) => {
        res.status(400).send({message: 'Error deleting article'});
    }
    );
});

router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id;
    let data = req.body;
    data.tags = data.tags.split(',');
  
    if (filename.length > 0) {
      data.image = filename;
    }
  
    Article.findByIdAndUpdate(id, data)
      .then((article) => {
        filename = '';
        res.status(200).send({ message: 'Article updated' });
      })
      .catch((err) => {
        res.status(400).send({ message: 'Error updating article' });
      });
  });
  



module.exports = router;