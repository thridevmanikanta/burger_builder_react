import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient + i} typeOfIngredient={ingredient} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding some ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient typeOfIngredient='bread-top'></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient typeOfIngredient='bread-bottom'></BurgerIngredient>
        </div>
    );
}
export default burger;