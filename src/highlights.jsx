import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHighlights } from './actions/highlights_actions'

const mapStateToProps = ({ entities }) => {
    return {
        highlights: entities.highlights
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHighlights: () => dispatch(fetchHighlights())
    }
}

function Highlights({ highlights, fetchHighlights }) {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetchHighlights();
    }, [])

    const highlightList = highlights.length ? (
        highlights.map(({ cfiRange, rendition, text }, i) => {
            return (
                <div className="annotation" key={i}>
                    <a href={`#${cfiRange}`} onClick={() => rendition.display(cfiRange)}>Go to:</a>
                    <br/>
                    "{text}"
                    <br/>
                    <textarea></textarea>
                    <a href={`#${cfiRange}`} onClick={() => { rendition.annotations.remove(cfiRange, "highlight"); return false; }}>remove</a>
                </div>
            )
        })
    ) : (
            <p>no highlights</p >
    )

    return (
        <div className={toggle ? "annotations-opened" : "annotations-closed"} >
            <span className="annotations-button" onClick={() => setToggle(!toggle)}>{toggle ? "close" : "open"}</span>
            <ul className={toggle ? "highlight-list-opened" : "highlight-lilst-closed"}>
                {highlightList}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);