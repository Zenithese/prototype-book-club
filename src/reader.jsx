import React, { Component } from "react";
import { ReactReader } from "react-reader";
import { connect } from 'react-redux';
import { createHighlight, fetchHighlights } from './actions/highlights_actions'
import { createRendition } from './actions/rendition_actions'

const storage = global.localStorage || null;

const mapDispatchToProps = dispatch => {
    return {
        createHighlight: (highlight) => dispatch(createHighlight(highlight)),
        fetchHighlights: () => dispatch(fetchHighlights()),
        createRendition: (rendition) => dispatch(createRendition(rendition))
    };
};

const mapStateToProps = ({ entities }) => {
    return {
        highlights: Object.values(entities.highlights)
    }
}

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
        };
        this.rendition = null;
    }

    getRendition = rendition => {
        this.rendition = rendition
        this.props.createRendition(rendition)
        rendition.on("selected", function (cfiRange, contents) {
            rendition.annotations.remove(cfiRange, "highlight");
            rendition.annotations.highlight(
                cfiRange, 
                {}, 
                (e) => {console.log("highlight clicked", e.target)},
                "hl", 
                { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
            );
            contents.window.getSelection().removeAllRanges();
        });

        rendition.themes.default({
            '::selection': {
                'background': 'rgba(255,255,0, 0.3)'
            },
            // '.epubjs-hl': {
            //     'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
            // },
        });

        const handleHighlight = (highlight) => {
            this.props.createHighlight(highlight);
        }

        rendition.on("selected", function (cfiRange) {

            rendition.book.getRange(cfiRange).then(function (range) {
                var text;
                
                if (range) {
                    text = range.toString();
                    console.log(typeof cfiRange)

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
        console.log(this.state.location)
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);