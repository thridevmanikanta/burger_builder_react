import React, { Component } from 'react';
import classes from '../ContactData/ContactData.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        mobile: '',
        email: '',
        address: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Luke Skywalker',
                address: {
                    street: 'Star street',
                    city: 'Star city'
                },
                mobile: '9000000000'
            },
            deliveryMethod: 'fast'
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your name' />
                <input className={classes.Input} type='text' name='mobile' placeholder='Your mobile number' />
                <input className={classes.Input} type='text' name='email' placeholder='Your name' />
                <input className={classes.Input} type='text' name='address' placeholder='Your address' />
                <Button buttonType='Success' onClick={this.orderHandler}>Order</Button>
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