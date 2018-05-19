import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// stateless function for rendering todos
const ToDo = props => {
  return (
    <li>{props.text}</li>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newTodo: ""
    };
  }
  
  handleSubmit = e => {
    // need this to prevent the page from refreshing
    e.preventDefault(); 
        
    // get existing data array, then add the newTodo into the data array
    const data = [...this.state.data, this.state.newTodo]; 
          
    // set the state of the data array to the new one, set inputText to blank
    this.setState({data, newTodo: ""}); 
  };
  
  render() {
    // create the todo lis
    const todos = this.state.data.map((todo, i) => (
      <ToDo
        key={i}
        text={todo}
      />
    ));
    
    return (
      <div className="App">
        <h1>Simple Todo App</h1>
      
        {/* form */}
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="newTodo"
            value={this.state.newTodo}
            placeholder="Add a new todo..."
            onChange={(e) => {
              this.setState({[e.target.name]: e.target.value});
            }}
          />
          <button>SAVE</button>
        </form>
        
        {/* render todos */}
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
}

export default App;