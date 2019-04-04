const React = require('react');
class Message extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteButton=this.handleDeleteButton.bind(this);
       // console.log("Message props user = " + this.props.currentUser + "props name = " + this.props.message.name);
    }

    handleDeleteButton(){
        console.log("handleDeleteButton _id = " + this.props.message._id);
        this.props.deleteMsg(this.props.message._id);
    }
    render(){
        if(this.props.currentUser == this.props.message.name){
            return(
                <tr id={this.props._id}>
                             <td>{this.props.index+1}</td>
                             <td>{this.props.message.name}</td>
                             <td>{this.props.message.msg}</td>
                             <button onClick={this.handleDeleteButton}>click</button>
                 </tr>
            );
        }else{
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