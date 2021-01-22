const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res) => {
  res.send('Hello');
});

router.post('/', (req, res, next) => {
  console.log('req.body', req.body);
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  try {
    const page = await Page.create({
      title: title,
      content: content
    });


    // res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
