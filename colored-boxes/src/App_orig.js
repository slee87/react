import React, { Component } from 'react';
// import PropTypes from 'prop-types;'
import './App.css';

// stateless function for rendering boxes
const ColorBox = props => {
  return (
    <div 
      className="box" 
      style={{background: props.background}} // assign background color via style
    />
  );
};

// proptypes
// ColorBox.propTypes = {
//   bgColor: PropTypes.string
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: []
    };
    
    // function to generate random rgb
    const generateNewColor = () => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    };
    
    // push 32 boxes into the boxes array
    // generate new color for each one
    for (var i = 0; i < 32; i++) {
      let color = generateNewColor();
      this.state.boxes.push({bgColor: color});
    }
    
    setInterval(() => {
      //generate random index and new random color
      const randIndex = Math.floor(Math.random() * this.state.boxes.length);
      const newColor = generateNewColor();
      
      // make copy of the original boxes array
      // remember, map creates a new array
      const boxes = this.state.boxes.map((box, i) => {
        // if the box's index matches the randomly created index...
        // change the box's "bgColor"
        if (i === randIndex) {
          return {
            bgColor: newColor
          };
        }
        
        // otherwise, just return the same box
        return box;
      });
      
      // update state
      this.setState({boxes});
      
    }, 300);
    
  }
  render() {
    const boxes = this.state.boxes.map((box, i) => (
      <ColorBox
        key={i}
        background={box.bgColor} // pass the box's color as background
      />
    ));
    return (
      <div className="App">
        {boxes}
      </div>
    );
  }
}

export default App;
