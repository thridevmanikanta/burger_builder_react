import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    drawerToggleClickedHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } }
        )
    }

    render() {
        return (
            <Aux>
                <SideDrawer
                    showBackdrop={this.state.showSideDrawer}
                    sideDrawerClosed={this.sideDrawerClosedHandler}
                />
                <Toolbar
                    drawerToggleClicked={this.drawerToggleClickedHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>);
    }
}

export default layout;