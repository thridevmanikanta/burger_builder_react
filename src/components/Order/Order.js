import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            ingredientName: ingredientName,
            quantity: props.ingredients[ingredientName]
        });
    }
    const ingredientsOutput = ingredients.map(ingredient => {
        return <span
            key={ingredient.ingredientName}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ingredient.ingredientName} ({ingredient.quantity})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price:<strong>₹ {props.totalPrice}</strong></p>
        </div>
    );
};

export default Order;