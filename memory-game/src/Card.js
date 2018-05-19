import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
    let style = {};
    
    // if card is showing, add the background color via style
    if (props.showing) {
        style.backgroundColor = props.backgroundColor;
    }
    
    return (
        <div 
            onClick={props.onClick}
            className="card-container" 
            style={style}
        />
    );
}

Card.PropTypes = {
    showing: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Card;