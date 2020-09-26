const mongoConnect = require('./lib/db');

class Book {
    constructor(id, bookName, author, publisher, imageURL) {
        this.id = id;
        this.bookName = bookName;
        this.author = author;
        this.publisher = publisher;
        this.imageURL = imageURL;
    }


}