import React, { Component } from 'react';
// import logo from './logo.svg';
import RecipeList from './RecipeList';
// import Recipe from './Recipe';
import Navbar from './Navbar';
import RecipeInput from './RecipeInput';
import './RecipeApp.css';

class RecipeApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [
                {
                    id: 0,
                    title: "Spaghetti",
                    instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
                    ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
                    img: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8a40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2b8540cd27de99909ddb6905532be4f&auto=format&fit=crop&w=928&q=80"
                },
                {
                    id: 1,
                    title: "Milkshake",
                    instructions: "Combine ice cream and milk.  Blend until creamy",
                    ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
                    img: "https://images.unsplash.com/photo-1514919224949-507c703a3a88?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed697daf694d0ffcb11b8d0ac16b4484&auto=format&fit=crop&w=634&q=80"
                },
                {
                    id: 2,
                    title: "Avocado Toast",
                    instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
                    ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
                    img: "https://images.unsplash.com/photo-1505575156881-dd15ae275636?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=beb1d1d068c68fc2bd2c25151947b3ff&auto=format&fit=crop&w=676&q=80"
                }
            ],
            nextRecipeId: 3,
            showForm: false
        }
        
        this.handleSave = this.handleSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        
    }
    
    handleSave(recipe) {
        this.setState((prevState, props) => {
            const newRecipe = {...recipe, id: this.state.nextRecipeId}; // new recipe is the recipe data passed + the next recipe id
            return {
                nextRecipeId: prevState.nextRecipeId + 1, // increment Id by one
                recipes: [...this.state.recipes, newRecipe], // update the recipes array by adding the new recipe
                showForm: false // hide the form
            }
        });
    }
    
    onDelete(id) {
        const recipes = this.state.recipes.filter((r => r.id !== id));
        this.setState({recipes});
    }
    
    render() {
        const {showForm} = this.state;
        return (
            <div className="App">
                <Navbar 
                    onNewRecipe={() => this.setState({showForm: !showForm})}
                />
                { showForm ? 
                    <RecipeInput 
                        onSave={this.handleSave}
                        onClose={() => this.setState({showForm: false})} 
                    />
                : null }
                <RecipeList 
                    recipes={this.state.recipes}
                    onDelete={this.onDelete}
                />
            </div>
        );
    }
}

export default RecipeApp;
