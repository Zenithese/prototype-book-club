import React, { useEffect, useState, useRef } from 'react';

export default function Cover({ position, setPosition, setSessionOpen, defaultZ, setDefaultZ }) {

    const [flipped, setFlipped] = useState(false)
    const [hoverClass, setHoverClass] = useState("")
    // const [hovering, setHovering] = useState(false)
    // const [paused, setPaused] = useState(false)
    // const [coor, setCoor] = useState({x: 0, y: 0})

    const ref = useRef(null)


    // useEffect(() => {
    //     if (hovering && !paused) {
    //         const top = ref.current.getBoundingClientRect().top
    //         const bottom = ref.current.getBoundingClientRect().bottom
    //         const left = ref.current.getBoundingClientRect().left
    //         const right = ref.current.getBoundingClientRect().right
    //         if (coor.x > top && coor.x < bottom && coor.y > left && coor.y < right) {
    //             setHoverClass(flipped ? "open-hover" : "hover")
    //         }
    //     }
    // })

    const handleClick = (e) => {
        if (position > 2) return
        // setCoor({ x: e.clientX, y: e.clientY })
        setHoverClass("")
        // setPaused(true)
        // setTimeout(() => {
        //     setPaused(false)
        // }, 1000)
        setFlipped(!flipped)
        setSessionOpen(sessionOpen => !sessionOpen)
        if (!flipped) {
            setPosition(position + 2)
            setDefaultZ(2)
        } else {
            setPosition(position - 2)
        }
    };

    const handleHover = () => {
        // setHovering(true)
        setHoverClass(flipped ? "open-hover" : "hover")
    }

    const handleLeave = () => {
        // setHovering(false)
        setHoverClass("")
    }

    return (
        <div
            ref={ref}
            style={{ zIndex: flipped ? 2 : defaultZ }}
            id="cover" className={`book-box-shadow ${hoverClass} ${flipped ? "open-cover cover" : "cover"}`}
            onClick={handleClick}
            onMouseMove={handleHover}
            onMouseLeave={handleLeave}>
            <div className="front-back-container">
                <div className="front cover-color">
                    <h1>Book Club</h1>
                </div>
                <div className="back cover-color">
                    <h1>Welcome</h1>
                </div>
            </div>
        </div>
    )
}