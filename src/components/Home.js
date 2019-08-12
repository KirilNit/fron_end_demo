import React, {Component} from 'react'
import {withStyles} from "@material-ui/core";
import universalContent from "../styles/universalContent.module.scss"


const styles = theme => (
    {
        rooted:{
            position:'absolute'
        }
    }
);


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    render(){
        return(
            <div className={'rooted'}>
                <div className={universalContent.headerContent}>
                    <p id={'home-logo'}>This is my demo UI for my `fullstack` project.
                    Don't bother Yourself with detailed revision of this UI =)</p>
                </div>
            </div>
        )
    }
}

export default withStyles(styles) (Home);