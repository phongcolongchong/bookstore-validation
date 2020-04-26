const shortid = require('shortid');

const db = require('../db');

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value() 
  });
};

module.exports.create = (req, res) => {
  res.render('users/create');
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  
  res.render('users/update', {
    id: id
  });
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  
  db.get('users')
    .remove({ id: id })
    .write();
  
  res.redirect('/users');
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  
  let errors = [];
  
  if (!req.body.name) {
    errors.push('Name is required!');
  }
  
  if (req.body.name.length >30) {
    errors.push('The name is longer than 30 characters!');
  }
  
  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    });
    
    return;
  }
  
  db.get('users')
    .push(req.body)
    .write();
  
  res.redirect('/users');
};

module.exports.postUpdate = (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  
  db.get('users')
    .find({ id: id })
    .assign({ name: name })
    .write();
  
  res.redirect('/users');
};