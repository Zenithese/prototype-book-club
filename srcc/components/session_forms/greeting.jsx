import React, { useEffect } from 'react';

const Greeting = ({ currentUser, getCurrentUser, openModal }) => {
    useEffect(() => {
        getCurrentUser();
    }, [])

    const sessionLinks = () => (
        <div className="greeting-background">
            <div className="greeting-child">
                <h1 className="">Book Club</h1>
                <div className="">
                    <div className="" style={{ cursor: 'pointer' }} onClick={() => openModal('login')}>Login</div>
                    &nbsp;or&nbsp;
                    <div className="" style={{ cursor: 'pointer' }} onClick={() => openModal('signup')}>Sign up!</div>
                </div>
            </div>
        </div>

    );

    console.log(currentUser)
    return currentUser ? null : sessionLinks();
};

export default Greeting;