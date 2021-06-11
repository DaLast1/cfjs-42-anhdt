import React from 'react';
import './style.css';

class Loading extends React.Component {
    render() {
        return (
            <div className="container d-flex justify-content-center">
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        )
    }
}

export default Loading;