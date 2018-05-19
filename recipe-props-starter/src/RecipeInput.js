import React, { Component } from 'react';
import "./RecipeInput.css";

class RecipeInput extends Component {
    static defaultProps = {
        onClose() {},
        onSave() {}
    }
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleNewIngredient = this.handleNewIngredient.bind(this);
        this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    handleNewIngredient(e) {
        const {ingredients} = this.state; // grab the current ingredients
        this.setState({ingredients: [...ingredients, '']});
    }
    
    handleChangeIngredient(e) {
        const index = Number(e.target.name.split('-')[1]) // the id is "ingredient-index#", so we split it and make the second part a number
        const ingredients = this.state.ingredients.map((ing, i) => {
          if (i === index) { return e.target.value };
          return ing;
        })
        this.setState({ingredients});
    }
    
    handleSubmit(e) {
      e.preventDefault(); // prevent page from refreshing
      this.props.onSave({...this.state}) // pass all the values in the current state to onSave function
      
      // clear out current values
      this.setState({
        title: '',
        instructions: '',
        ingredients: [''],
        img: ''
      })
    }
    
    render() {
        // deconstructed 
        const { title, instructions, img, ingredients } = this.state;
        const onClose = this.props.onClose;
        
        let inputs = ingredients.map((ing, i) => (
            <div
                className="recipe-form-line"
                key={`ingredient-${i}`}
            >
                <label>{i + 1} {/* increment the ingredient id */ }
                    <input
                        type="text"
                        name={`ingredient-${i}`}
                        value={ing}
                        size={45}
                        autoComplete="off"
                        placeholder="ingredient"
                        onChange={this.handleChangeIngredient} />
                </label>
            </div>
        ));
    
        return (
            <div className="recipe-form-container">
                <form className='recipe-form' onSubmit={this.handleSubmit}>
                      <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                      >
                        X
                      </button>
                      <div className='recipe-form-line'>
                        <label htmlFor='recipe-title-input'>Title</label>
                        <input
                          id='recipe-title-input'
                          key='title'
                          name='title'
                          type='text'
                          value={title}
                          size={42}
                          autoComplete="off"
                          onChange={this.handleChange}/>
                      </div>
                      <label
                        htmlFor='recipe-instructions-input'
                        style={{marginTop: '5px'}}
                      >
                        Instructions
                      </label>
                      <textarea
                        key='instructions'
                        id='recipe-instructions-input'
                        type='Instructions'
                        name='instructions'
                        rows='8'
                        cols='50'
                        autoComplete='off'
                        value={instructions}
                        onChange={this.handleChange}/>
                      {inputs}
                      <button
                        type="button"
                        onClick={this.handleNewIngredient}
                        className="buttons"
                      >
                        +
                      </button>
                      <div className='recipe-form-line'>
                        <label htmlFor='recipe-img-input'>Image Url</label>
                        <input
                          id='recipe-img-input'
                          type='text'
                          placeholder=''
                          name='img'
                          value={img}
                          size={36}
                          autoComplete='off'
                          onChange={this.handleChange} />
                      </div>
                      <button
                        type="submit"
                        className="buttons"
                        style={{alignSelf: 'flex-end', marginRight: 0}}
                      >
                        SAVE
                      </button>
                </form>
            </div>
        )
        
    }
}

export default RecipeInput;