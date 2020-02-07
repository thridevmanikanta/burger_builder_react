import React, { Component } from 'react';
import classes from '../ContactData/ContactData.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            mobile: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mobile number'
                },
                value: '',
                validation: {
                    required: true,
                    length: 10,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true,
                    addressMinLength: 10,
                    addressMaxLength: 100
                },
                valid: false,
                touched: false
            },
        },
        loading: false,
        formValidity: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const formData = {};
        for (let inputElement in this.state.orderForm) {
            formData[inputElement] = this.state.orderForm[inputElement].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customerData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            }
            )
            .catch(error => {
                this.setState({
                    loading: false,
                })
            }
            );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }
        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }
        if (rules.length) {
            isValid = value.length === rules.length;
        }
        if (rules.regex) {
            isValid = value.match(rules.regex) !== null;
        }
        if (rules.addressMinLength) {
            isValid = isValid && value.length >= rules.addressMinLength;
        }
        if (rules.addressMaxLength) {
            isValid = isValid && value.length <= rules.addressMaxLength;
        }
        return isValid;
    }

    inputChangedHandler = (event, formIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...this.state.orderForm[formIdentifier]
        }
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[formIdentifier] = updatedOrderFormElement;
        let formValidity = true;
        for(let inputElement in updatedOrderForm) {
            formValidity = updatedOrderForm[inputElement].valid && formValidity;
        }
        this.setState({ orderForm: updatedOrderForm, formValidity: formValidity});
    }

    render() {
        const formElements = [];
        for (let formElement in this.state.orderForm) {
            formElements.push({
                id: formElement,
                config: this.state.orderForm[formElement]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement =>
                    <Input
                        key={formElement.id}
                        invalid={!formElement.config.valid}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />)}
                <Button disabled={!this.state.formValidity} buttonType='Success'>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;