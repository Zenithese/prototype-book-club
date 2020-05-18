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
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        fetchHighlights();
    }, [fetchHighlights])

    const toggleHighlights = () => {
        if (highlights.length) {
            setVisible(!visible);
            highlights.forEach(highlight => {
                const { rendition, cfiRange } = highlight;
                rendition.annotations.remove(cfiRange, "highlight");
                rendition.annotations.highlight(
                    cfiRange,
                    {},
                    (e) => { console.log("highlight clicked", e.target) },
                    "hl",
                    { "fill": visible ? "yellow" : "transparent", "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
                );
            });
        };
    };

    const highlightList = highlights.length ? (
        highlights.map(({ id, text, cfiRange, rendition }, i) => {
            return (
                <div className="annotation" key={i}>
                    <a href={`#${cfiRange}`} onClick={() => rendition.display(cfiRange)}>Go to:</a>
                    <br/>
                    "{text}"
                    <br/>
                    <textarea></textarea>
                    <a href={`#${cfiRange}`} onClick={() => { console.log(rendition.annotations); rendition.annotations.remove(cfiRange, "highlight"); deleteHighlight(id)}}>remove</a>
                </div>
            )
        })
    ) : (
            <p>no highlights</p >
    )

    return (
        <div className={toggle ? "" : "annotations-container"}>
            <div className={toggle ? "annotations-opened" : "annotations-closed"} >
                <div className="annotations-buttons">
                    <span onClick={() => setToggle(!toggle)}>{toggle ? "close" : "open"}</span>
                    <br />
                    {/* <div className="inner-toggle-highlights-button" onClick={() => { toggleHighlights() }}>eye</div> */}
                </div>
                <ul className={toggle ? "highlight-list-opened" : "highlight-lilst-closed"}>
                    {highlightList}
                </ul>
            </div>
            {/* <button className="toggle-button" onClick={() => { toggleHighlights() }}></button> */}
            <div className={toggle ? "toggle-button-opened" : "toggle-button"} onClick={() => { toggleHighlights() }}>eye</div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);