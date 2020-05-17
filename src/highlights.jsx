import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHighlights, deleteHighlight } from './actions/highlights_actions'

const mapStateToProps = ({ entities }) => {
    return {
        highlights: Object.values(entities.highlights)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHighlights: () => dispatch(fetchHighlights()),
        deleteHighlight: (id) => dispatch(deleteHighlight(id))
    }
}

function Highlights({ highlights, fetchHighlights, deleteHighlight }) {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetchHighlights();
    }, [])

    const highlightList = highlights.length ? (
        highlights.map(({ id, text, cfiRange, rendition }, i) => {
            return (
                <div className="annotation" key={i}>
                    <a href={`#${cfiRange}`} onClick={() => rendition.display(cfiRange)}>Go to:</a>
                    <br/>
                    "{text}"
                    <br/>
                    <textarea></textarea>
                    <a href={`#${cfiRange}`} onClick={() => { rendition.annotations.remove(cfiRange, "highlight"); deleteHighlight(id)}}>remove</a>
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