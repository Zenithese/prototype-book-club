import React, { Component } from "react";
import { ReactReader } from "react-reader";
import { connect } from 'react-redux';
import { createHighlight, fetchHighlights } from '../actions/highlights_actions'
import { createRendition } from '../actions/rendition_actions'
import { fetchBook } from '../actions/books_actions'
import { fetchSettings } from '../actions/settings_actions'
import { darkTheme, lightTheme } from '../assests/reader_styles'

const storage = global.localStorage || null;

const mapDispatchToProps = dispatch => {
    return {
        createHighlight: (highlight) => dispatch(createHighlight(highlight)),
        fetchHighlights: () => dispatch(fetchHighlights()),
        createRendition: (rendition) => dispatch(createRendition(rendition)),
        fetchBook: () => dispatch(fetchBook()),
        fetchSettings: () => dispatch(fetchSettings()),
    };
};

const mapStateToProps = ({ entities }) => {
    return {
        // highlights: Object.values(entities.highlights),
        book: entities.books.book,
        theme: entities.settings.settings ? entities.settings.settings.theme : "light",
        userId: Object.keys(entities.users)[0],
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

    componentWillMount() {
        this.props.fetchBook();
        this.props.fetchSettings();
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
        
        const handleHighlight = (highlight) => {
            this.props.createHighlight(highlight);
        }

        const userId = Number(this.props.userId);
        const bookId = 5;

        rendition.on("selected", function (cfiRange) {
            
            rendition.book.getRange(cfiRange).then(function (range) {
                var text;
                if (range) {
                    text = range.toString();
                    
                    let highlight = {
                        text,
                        cfiRange,
                        userId,
                        bookId
                    }

                    handleHighlight(highlight)
                }

            })

        });

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
                    url={this.props.book.url}
                    title={this.props.book.title}
                    location={location}
                    locationChanged={this.onLocationChanged}
                    getRendition={this.getRendition}
                    styles={this.props.theme === "dark" ? darkTheme : lightTheme}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);