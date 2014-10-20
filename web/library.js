"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function Library() {
}
// TOGETHER!
Library.prototype.all = function(buzzer) {
	var allBooks = [];

 	db.query("SELECT * FROM books;", [], function(err, resultSet){
  	if (err) console.log("QUERY FAILED", err);
    resultSet.rows.forEach(function(row){
    	var aBook = new Book(row.title, row.author, row.id);
 			console.log(aBook);
 			allBooks.push(aBook);
    });
    buzzer(allBooks);
	});
};

Library.prototype.add = function(title, author, buzzer) {
	// TODO
	// db.query... INSERT
	// call buzzer with the new book
  db.query("INSERT INTO books (title, author) VALUES ($1, $2);", [title, author], function(err, resultSet){
    if (err) console.log("QUERY FAILED", err);

    buzzer();
  });
};

Library.prototype.destroy = function(id, buzzer) {
	// TODO
	db.query("DELETE FROM BOOKS WHERE id = $1", [id] , function(err, resultSet){
	   if (err) console.log("QUERY FAILED", err);

    buzzer();
  });
};

Library.prototype.update = function(id, title, author, buzzer) {
  db.query("UPDATE books SET title = $1, author = $2 WHERE id = $3", [title,author,id], function(err,resultSet){
    if (err) console.log("QUERY FAILED", err);
    buzzer();
  });
};

Library.prototype.findById = function(id, buzzer) {
  var foundBook = {}
  db.query("SELECT * FROM books WHERE id=$1",[id], function(err,resultSet){
    if(err) console.log("OOPS, something went wrong", err);
    foundBook = resultSet.rows[0];
    buzzer(foundBook);
  });
};

module.exports = Library;
