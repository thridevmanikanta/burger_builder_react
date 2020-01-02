import React, { Component } from 'react';
import Aux from '../hoc/Auxiliary/Auxiliary';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 10,
    bacon: 20,
    meat: 25,
    cheese: 15
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-3dev.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            });
    }

    updatePurchasableStateHandler(price) {
        this.setState({
            purchasable: price > 40
        });
    }

    addIngredientHandler = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        const newIngredientCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingredient] = newIngredientCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[ingredient];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchasableStateHandler(newPrice);
    }

    removeIngredientHandler = (ingredient) => {
        const newIngredientCount = this.state.ingredients[ingredient] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingredient] = newIngredientCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredient];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasableStateHandler(newPrice);
    }

    updatePurchasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let ingredient in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredient) + "=" + encodeURIComponent(this.state.ingredients[ingredient]));
        }
        queryParams.push('totalPrice=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push(
            {
                pathname: '/checkout',
                search: '?' + queryString
            }
        );
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded;-(</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    orderClicked={this.updatePurchasingHandler} />
            </Aux>);
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                continueClicked={this.purchaseContinueHandler}
                cancelClicked={this.purchaseCancelHandler}
                price={this.state.totalPrice}>
            </OrderSummary>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);