import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
        .map(ingredient =>
            <li key={ingredient}>
                <span style={{ textTransform: 'capitalize' }}>{ingredient}:</span> {props.ingredients[ingredient]}
            </li>
        )

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>Ingredients you've selected:</p>
            <ul>
                {orderSummary}
            </ul>
            <p><strong>Total price: ₹ {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                buttonType='Success'
                onClick={props.continueClicked}>CONTINUE
            </Button>
            <Button
                buttonType='Danger'
                onClick={props.cancelClicked}>CANCEL
            </Button>
        </Aux >
    );
}

export default OrderSummary;