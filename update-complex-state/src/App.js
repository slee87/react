import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

// this is now a stateless function
// in other words, not declared as a class
const InstructorItem = props => {
  return (
    <li>
      <h3>{props.name}</h3>
      <h4>
        Hobbies: {props.hobbies.join(", ")}
      </h4>
    </li>
  );
}

// proptypes now comes after InstructorItem 
// stateless functions mean we can't use "static" in them
InstructorItem.propTypes = {
  name: PropTypes.string,
  hobbies: PropTypes.arrayOf(PropTypes.string)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };
    
    setTimeout(() => {
      // generate random indexes
      const randInstIndex = Math.floor(Math.random() * this.state.instructors.length);
      const randHobbyIndex = Math.floor(Math.random() * this.state.instructors[randInstIndex].hobbies.length);
      
      // make a copy of the original array (remember, mapping returns a new array)
      const instructors = this.state.instructors.map((inst, i) => {
        if (i === randInstIndex) { 
          return { 
            ...inst,
            hobbies: inst.hobbies.filter((elem, i) => elem[i] !== elem[randHobbyIndex])
          };
        }
        return inst;
      });
      
      this.setState({instructors});
      
    }, 5000);
    
  }
  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <InstructorItem
        key={index}
        name={instructor.name}
        hobbies={instructor.hobbies}
      />
    ));
    return (
      <div className="App">
        <ul>
          {instructors}
        </ul>
      </div>
    );
  }
}

export default App;