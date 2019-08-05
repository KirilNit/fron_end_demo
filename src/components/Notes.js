import React, {Component} from 'react'
import {withStyles} from "@material-ui/core";


const styles = theme => (
    {
        rooted:{
            position:'absolute'
        }
    }
);


class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    render(){
        return(
            <div className={'rooted'}>
                <p>This is Notes Page</p>
            </div>
        )
    }
}

export default withStyles(styles) (Notes);