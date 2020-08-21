import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, createBook } from '../actions/books_actions'

const mapStateToProps = ({ entities }) => {
    return {
        books: entities.books
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooks: () => dispatch(fetchBooks()),
        createBook: (book) => dispatch(createBook(book)),
    };
};

function Books({ fetchBooks, createBook, books }) {

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks])

    const handleClick = (url) => {
        createBook(url)
    }

    const booksList = 
        books.length ? 
            books.map((book) => {
                return (
                    <div className="book-container" key={book.id}>
                        <Link className="book-link" to={`${book.epubFile}`} onClick={() => handleClick(book)} >
                            <img className="book-image" src={book.image}/>
                            <br/>
                            <div className="book-title">{book.title}</div>
                        </Link>
                    </div>
                ) 
            }) 
            :
            null;

    return (
        <div className="book-list-container">{booksList}</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)