const React = require('react');
class Message extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editMessage: false
        }
        this.handleDeleteButton=this.handleDeleteButton.bind(this);
        this.handleEditButton=this.handleEditButton.bind(this);
        this.handleCancelButton=this.handleCancelButton.bind(this);
        this.handleSaveButton=this.handleSaveButton.bind(this);
       // console.log("Message props user = " + this.props.currentUser + "props name = " + this.props.message.name);
    }

    handleDeleteButton(){
        console.log("handleDeleteButton _id = " + this.props.message._id);
        this.props.deleteMsg(this.props.message._id);
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
        this.props.editMsg(this.props.message._id);
        this.setState({
            editMessage: false
        });
    }
    render(){
        if(this.props.currentUser.username == this.props.message.name && !this.state.editMessage){ // our message
            return(
                <tr id={this.props._id}>
                             <td>{this.props.index+1}</td>
                             <td>{this.props.message.name}</td>
                             <td>{this.props.message.msg}</td>
                             <button onClick={this.handleDeleteButton}>Remove</button>
                             <button onClick={this.handleEditButton}>Edit</button>
                 </tr>
            );
        }else if(this.props.currentUser.username == this.props.message.name && this.state.editMessage){ // when edit clicked
            return(
                <tr id={this.props._id}>
                             <td>{this.props.index+1}</td>
                             <td>{this.props.message.name}</td>
                             <td><input id="message" type="text" className="form-control" 
                        placeholder="Your Msg" value={this.props.message.msg}
                        onChange={this.handleText}
                        />
                            </td>
                             <button onClick={this.handleCancelButton}>Cancel</button>
                             <button onClick={this.handleSaveButton}>Save</button>
                 </tr>
            );
        }
        else{ // other users message
            return(
                <tr id={this.props._id}>
                                <td>{this.props.index+1}</td>
                                <td>{this.props.message.name}</td>
                                <td>{this.props.message.msg}</td>
                    </tr>
            );
        }
    }
}

module.exports = Message;