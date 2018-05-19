import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  
  componentDidMount() {
    const items = 'https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json';
    
    // get top stories
    fetch(items)
      .then(data => data.json())
      .then(data => {
        let items = data.items;
        this.setState({items});
      })
  }
  
  render() {
    let views = <div>Loading...</div>;
    const {items} = this.state;
    if (items && items.length > 0) {
      views = items.map(item => (
        <p key={item.id}>
          <strong><a href={item.url}>{item.title}</a></strong> from {item.city}, {item.state}
        </p>
      ))
    }
    
    return (
      <div className="App">
        <h2>LOC</h2>
        {views}
      </div>
    );
  }
}

export default App;
