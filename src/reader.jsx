import React, { Component } from "react";
import { ReactReader } from "react-reader";
import { connect } from 'react-redux';
import { createHighlight } from './actions/highlights_actions'

const storage = global.localStorage || null;

const mapDispatchToProps = dispatch => {
    return {
        createHighlight: (highlight) => dispatch(createHighlight(highlight))
    };
};

class Reader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            location:
                storage && storage.getItem("epub-location")
                    ? storage.getItem("epub-location")
                    : 2,
            localFile: null,
            localName: null,
            largeText: false,
        };
        this.rendition = null;
    }

    getRendition = rendition => {
        // Set inital font-size, and add a pointer to rendition for later updates
        // const { largeText } = this.state;
        // this.rendition = rendition;
        // rendition.themes.fontSize(largeText ? "140%" : "100%");
        rendition.on("selected", function (cfiRange, contents) {
            rendition.annotations.highlight(cfiRange, {}, (e) => {
                console.log("highlight clicked", e.target);
            });
            contents.window.getSelection().removeAllRanges();

        });

        rendition.themes.default({
            '::selection': {
                'background': 'rgba(255,255,0, 0.3)'
            },
            '.epubjs-hl': {
                'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
            },
        });

        const handleHighlight = (highlight) => {
            this.props.createHighlight(highlight);
        }

        rendition.on("selected", function (cfiRange) {

            rendition.book.getRange(cfiRange).then(function (range) {
                var text;
                
                if (range) {
                    text = range.toString();

                    // let highlight = 
                    //     <li>
                    //         <a href={`#${cfiRange}`} onClick={() => rendition.display(cfiRange)}>{cfiRange}</a>
                    //         {text}
                    //         <a href={`#${cfiRange}`} onClick={() => { console.log(rendition.annotations); rendition.annotations.remove(cfiRange); return false; }}>remove</a>
                    //     </li>

                    let highlight = {
                        id: Math.random(),
                        text,
                        cfiRange,
                        rendition,
                    }

                    handleHighlight(highlight)
                }

            })

        });

    };

    onToggleFontSize = () => {
        const nextState = !this.state.largeText;
        this.setState(
            {
                largeText: nextState
            },
            () => {
                this.rendition.themes.fontSize(nextState ? "140%" : "100%");
            }
        );
    };

    onLocationChanged = location => {
        this.setState(
            {
                location
            },
            () => {
                storage && storage.setItem("epub-location", location);
            }
        );
    };

    render() {
        const { location } = this.state;
        return (
            <div style={{ position: "relative", height: "100%" }}>
                <ReactReader
                    url={"https://gerhardsletten.github.io/react-reader/files/alice.epub"}
                    title={"Alice in wonderland"}
                    location={location}
                    locationChanged={this.onLocationChanged}
                    getRendition={this.getRendition}
                />
                {/* <button style={{ position: "absolute", top: "5px", zIndex: "1"}} onClick={this.onToggleFontSize} ></button> */}
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Reader);