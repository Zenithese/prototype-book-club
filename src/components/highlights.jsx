import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHighlights, deleteHighlight } from '../actions/highlights_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faEye } from '@fortawesome/free-solid-svg-icons'
import { fetchRendition } from '../actions/rendition_actions'
import { createSettings } from '../actions/settings_actions'


const mapStateToProps = ({ entities }) => {
    return {
        highlights: entities.highlights,
        rendition: entities.rendition.rendition
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHighlights: () => dispatch(fetchHighlights()),
        deleteHighlight: (id) => dispatch(deleteHighlight(id)),
        fetchRendition: () => dispatch(fetchRendition()),
        createSettings: (color, fontSize, theme) => dispatch(createSettings(color, fontSize, theme))
    }
}


function Highlights({ highlights, fetchHighlights, deleteHighlight, rendition, fetchRendition, createSettings }) {
    const [rgba, setRgba] = useState("rgba(255,255,0, 0.3)")
    const [color, setColor] = useState("yellow")
    const [toggle, setToggle] = useState(false)
    const [visible, setVisible] = useState(false)
    const [settings, setSettings] = useState(false)
    const [fontSize, setFontSize] = useState(100)
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        fetchHighlights();
    }, [fetchHighlights])

    useEffect(() => {
        createSettings(color, fontSize, theme);
    }, [createSettings, color, fontSize, theme])

    useEffect(() => {
        fetchRendition()

        const pastHighlights = () => {
            if (highlights.length) {
                highlights.forEach(highlight => {
                    const { cfiRange } = highlight;
                    rendition.annotations.highlight(
                        cfiRange,
                        {},
                        (e) => { console.log("highlight clicked", e.target) },
                        "hl",
                        { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
                    );
                });
            }
        }

        if (rendition) pastHighlights()
    }, [rendition, fetchRendition])

    const toggleHighlights = () => {
        if (highlights.length) {
            setVisible(!visible);
            highlights.forEach(highlight => {
                const { cfiRange } = highlight;
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

    const setHighlightsColor = (color, rgba) => {
        setColor(color)
        setRgba(rgba)
        rendition.on("selected", function (cfiRange, contents) {
            rendition.annotations.remove(cfiRange, "highlight");
            rendition.annotations.highlight(
                cfiRange,
                {},
                (e) => { console.log("highlight clicked", e.target) },
                "hl",
                { "fill": color, "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
            );
            contents.window.getSelection().removeAllRanges();
        });

        rendition.themes.default({
            '::selection': {
                'background': rgba,
            },
        });

        if (highlights.length) {
            highlights.forEach(highlight => {
                const { cfiRange } = highlight;
                rendition.annotations.remove(cfiRange, "highlight");
                rendition.annotations.highlight(
                    cfiRange,
                    {},
                    (e) => { console.log("highlight clicked", e.target) },
                    "hl",
                    { "fill": color, "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
                );
            });
        };
    };

    const setTextSize = (e) => {
        setFontSize(e.target.value)
        rendition.themes.fontSize(String(fontSize) + "%");
        setHighlightsColor(color, rgba)
    }

    const setThemeColor = (theme, textColor) => {
        setTheme(theme)
        rendition.themes.default({
            'body': {
                'color': textColor,
            },
        });
    }

    const highlightList = highlights.length ? (
        highlights.map(({ id, text, cfiRange }, i) => {
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
            <div className={toggle ? settings ? "annotations-closed-for-settings" : "annotations-opened" : settings ? "annotations-closed-for-settings-opened" : "annotations-closed"} >
                <div className="annotations-buttons" onClick={() => { setToggle(!toggle); if (settings && !toggle) {setSettings(!settings)} }}>
                    <div>{toggle ? "close" : "open"}</div>
                    <br />
                </div>
                <ul className={toggle ? "highlight-list-opened" : "highlight-lilst-closed"}>
                    {highlightList}
                </ul>
            </div>
            <div className={toggle ? settings ? "toggle-button-closed-for-settings" : "toggle-button-opened" : settings ? "toggle-button-closed-for-settings" : "toggle-button"} onClick={() => { toggleHighlights() }}><FontAwesomeIcon icon={faEye} /></div>
            <div className={settings ? toggle ? "" : "settings-button-opened" : toggle ? "settings-button-closed-for-toggle" : "settings-button"} onClick={() => { if (!settings) { setSettings(!settings); if (toggle && !settings) { setToggle(!toggle) } } } }>
                <FontAwesomeIcon icon={faCog} style={{fontSize: "20px"}} onClick={() => { setSettings(!settings); if (toggle && !settings) { setToggle(!toggle) } }} />
                <div className={ settings ? "color-section" : "color-section-closed"} >
                    <div className="yellow" onClick={() => { if (settings) setHighlightsColor("yellow", "rgba(255,255,0, 0.3)") }}></div>
                    <div className="lightgreen" onClick={() => { if (settings) setHighlightsColor("lightgreen", "rgba(0, 255, 0, 0.3)")}}></div>
                    <div className="red" onClick={() => { if (settings) setHighlightsColor("red", "rgba(255, 0, 0, 0.3)") }}></div>
                    <div className="blue" onClick={() => { if (settings) setHighlightsColor("blue", "rgba(0, 0, 255, 0.3)") }}></div>
                    <div className="purple" onClick={() => { if (settings) setHighlightsColor("purple", "rgba(165, 55, 253, 0.3)") }}></div>
                </div>
                <div className="slider-container">
                    <input type="range" min={50} max={150} value={fontSize} className="text-slider" onChange={(e) => setTextSize(e)}></input>
                </div>
                <br/>
                <label className="switch" >
                    <input type="checkbox" onClick={() => theme === "light" ? setThemeColor("dark", "#999") : setThemeColor("light", "black")} />
                    <span className="slider round"></span>
                </label>    
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);