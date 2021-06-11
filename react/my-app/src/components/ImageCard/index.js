import React from 'react';
import './style.css';
import ProgressiveImage from 'react-progressive-image';
//import Loading from './components/Loading';

class ImageCard extends React.Component {
    renderPlaceHolder = () => {
        return (
            <div style={{
                height: 300,
                backgroundColor: 'grey'}}>
                
            </div>
        )
    }
    render() {
        const { src, title, alt='logo' } = this.props;
        return (
            <div className="container">
                <div className="image-card row">
                    <div className="col-12 col-md-3">
                        <ProgressiveImage src={src} placeholder="tiny-image.jpg">
                            {(src, loading) => {
                                return loading ? this.renderPlaceHolder() : <img src={src} alt={alt}/>;
                                
                            }}
                        </ProgressiveImage>
                    </div>
                    <div className="d-flex align-self-center">
                        <div>{title}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageCard;