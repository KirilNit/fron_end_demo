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
            notes:[],
            form:{'name':'Some Name', 'note':'143'}
        };
    };

    componentDidMount(){
        this.getNotes()
    }

    getNotes = () => {
        api.get('http://127.0.0.1:5000/postnotes').getNote().then((resp)=>{this.setState({notes:resp})});
        console.log('Current notes' + this.state.notes)

    };

    fillForm = (e) => {
        console.log('changeValue');
        e.stopPropagation();
        let tempform = Object.assign({},this.state.form);

        tempform[e.target.name]=e.target.value;
        this.setState({form:tempform});
        console.log(this.state.form)
    };

    sendNote = () => {
        let payload = JSON.stringify(this.state.form);
        api.post('http://127.0.0.1:5000/postnotes', payload).postNote()
            .then(resp => {
                console.log(resp);
                this.getNotes()
            })
            .catch(err=>{console.log(err)})
    };

    render(){
        return(
            <div className={'rooted'}>
                <p>This is Notes Page</p>
                <div>
                    <input
                        type={'name'}
                        name={'name'}
                        onChange={e=>this.fillForm(e)}
                    />
                    <input
                        type={'note'}
                        name={'note'}
                        onChange={e=>this.fillForm(e)}
                    />
                    <button onClick={()=>this.sendNote()}>Save Note</button>
                </div>
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