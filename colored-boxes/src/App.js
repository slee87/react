import React, { Component } from 'react';
// import PropTypes from 'prop-types;'
import './App.css';

// specify things that don't change
// convention is to name them with ALL CAPS
const NUM_BOXES = 32;

// stateless function for rendering boxes
const ColorBox = props => {
  return (
    <div 
      className="box" 
      style={{background: props.color}} // assign background color via style
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

    // generate an array of NUM_BOXES strings randomly chosen from the default props
    // array fill method fills an array with static values
    // initial fill is blank, then we run map to apply the getRandomColor function on each element in the array
    const boxes = Array(NUM_BOXES).fill().map(() => this.getRandomColor());
    
    // alternate version where we pass the getRandomColor function as an argument instead
    // first arg changes the "this" reference, second arg turns the "this" reference back to "App"
    // const boxes = Array(NUM_BOXES).fill().map(this.getRandomColor, this); 

    // create the initial state
    this.state = {boxes};

    setInterval(() => {
      //generate random index and new random color
      const randIndex = Math.floor(Math.random() * this.state.boxes.length);
      
      // make copy of the original boxes array
      // remember, map creates a new array
      const boxes = this.state.boxes.map((box, i) => {
        // if the box's index matches the randomly created index...
        // change the box's "bgColor"
        if (i === randIndex) { return this.getRandomColor() }
        // otherwise, just return the same box
        return box;
      });
      
      // update state
      this.setState({boxes});
      
    }, 1);
  };
    
  // function to get a random color
  getRandomColor() {
    let colorIndex = Math.floor(Math.random() * this.props.allColors.length);
    return this.props.allColors[colorIndex];
  }
    
  render() {
    const boxes = this.state.boxes.map((color, i) => (
      <ColorBox
        key={i}
        color={color} // pass the box's color as background (using color as for map because it's the only value of each box element)
      />
    ));
    return (
      <div className="App">
        {boxes}
      </div>
    );
  }
}

// default props being specified here instead of static
// just because there are so many colors

App.defaultProps = {
  allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"]
};

export default App;
