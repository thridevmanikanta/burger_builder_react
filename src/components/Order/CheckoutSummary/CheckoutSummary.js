import React from 'react';
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.css'
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) =>
    <div className={classes.CheckoutSummary}>
        <h2>Your delicious burger is here!</h2>
        <div style={{ width: '100%', margin: 'auto' }}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button
            buttonType="Danger"
            onClick={props.checkoutCancelled}>
            Cancel
        </Button>
        <Button
            buttonType="Success"
            onClick={props.checkoutContinued}>
            Continue
        </Button>
    </div>

export default CheckoutSummary;