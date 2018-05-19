import React, { Component } from 'react';
// import logo from './logo.svg';
import Navbar from './Navbar';
import Card from './Card';
import './App.css';

// define card states
const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

// shuffle function
// from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class App extends Component {
  constructor(props) {
    super(props)

    
    // initial cards array
    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      { id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      { id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      { id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      { id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      { id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      { id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      { id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      { id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      { id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      { id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      { id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      { id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      { id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      { id: 14, cardState: CardState.HIDING, backgroundColor: 'steelblue'},
      { id: 15, cardState: CardState.HIDING, backgroundColor: 'steelblue'},
    ];

    // set state
    // shuffle cards
    this.state = { cards: shuffle(cards), noClick: false }
    
    // bind functions
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

  handleNewGame() {
    // get all cards, reset all to hiding
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }));
    
    // shuffle the cards
    cards = shuffle(cards);
    
    //reset state
    this.setState({cards})
  }

  handleClick(id) {
    // function to take the array of cards, 
    // the ids of the cards to change, and the new state to change the cards to
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }
    
    // get the card we want from the array
    const foundCard = this.state.cards.find(c => c.id === id);
    
    // if card is already showing, don't do anything to it
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    
    // otherwise...
    let noClick = false;
    
    // get a list of all the cards
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    
    // get list of cards that are showing
    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);
    
    // get ids of the cards that are showing
    const ids = showingCards.map(c => c.id);
    
    // if two cards are showing, and their colors match, set both cards to matching
    if (showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING)
    } 
    
    // otherwise, set them back to hiding
    else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      // disable clicking
      noClick = true;
      
      // set state to show first, and then after a few seconds hide
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // after 1.5 seconds set cards to hiding
          this.setState({cards: hidingCards, noClick: false});
        }, 1500)
      });
      return;
    }
   
    // setState below is only reached in two cases:
    // one card is showing that's not matched
    // or two cards are showing that do match
    this.setState({cards, noClick}); 
  }
  
  render() {
    const cards = this.state.cards.map((card) => (
      <Card 
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ))
    
    return (
      <div className="App">
        <Navbar onNewGame={this.handleNewGame} />
        {cards}
      </div>
    );
  }
}

export default App;
