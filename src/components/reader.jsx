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
            cfiRange: null,
            displayingTooltip: false,
            el: null
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
        const _this = this
        this.rendition.book.getRange(cfiRange).then(function (range) {
            var text;
            if (range) {
                text = range.toString();

                let highlight = {
                    text,
                    cfiRange,
                    userId: Number(userId),
                    bookId: book.id
                }

                createHighlight(highlight)

                _this.setState({visible: false})
            }
        })
    }

    getRendition = rendition => {

        this.rendition = rendition
        this.props.createRendition(rendition)
        const _this = this

        rendition.on("selected", function (cfiRange, contents) {

            let className = `${cfiRange}-${Math.random()}`

            rendition.annotations.remove(cfiRange, "highlight");
            
            rendition.annotations.highlight(cfiRange, {}, null, className, { "fill": "transparent" });

            _this.state.el = document.getElementsByClassName(className)[0]
           
            _this.setState({ cfiRange: cfiRange, displayingTooltip: true })

        });

        
        rendition.on("mousedown", function (event) {

            _this.setState({ visible: false, x: event.clientX, y: event.clientY })
            
        })

        rendition.on("mouseup", function (event) {

            if (_this.state.displayingTooltip) {
                
                if (event.clientX < _this.state.x) {

                    _this.setState({ visible: true, x: event.clientX + 20, y: _this.state.el.firstElementChild.y.animVal.value + 30})

                } else {

                    _this.setState({ visible: true, x: event.clientX + 20, y: _this.state.el.lastElementChild.y.animVal.value + 65 })
                    
                }

            }

            _this.setState({ displayingTooltip: false })

        })

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