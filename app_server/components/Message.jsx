const React = require('react');
class Message extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editMessage: false,
            msg: this.props.message.msg
        }
        this.handleDeleteButton=this.handleDeleteButton.bind(this);
        this.handleEditButton=this.handleEditButton.bind(this);
        this.handleCancelButton=this.handleCancelButton.bind(this);
        this.handleSaveButton=this.handleSaveButton.bind(this);
        this.handleEditText=this.handleEditText.bind(this);
       // console.log("Message props user = " + this.props.currentUser + "props name = " + this.props.message.name);
    }

    handleDeleteButton(){
        console.log("handleDeleteButton _id = " + this.props.message._id);
        this.props.deleteMsg(this.props.message);
    }
    handleEditButton() {
        console.log("handleEditButton _id = " + this.props.message._id);
        this.setState({
            editMessage: true
        });
    }
    handleCancelButton() {
        console.log("handleCancelButton _id = ");
        this.setState({
            editMessage: false
        });
    }
    handleSaveButton() {
        console.log("handleSaveButton _id = " + this.props.message._id);
        let messageCopy = Object.assign(this.props.message);
        messageCopy.msg = this.state.msg;

        this.props.editMsg(messageCopy);
        this.setState({
            editMessage: false
        });
    }
    handleEditText(event) {
        this.setState({
            msg: event.target.value
        });
    }
    render(){
        if(this.props.currentUser.username == this.props.message.name && !this.state.editMessage){ // users message
            return(
                <tr id={this.props._id}>
                             <td>{this.props.index+1}</td>
                             <td>{this.props.message.name}</td>
                             <td>{this.props.message.msg}</td>
                             <td><button className="btn btn-secondary" onClick={this.handleDeleteButton}>Remove</button></td>
                             <td><button className="btn btn-secondary" onClick={this.handleEditButton}>Edit</button></td>
                 </tr>
            );
        }else if(this.props.currentUser.username == this.props.message.name && this.state.editMessage){ // when edit clicked
            return(
                <tr id={this.props._id}>
                             <td>{this.props.index+1}</td>
                             <td>{this.props.message.name}</td>
                             <td><input id="message" type="text" className="form-control" 
                        placeholder="Your Msg" 
                        onChange={this.handleEditText}
                        />
                            </td>
                             <td><button className="btn btn-secondary" onClick={this.handleCancelButton}>Cancel</button></td>
                             <td><button className="btn btn-secondary" onClick={this.handleSaveButton}>Save</button></td>
                 </tr>
            );
        }
        else{ // other users message
            return(
                <tr id={this.props._id}>
                                <td>{this.props.index+1}</td>
                                <td>{this.props.message.name}</td>
                                <td>{this.props.message.msg}</td>
                                <td></td>
                                <td></td>
                    </tr>
            );
        }
    }
}

module.exports = Message;