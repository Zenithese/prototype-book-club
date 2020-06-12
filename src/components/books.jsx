import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createBook } from '../actions/books_actions'

const mapStateToProps = ({ entities }) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        createBook: (bookId) => dispatch(createBook(bookId)),
    };
};

function Books({ createBook }) {

    const books = [
        {
            url: "/alice.epub",
            title: "Alice in Wonderland",
            // location: location,
            // locationChanged: this.onLocationChanged,
            // getRendition: this.getRendition,
        },
        {
            url: "/karl-marx_friedrich-engels_the-communist-manifesto.epub",
            title: "Communist Manifesto",
            // location: location,
            // locationChanged: this.onLocationChanged,
            // getRendition: this.getRendition,
        }
    ]

    const handleClick = (url) => {
        createBook(url)
    }

    const booksList = 
        books.map((book, i) => {
            return (
                <div>
                    <Link to={`${book.url}`} onClick={() => handleClick(book.url)} key={i}>
                        <img style={{width:"200px"}}src="/cm.jpg"/>
                        <br/>
                        {book.title}
                    </Link>
                </div>
            )
        })

    return (
        <div>{booksList}</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)