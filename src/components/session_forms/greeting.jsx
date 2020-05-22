import React from 'react';

const Greeting = ({ currentUser, logout, openModal }) => {
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

    return currentUser ? null : sessionLinks();
};

export default Greeting;