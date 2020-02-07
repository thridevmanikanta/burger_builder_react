import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value}
            />
            break;

        default:
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;