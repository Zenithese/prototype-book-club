import './session_book.css'
import React, { useState } from 'react';
import Cover from './cover';
import Page from './page';
import BackCover from './back_cover';

export default function SessionBook() {

    const [sessionOpen, setSessionOpen] = useState(false)
    const [position, setPosition] = useState(0)
    const [bookClosed, setBookClosed] = useState(false)
    const [defaultZ, setDefaultZ] = useState(0)

    return (
        <div className={sessionOpen ? `session-cover session-cover-open ${bookClosed ? "back-of-book" : ""}` : "session-cover"}>
            <BackCover position={position} setPosition={setPosition} setBookClosed={setBookClosed} pageNum={6} defaultZ={defaultZ} setDefaultZ={setDefaultZ} />
            <Page position={position} setPosition={setPosition} pageNum={4} defaultZ={defaultZ} setDefaultZ={setDefaultZ} />
            <Cover position={position} setPosition={setPosition} setSessionOpen={setSessionOpen} defaultZ={defaultZ} setDefaultZ={setDefaultZ} />
        </div>
    )
}