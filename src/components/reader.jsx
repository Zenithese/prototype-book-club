import React, { Component } from "react";
import { ReactReader } from "react-reader";
import { connect } from 'react-redux';
import { createHighlight, fetchHighlights } from '../actions/highlights_actions'
import { createRendition } from '../actions/rendition_actions'
import { fetchBook, updateBook } from '../actions/books_actions'
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
        updateBook: (id, location) => dispatch(updateBook(id, location))
    };
};

const mapStateToProps = ({ entities }) => {
    return {
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
            location: this.props.book.location,
            localFile: null,
            localName: null,
            visible: false,
            x: 0,
            y: 0,
            cfiRange: null
        };
        this.rendition = null;
        this.handleHighlight = this.handleHighlight.bind(this)
    }

    componentWillMount() {
        this.props.fetchBook();
        this.props.fetchSettings();
    }

    handleHighlight() {
        const { cfiRange } = this.state
        const { createHighlight, userId, book } = this.props
        this.rendition.book.getRange(cfiRange).then(function (range) {
            var text;
            if (range) {
                text = range.toString();
                console.log(text)

                let highlight = {
                    text,
                    cfiRange,
                    userId: Number(userId),
                    bookId: book.id
                }

                createHighlight(highlight)
            }
        })
    }

    getRendition = rendition => {
        this.rendition = rendition
        this.props.createRendition(rendition)

        const handleTooltip = (el, cfiRange) => {
            this.setState({ visible: true, x: el.x.animVal.value + 20, y: el.y.animVal.value + 30, cfiRange: cfiRange })  
        }

        rendition.on("selected", function (cfiRange, contents) {

            rendition.annotations.remove(cfiRange, "highlight");
            rendition.annotations.highlight(
                cfiRange,
                {},
                (e) => { console.log("highlight clicked", e.target) },
                `${cfiRange}`,
                { "fill": "transparent" }
            );

            handleTooltip(document.getElementsByClassName(`${cfiRange}`)[0].firstChild, cfiRange)
 
        });
    }

    onLocationChanged = location => {
        this.setState(
            {
                location
            },
            () => {
                storage && storage.setItem("epub-location", location);
            }
        );
        this.props.updateBook(this.props.book.id, this.state.location)
    };

    render() {
        const { location } = this.state;
        return (
            <div style={{ position: "relative", height: "100%" }} >
                
                <ReactReader
                    url={this.props.book.epubFile}
                    title={this.props.book.title}
                    location={location}
                    locationChanged={this.onLocationChanged}
                    getRendition={this.getRendition}
                    styles={this.props.theme === "dark" ? darkTheme : lightTheme}
                />

                { this.state.visible ? <div className="tooltip" style={{ position: "absolute", left: `${this.state.x}px`, top: `${this.state.y}px`, backgroundColor: "red", zIndex: "1" }}><span className="popuptext" onClick={ () => this.handleHighlight() }>Highlight!</span></div> : null }

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);

// getRendition = rendition => {
    //     this.rendition = rendition
    //     this.props.createRendition(rendition)
    //     // let _this = this
    //     rendition.on("selected", function (cfiRange, contents) {
    //             rendition.annotations.remove(cfiRange, "highlight");
    //             rendition.annotations.highlight(
    //                 cfiRange,
    //                 {}, 
    //                 (e) => {console.log("highlight clicked", e.target)},
    //                 `${cfiRange}`, 
    //                 { }
    //             );
    //             contents.window.getSelection().removeAllRanges();
    //     });

    //     this.handleHighlight = () => {
    //         // this.rendition.on("selected", function (cfiRange, contents) {
    //         //     rendition.annotations.remove(cfiRange, "highlight");
    //         //     rendition.annotations.highlight(
    //         //         cfiRange,
    //         //         {},
    //         //         (e) => { console.log("highlight clicked", e.target) },
    //         //         `${cfiRange}`,
    //         //         { "fill": "blue", "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
    //         //     );
    //         //     contents.window.getSelection().removeAllRanges();
    //         // });
    //     }
        
    //     // const handleHighlight = (highlight) => {
    //     //     this.props.createHighlight(highlight);
    //     // }

    //     const userId = Number(this.props.userId);
    //     const bookId = this.props.book.id;
        
    //     rendition.on("selected", function (cfiRange) {
            
    //         rendition.book.getRange(cfiRange).then(function (range) {
    //             var text;
    //             if (range) {
    //                 text = range.toString();
                    
    //                 let highlight = {
    //                     text,
    //                     cfiRange,
    //                     userId,
    //                     bookId
    //                 }

    //                 handleHighlight(highlight)
    //             }

    //         })

    //     });

    // };