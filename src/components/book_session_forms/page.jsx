import React, { useState, useEffect } from 'react';
import { AuthRoute } from '../../util/route_util';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

export default function Page({ position, setPosition, pageNum, defaultZ, setDefaultZ }) {

    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        if (!flipped) {
            setDefaultZ(pageNum)
        }
    }, [flipped])

    const handleClick = () => {
        if (position > pageNum) return
        setFlipped(!flipped)
        if (!flipped) {
            setPosition(position + 2)
        } else {
            setPosition(position - 2)
        }
    }

    return (
        <div
            id={pageNum}
            style={{ zIndex: flipped ? pageNum : defaultZ }}
            className={`book-box-shadow ${flipped ? "flipped-page page" : "page"}`}
            >
            <div className="front-back-container">
                <div className="front page-color">
                    <AuthRoute exact path="/" component={SignupFormContainer}/>
                    {/* <div className="sticky-button-container left-sticky-margin" onClick={handleClick}>
                        <div className="sticky-button">Login instead?</div>
                        <div className="right-arrow"></div>
                    </div> */}
                    <div className="sticky-button-container left-sticky-margin" onClick={handleClick}>
                        <div className="left-arrow"></div>
                        <div className="page-sticky-container">
                            <div className={`page-front sticky-button ${flipped ? "index" : ""}`}><span style={{float: "right", cursor: "default"}}>Login</span></div>
                            <div className="page-back sticky-button"><span style={{ float: "left", cursor: "default" }}>Signin</span></div>
                        </div>
                        <div className="right-arrow"></div>
                    </div>
                </div>
                <div className="back page-color">
                    <AuthRoute exact path="/" component={LoginFormContainer} />
                    {/* <div className="sticky-button-container right-sticky-margin" onClick={handleClick}>
                        <div className="left-arrow"></div>
                        <div className="sticky-button">Signin instead?</div>
                    </div> */}
                </div>
                {/* <div className="sticky-button-container outside-right-sticky" onClick={handleClick}>
                    <div className="left-arrow"></div>
                    <div className="sticky-button">Signin instead?</div>
                </div> */}
            </div>
        </div>
    )
}