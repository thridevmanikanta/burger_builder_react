import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const ingredients = [
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Burger price : <strong>₹ {props.price}</strong></p>
            {ingredients.map(ingredient => {
                return <BuildControl
                    key={ingredient.label}
                    moreClicked={props.addIngredient.bind(this, ingredient.type)}
                    lessClicked={props.removeIngredient.bind(this, ingredient.type)}
                    ingredientName={ingredient.label}
                    disabledInfo={props.disabledInfo[ingredient.type]} />
            })}
            <button
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.orderClicked}>ORDER</button>
        </div>
    )
};

export default buildControls;