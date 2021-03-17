import React, { useEffect } from 'react';
import SessionBook from './session_book'

const Greeting = ({ currentUser, getCurrentUser, openModal }) => {
    useEffect(() => {
        getCurrentUser();
    }, [])

    const sessionLinks = () => (
        <div className="greeting-background">
            <div className="greeting-child">
                <SessionBook />
            </div>
        </div>

    );

    return currentUser ? null : sessionLinks();
};

export default Greeting;