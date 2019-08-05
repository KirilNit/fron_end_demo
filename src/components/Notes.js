import React, {Component} from 'react'
import {withStyles} from "@material-ui/core";
import api from "../middleware/api"


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
            notes:[]
        };
    };

    componentDidMount(){
        this.getNotes()
    }

    getNotes = () => {
        api.get('http://127.0.0.1:5000/postnotes').getNote().then((resp)=>{this.setState({notes:resp})});
        console.log('Current notes' + this.state.notes)

    };

    render(){
        return(
            <div className={'rooted'}>
                <p>This is Notes Page</p>
                <div>{this.state.notes.map(
                    (item, index) => {
                        return(
                            <div key={index}>
                                {Object.keys(item).map(
                                    (itemInner, index) => {
                                        return (
                                            <div key={index}>
                                                <p>{itemInner}: {item[itemInner]}</p>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        )
                    }
                )}</div>
            </div>
        )
    }
}

export default withStyles(styles) (Notes);