import React, { useState, useEffect } from 'react';
import { AuthRoute } from '../../util/route_util';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

export default function Page({ position, setPosition, pageNum, defaultZ, setDefaultZ }) {

    const [flipped, setFlipped] = useState(false)
    const [opacity, setOpacity] = useState("1")

    useEffect(() => {
        if (!flipped) {
            setDefaultZ(pageNum)
            setTimeout(() => {
                setOpacity("1")
            }, 150)
        } else {
            setTimeout(() => {
                setOpacity("0")
            }, 150)
        }
    }, [flipped])

    const handleClick = () => {
        if (position > pageNum || position < 2) return
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
                    <div className="sticky-button-container left-sticky-margin" onClick={handleClick}>
                        <div className="left-alt"></div>
                        <div className="page-sticky-container">
                            <div className={`page-front sticky-button ${flipped ? "index" : ""}`}><span style={{float: "right", cursor: "default" }}>Signup</span></div>
                            <div className="page-back sticky-button"><span style={{ float: "left", cursor: "default" }}>Signup</span></div>
                        </div>
                        <div className="right-end"></div>
                    </div>
                </div>
                <div className="back page-color">
                    <AuthRoute exact path="/" component={LoginFormContainer} />
                </div>
                <div className="sticky-button-container abs-sticky-margin" onClick={handleClick}>
                    <div className={`abs-sticky-cover`} style={{ opacity: opacity }}></div>
                    <div className="left-alt"></div>
                    <div className="page-sticky-container">
                        <div className={`page-front sticky-button ${flipped ? "index" : ""}`}><span style={{ float: "right", cursor: "default", marginRight: "6px" }}>Login</span></div>
                        <div className="abs-back sticky-button"><div style={{ cursor: "default", transform: "rotateY(180deg)", marginLeft: "10px" }}>Login</div></div>
                    </div>
                    <div className="right-end"></div>
                </div>
            </div>
        </div>
    )
}

{/* <div className="left-arrow"></div> */ }

{/* <div className="sticky-button-container margin" onClick={handleClick}>
        <div className="tab">
            <div className={`tab-front`} style={{float: "right", opacity: flipped ? "0" : "1"}}>
                LOGIN
            </div>
            <div className={`tab-back`} style={{ float: "left", opacity: flipped ? "1" : "0"}}>
                <span style={{ float: "left", cursor: "default", marginRight: "3px", marginTop: "5px" }}>SIGNUP</span>
            </div>
        </div>
    </div> */}