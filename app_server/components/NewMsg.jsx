const React = require('react');

class NewMsg extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            msg: ""
        }
        this.handleText = this.handleText.bind(this);
        this.addMessage = this.addMessage.bind(this);

    }
    handleText(event) {
            this.setState({
                msg: event.target.value
            });
    }
    addMessage(event) {
        event.preventDefault();

        // save state vars to local
        let name = this.props.currentUser;
        let msg = this.state.msg;

        // make sure neither field is empty
        if(!name || !msg) {
            return console.error('Name and/or Msg cannot be empty');
        }

        // trim any whitespace
        name = name.trim(); msg = msg.trim();

        // Pass control to MsgBoard so it can make the API Call and update message
        this.props.addMsgCallback({ name: name, msg: msg });
    }
    render() {
        return (
            <form onSubmit={this.addMessage}>
            <div className="form-group">
                <div className="row">
                <label htmlFor="msg"
                className="col-7 col-form-label">
                Enter Message:
                </label>
                </div>
                <div className="row">
                    <div className="col-7">
                        <input id="msg" type="text" className="form-control" 
                        placeholder="Your Message" value={this.state.msg}
                        onChange={this.handleText}
                        />
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary">
                        Post
                        </button>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}

module.exports = NewMsg;