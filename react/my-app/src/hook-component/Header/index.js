import React from 'react';
import logo from './logo-spin.gif';
import './style.css';

class Header extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                    <img src={logo} alt="logo"/>
                    <h1>Let's search</h1>
                </div>
            </div>
        )
    }
}

export default Header;