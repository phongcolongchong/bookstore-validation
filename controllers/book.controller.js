const shortid = require('shortid');

const db = require('../db');

module.exports.index = (req, res) => {
  res.render('books/index', {
    books: db.get('books').value()
  });
};

module.exports.create = (req, res) => {
  res.render('books/create');
};

module.exports.update = (req, res) => {
  let id = req.params.id;

  res.render('books/update', {
    id: id
  });
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  
  db.get('books').remove({ id: id }).write();
  
  res.redirect('/books');
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  
  db.get('books')
    .push(req.body)
    .write();
  
  res.redirect('/books');
};

module.exports.postUpdate = (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  
  db.get('books')
    .find({ id: id })
    .assign({ title: title })
    .write();
  
  res.redirect('/books');
};