import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

class Navbar extends Component {
    static defaultProps = {
        onNewRecipe() {}
    };

    static propTypes = {
        //links: PropTypes.arrayOf(PropTypes.object).isRequired,
        onNewRecipe: PropTypes.func.isRequired
    }
    
    render() {
        return (
            <div className="nav-container">
                <div className="nav-title">
                    Recipe App
                </div>
                <nav>
                    <li><a onClick={this.props.onNewRecipe}>New Recipe</a></li>
                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact Us</a></li>
                </nav>
            </div>
        );
    }
}

export default Navbar;