import React, { Component } from 'react';
import SearchBooksInput from './SearchBooksInput';
import { Link } from 'react-router-dom';
import Book from './Book'

class SearchBooks extends Component {
    render() {
        const { onSearch, books, searchBooks, onMove } = this.props;
        const updatedBooks = searchBooks.map(book => {
            books.map(b => {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                }
                return b;
            });
            return book;
        });
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <SearchBooksInput onSearch={onSearch} />
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {updatedBooks.map(book => (
                            <Book
                                key={book.id}
                                book={book}
                                shelf={book.shelf ? book.shelf : 'none'}
                                onMove={onMove}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchBooks;