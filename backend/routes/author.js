const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Author = require('../models/author');

let filename = '';

const mystorage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + '-' + file.mimetype.split('/')[1];
    redirect(null, fl);
    filename = fl;
  }
});

const upload = multer({ storage: mystorage });

router.post('/register', upload.any('image'), (req, res) => {
  let data = req.body;
  let author = new Author(data);

  // Check if author with the same email already exists
  Author.findOne({ email: author.email })
    .then((existingAuthor) => {
      if (existingAuthor) {
        // Author already exists
        res.status(409).send({ message: 'Author already exists' });
      } else {
        // Set the author's image to the uploaded filename
        author.image = filename;

        let salt = bcrypt.genSaltSync(10);
        author.password = bcrypt.hashSync(author.password, salt);

        // Use the secret key from environment variables
        let secretKey = process.env.SECRET_KEY;

        // Check if secretKey exists
        if (!secretKey) {
          res.status(500).send({ message: 'Secret key not found' });
          return;
        }

        // Generate a token for the author
        let token = jwt.sign(author.toJSON(), secretKey, { expiresIn: '1h' });

        author.save()
          .then((saved) => {
            filename = '';
            res.status(200).send({ message: 'Author saved', token: token });
          })
          .catch((err) => {
            res.status(400).send({ message: 'Error saving author' });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error checking author existence' });
    });
});

router.post('/login', (req, res) => {
  let data = req.body;
  Author.findOne({ email: data.email })
    .then((author) => {
      if (author) {
        let check = bcrypt.compareSync(data.password, author.password);
        if (check) {
          let payload = {
            _id: author._id,
            email: author.email,
            fullname: author.name + ' ' + author.lastname,
          };

          // Use the secret key from environment variables
          let secretKey = process.env.SECRET_KEY;

          // Check if secretKey exists
          if (!secretKey) {
            res.status(500).send({ message: 'Secret key not found' });
            return;
          }

          // Generate a token for the author
          let token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

          res.status(200).send({ message: 'Login successful', token: token });
        } else {
          res.status(401).send({ message: 'Invalid credentials' });
        }
      } else {
        res.status(401).send({ message: 'Email not found' });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error logging in' });
    });
});


router.get('/all', (req, res) => {
  Author.find()
    .then((authors) => {
      res.status(200).send(authors);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error getting authors' });
    });
});

router.get('/getbyid/:id', (req, res) => {
  let id = req.params.id;
  Author.findById(id)
    .then((author) => {
      res.status(200).send(author);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error getting author' });
    });
});

router.get('/getFullName/:id', (req, res) => {
  let id = req.params.id;
  Author.findById(id)
    .select('name lastname')
    .exec()
    .then((author) => {
      if (author) {
        res.status(200).send({ name: author.name, lastname: author.lastname });
      } else {
        res.status(404).send({ message: 'Author not found' });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error getting author' });
    });
});

router.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  Author.findByIdAndDelete(id)
    .then((author) => {
      res.status(200).send({ message: 'Author deleted' });
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error deleting author' });
    });
});

module.exports = router;
