import React, {Component} from 'react'
import {withStyles} from "@material-ui/core";
import api from "../middleware/api"
import universalContent from "../styles/universalContent.module.scss"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import notesStyles from "../styles/notesStyles.module.scss"
import IconButton from "@material-ui/core/IconButton/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";




class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notes:[],
            form:{'name':'', 'note':''},
            addNote: false
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
                this.getNotes();
                this.setState({addNote:false})
            })
            .catch(err=>{console.log(err)})
    };

    handleAddNote = () => {
        this.setState({addNote:true});
        console.log("Add Note now is " + this.state.addNote)
    };

    renderAddNote(){
        const disabled = this.state.form['name'] === '' || this.state.form['note']==='';
        return(
            this.state.addNote &&
                <div className={notesStyles.wrapper}>
                    <div className={notesStyles.inputWrapper}>
                        <div className={notesStyles.mainHeader}>
                            {this.state.edit ?
                                <p>Edit Note: {this.state.activeCard.name}</p>
                                :
                                <p id={'add-notes-modal-header'}>Add New Note</p>}
                            <IconButton aria-label="Delete"  onClick={()=>this.exit()}>
                                <Close fontSize="small"/>
                            </IconButton>
                        </div>
                        <div className={notesStyles.inputContentWrapper}>
                            {(!this.state.edit ?
                                <div className={notesStyles.inputNativeWrapper}>
                                    <form name={'name'}>
                                        <TextField
                                            className={notesStyles.childs}
                                            type={'name'}
                                            name={'name'}
                                            label={'Name'}
                                            variant="outlined"
                                            margin="normal"
                                            onChange={e=>this.fillForm(e)}
                                        />
                                    </form>
                                    <form name={'name'} typeof={'text'}>
                                        <TextField
                                            className={notesStyles.childs}
                                            variant="outlined"
                                            label={'Note'}
                                            type={'note'}
                                            name={'note'}
                                            margin="normal"
                                            onChange={e=>this.fillForm(e)}
                                        />
                                    </form>
                                </div>
                                :
                                <div className={notesStyles.inputNativeWrapper}>
                                    <form name={'name'}>
                                        <TextField
                                            className={notesStyles.childs}
                                            type={'name'}
                                            name={'name'}
                                            label={'Name'}
                                            variant="outlined"
                                            margin="normal"
                                            onChange={e=>this.fillForm(e)}
                                        />
                                    </form>
                                    <form name={'name'} typeof={'text'}>
                                        <TextField
                                            className={notesStyles.childs}
                                            variant="outlined"
                                            label={'Note'}
                                            type={'note'}
                                            name={'note'}
                                            margin="normal"
                                            onChange={e=>this.fillForm(e)}
                                        />
                                    </form>
                                </div>)}
                        <div className={notesStyles.buttonContainer}>

                            {(!disabled && <Button
                                className={notesStyles.childs}
                                onClick={() => this.sendNote()}
                                id={'save-modal'}
                            >Save Note</Button>)}
                            {(
                                disabled
                                &&
                                <Button
                                className={notesStyles.childs}
                                onClick={() => this.sendNote()}
                                disabled
                                id={'save-modal'}
                            >Save Note</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        )

    }


    render(){
        return(
            <div className={notesStyles.notesContentWrapper}>
                <div className={universalContent.headerContent}>
                    <p id={'notes-logo'}>
                        This is Notes Page
                    </p>
                </div>
                <div className={notesStyles.contentNotes}>
                    <Button
                            className={notesStyles.childs}
                            onClick={() => this.handleAddNote()}
                            id={'add-notes-button'}
                        >Add Note</Button>
                </div>
                {this.renderAddNote()}
                <div>{this.state.notes.map(
                    (item, index) => {
                        return(
                            <div key={item.id}>
                                {Object.keys(item).map(
                                    (itemInner, index) => {
                                        return (
                                            <div key={index} id={item.name}>
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

export default withStyles(universalContent) (Notes);