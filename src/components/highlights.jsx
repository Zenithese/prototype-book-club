import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHighlights, deleteHighlight } from '../actions/highlights_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faEye } from '@fortawesome/free-solid-svg-icons'
import { fetchRendition } from '../actions/rendition_actions'
import { createSettings } from '../actions/settings_actions'


const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights.filter(highlight => highlight.userId === session.id && highlight.bookId === entities.books.book.id),
        rendition: entities.rendition.rendition,
        _fontSize: entities.users[session.id].fontSize,
        highlightColor: entities.users[session.id].highlightColor,
        _theme: entities.users[session.id].theme,
        id: session.id,
        book: entities.books.book
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHighlights: () => dispatch(fetchHighlights()),
        deleteHighlight: (id) => dispatch(deleteHighlight(id)),
        fetchRendition: () => dispatch(fetchRendition()),
        createSettings: (id, color, fontSize, theme) => dispatch(createSettings(id, color, fontSize, theme))
    }
}


function Highlights({ id, highlights, _fontSize, highlightColor, _theme, fetchHighlights, deleteHighlight, rendition, fetchRendition, createSettings, book }) {
    const [rgba, setRgba] = useState("rgba(255,255,0, 0.3)")
    const [color, setColor] = useState(highlightColor)
    const [toggle, setToggle] = useState(false)
    const [visible, setVisible] = useState(true)
    const [settings, setSettings] = useState(false)
    const [fontSize, setFontSize] = useState(Number(_fontSize))
    const [theme, setTheme] = useState(_theme)
    const [highlightsLength, setHighlightsLength] = useState(Infinity)

    useEffect(() => {
        fetchHighlights();
    }, [fetchHighlights])

    useEffect(() => {
        updateHighlights()
    }, [book])

    useEffect(() => {
        console.log("recycle")
    }, [visible])

    useEffect(() => {
        console.log("creating settings")
        createSettings(id, color, fontSize, theme);
        
    }, [createSettings, id, color, fontSize, theme])

    useEffect(() => {
        if (rendition && highlights.length > highlightsLength) {
            const { cfiRange } = highlights[highlights.length - 1];
            updateHighlight(cfiRange)
        }
    }, [highlights])

    useEffect(() => {
        if (rendition) rendition.themes.fontSize(String(fontSize) + "%")
        setHighlightsColor(color, rgba)
    }, [fontSize])

    useEffect(() => {
        fetchRendition()

        if (rendition) {

            // selection color, needs opacity 

            if (theme === "dark") {
                rendition.themes.default({
                    'body': {
                        'color': "#999",
                    },
                });
            }
        
            rendition.themes.fontSize(String(_fontSize) + "%");

            setTimeout(() => {
                toggleHighlights()
                setHighlightsLength(highlights.length)
            }, 1000)

        };

    }, [rendition, fetchRendition])

    const updateHighlight = (cfiRange, updateHighlightToggle = false) => {
        rendition.annotations.remove(cfiRange, "highlight");
        rendition.annotations.highlight(cfiRange, {}, null, `${cfiRange}`,
            { "fill": updateHighlightToggle ? visible ? color : "transparent" : color, "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
        );
    }

    const updateHighlights = (updateHighlightToggle = false) => {
        if (highlights.length) {
            highlights.forEach(highlight => {
                const { cfiRange } = highlight;
                rendition.annotations.remove(cfiRange, "highlight");
                rendition.annotations.highlight(cfiRange, {}, null, `${cfiRange}`,
                    { "fill": updateHighlightToggle ? visible ? color : "transparent" : color, "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
                );
            });
        };
    }

    const toggleHighlights = () => {
        if (highlights.length) {
            setVisible(!visible);
            highlights.forEach(highlight => {
                const { cfiRange } = highlight;
                updateHighlight(cfiRange, true)
            });
        };
    };

    const setHighlightsColor = (color, rgba) => {
        setColor(color)
        setRgba(rgba)

        // selection color

        if (highlights.length) {
            highlights.forEach(highlight => {
                const { cfiRange } = highlight;
                rendition.annotations.remove(cfiRange, "highlight");
                rendition.annotations.highlight(cfiRange, {}, null, `${cfiRange}`,
                    { "fill": !visible ? color : "transparent", "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
                );
            });
        };
    };

    const setTextSize = (e) => {
        setFontSize(e.target.value)
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
                    <a href={`#${cfiRange}`} onClick={() => { rendition.display(cfiRange) } }>Go to:</a>
                    <br/>
                    "{text}"
                    <br/>
                    <textarea></textarea>
                    <a href={`#${cfiRange}`} onClick={() => { console.log(rendition.annotations); rendition.annotations.remove(cfiRange, "highlight"); console.log(id); deleteHighlight(id)}}>remove</a>
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

// rendition.themes.default({
//     '::selection': {
//         'background': rgba,
//     },
// }); // selection color