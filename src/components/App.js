import React, {Component} from 'react';
import '../App.css';
import Home from './Home'
import appStyles from '../styles/appStyles.module.scss'
import {withStyles} from "@material-ui/core";
import Notes from "./Notes";



class App extends Component {

    constructor(proos){
        super(proos);
        this.state = {
            navigation:''
        }
    }

    renderContent(props){
        const {navigation} = this.state;
        switch (navigation) {
            default:
                return <Home/>;
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
                        <span id={'navHome'} onClick={()=>this.handleNavigation('home')} className={appStyles.textNavigation}>Home</span>
                        <span id={'navNotes'} onClick={()=>this.handleNavigation('notes')} className={appStyles.textNavigation}>Notes</span>
                    </div>
                    {this.renderContent()}
                </div>
            </div>
    );
    }
}

export default withStyles(appStyles) (App);
