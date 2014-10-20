"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));

// empty array for creating instances of library
var library = new Library();

//Home page
app.get('/', function(req, res){
  res.render('library/home');
});

//Index
app.get('/books', function(req, res){
  //DONE! Give us all books
  console.log("/BOOKS");
  library.all(function(leBooks){
    res.render('library/index', {allBooks: leBooks});
  });
});
// library.all has found the books and render
// buzzer help


//New
app.get('/books/new', function(req, res){
	res.render("library/new");
});


//Create
app.post('/books', function(req, res) {
  console.log("/books -> Implement me.");
    library.add(req.body.book.title, req.body.book.author, function(){
  res.redirect('library/books');
  });
});


//Show
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  library.findById(id, function(foundBook){
    res.render('library/show', {book:foundBook});
  });
});

//Edit
app.get('/books/:id/edit', function(req, res) {
  var id = req.params.id;
  library.findById(id, function(foundBook){
    res.render('library/edit', {book: foundBook});
    // how come this needs the route with library?
  });
});

//Update
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  var title = req.body.book.title;
  var author = req.body.book.author;
  //TODO
  console.log(id,title, author);
  library.update(id,title, author, function(){
  res.redirect('/books');
  });
});

//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  library.destroy(id, function(){
  res.redirect('/books');
  });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});