import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBook';
import { Route } from 'react-router-dom';
import BooksList from './BooksList';

const bookshelvesTitles = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: []
  }

  // get all my books 
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books: books })
      })
      .catch(err => {
        console.log(err);
      });
  }

  // search for books 
  searchForBooks = (val) => {
    if (val.length > 0) {
      BooksAPI.search(val).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        }
        else {
          this.setState({ searchBooks: books });
        }
      })
    }
    else {
      this.setState({ searchBooks: [] });
    }
  }

  // book move 
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(error => {
      console.log(error);
    })
    if (shelf === 'none') {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
  }

  render() {
 const { books, searchBooks}=this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList
           bookshelvesTitles={bookshelvesTitles} 
           books={books}
           onMove={this.moveBook}
           />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
          searchBooks={searchBooks}
          books={books}
          onMove={this.moveBook}
          onSearch={this.searchForBooks} />
        )} />
      </div>
    );
  }
}

export default BooksApp
