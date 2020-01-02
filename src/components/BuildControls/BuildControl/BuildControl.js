import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.ingredientName}</div>
        <button
            className={classes.Less}
            onClick={props.lessClicked}
            disabled={props.disabledInfo}>-</button>
        <button
            className={classes.More}
            onClick={props.moreClicked}>+</button>
    </div>
);

export default buildControl;