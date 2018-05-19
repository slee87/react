import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

class Navbar extends Component {
    static defaultProps = {
        onNewGame() {}
    }
    
    static PropTypes = {
        onNewGame: PropTypes.func.isRequired
    }
    
    render() {
        return (
            <div className="nav-container">
                <div className="nav-title">
                    Memory Game
                </div>
                <nav>
                    <li><a onClick={this.props.onNewGame}>New Game</a></li>
                </nav>
            </div>
        );
    }
}

export default Navbar;