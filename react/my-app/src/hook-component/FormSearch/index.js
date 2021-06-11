import React from 'react';
import axios from 'axios';
import { debounce, throttle } from 'lodash';

class FormSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            keyword: 'demo'
        }
    }

    componentDidMount() {
        window.onscroll = (ev) => {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100) {
                this.throttleScroll();
            }
        }
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    throttleScroll = throttle(() => {
        this.setState(({ offset = 0 }) => {
            return {
                offset: offset + 25
            }
        }, () => {
            this.fetchData(this.state.keyword, this.state.offset)
            // offset = (page - 1) * limit
        })
    }, 4000)
    
    timeout = null;

    fetchData = async (keyword, offset = 0) => {
        const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi`;
        
        this.props.changeLoading(true);
        const res = await axios({
            url: urlApi,
            method: 'GET',
        })
        this.props.changeLoading(false);

        const newImages = res.data.data.map(img => {
            return {
                src: img.images.downsized.url,
                alt: img.title,
                title: img.title
            }
        });

        this.props.changeDataImages(newImages, offset);
    }
    handleClick = async () => {
        const { keyword } = this.state;
        this.fetchData(keyword);
    }
    debounceFetch = debounce(() => {
        this.fetchData(this.state.keyword);
    }, 1000)
    handleChange = (event) => {
        this.setState({
            keyword: event.target.value
        }, this.debounceFetch)
    }
    render() {
        return (
            <div className="container">
                <div className="d-flex">
                    <input type="text" className="form-control"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-primary ml-1"
                            onClick={this.handleClick}>
                        Search
                    </button>
                </div>
            </div>
        )
    }
}

export default FormSearch;