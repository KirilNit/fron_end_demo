import React, {Component} from 'react';
import '../App.css';
import Home from './Home'
import appStyles from '../styles/appStyles.scss'
import {withStyles} from "@material-ui/core";
import Notes from "./Notes";


class App extends Component {

    constructor(proos){
        super(proos);
        this.state = {
            navigation:'notes'
        }
    }

    renderContent(props){
        const {navigation} = this.state;
        switch (navigation) {
            case 'home':
                return <Home/>;
            case 'notes':
                return <Notes/>
        }
    }

    handleNavigation(props){
        console.log('Navigating to ' + props);
        this.setState({navigation:props})
    }


    render(){
        return (
            <div className={appStyles.app}>
                <div>
                    <div className={appStyles.mainDiv}>
                        <span id={'navHome'} onClick={()=>this.handleNavigation('home')}>Home</span>
                        <span id={'navNotes'} onClick={()=>this.handleNavigation('notes')}>Notes</span>
                    </div>
                    {this.renderContent()}
                </div>
            </div>
    );
    }
}

export default withStyles(appStyles) (App);
