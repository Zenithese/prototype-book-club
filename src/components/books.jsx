import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBook } from '../actions/books_actions'

const mapStateToProps = ({ entities }) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        createBook: (book) => dispatch(createBook(book)),
    };
};

function Books({ createBook }) {

    const books = [
        {
            image: "/Alice_in_Wonderland_cover.jpg",
            url: "/alice.epub",
            title: "Alice in Wonderland",
            // location: location,
        },
        {
            image: "/cm.jpg",
            url: "/karl-marx_friedrich-engels_the-communist-manifesto.epub",
            title: "Communist Manifesto",
            // location: location,
        },
        {
            image: "/frankenstein_image.jpg",
            url: "/mary-shelley_frankenstein.epub",
            title: "Frankenstein",
            // location: location,
        },
        {
            image: "/2_Cities_image.jpg",
            url: "/charles-dickens_a-tale-of-two-cities.epub",
            title: "A Tale of Two Cities",
            // location: location,
        }
    ]

    const handleClick = (url) => {
        createBook(url)
    }

    const booksList = 
        books.map((book, i) => {
            return (
                <div className="book-container">
                    <Link className="book-link" to={`${book.url}`} onClick={() => handleClick(book)} key={i}>
                        <img className="book-image" src={book.image}/>
                        <br/>
                        <div className="book-title">{book.title}</div>
                    </Link>
                </div>
            )
        })

    return (
        <div className="book-list-container">{booksList}</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)