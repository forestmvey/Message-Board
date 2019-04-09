const MsgList = require('./MsgList.jsx');
const React = require('react');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');
const Registration = require('../../client_side/Registration.jsx');

class MsgBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            loginForm: true,
            loginAttempts: 3,
            loginFail: false,
            userCredentials: {
                email: '',
                password: ''
            },
            adminId: "5ca66886bb86f43eb02d7df9",
            currentUser: "",
            registrationForm: false, 
            registrationFail: false
        }
        this.addMessage = this.addMessage.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.editMsg = this.editMsg.bind(this);
        this.handleHTTPErrors = this.handleHTTPErrors.bind(this);
        this.deleteAllMsgs = this.deleteAllMsgs.bind(this);
        this.deleteMsg = this.deleteMsg.bind(this);
    }
    
    register() {
        this.setState({
            registrationForm: true
        });
    }

    addNewUser(userDetails) {
        fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        .then(response=> {
            if(response.status === 201) {
                //User successfully registered
                // disable the Registration Form
                this.setState({
                    registrationForm: false,
                    registrationFail: false
                });
            }else {
                // Some Error or User already exists
                this.setState({
                    registrationFail: true
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(userCredentials) {

        // userCredentials is passed in from Login Component
        // For Basic Authentication it is username:password (but we're using email)
        const basicString = userCredentials.email + ':' + userCredentials.password;

        fetch(`${process.env.API_URL}/users/login`, {
            METHOD: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(basicString)
            },
        })
        .then(response=> {
            // No more login attempts, throw an error
            if( this.state.loginAttempts === 0) throw 'locked out';
    
            // OK response, credentials accepted
            if(response.status === 200) {
                this.setState({
                    userCredentials: userCredentials,
                    loginForm: false,
                    loginFail: false,
                });
                return response;
                
            }else {
                // Credentials are wrong
                this.setState((state) => {
                    return ({
                        loginFail: true,
                        loginAttempts: state.loginAttempts -1
                    });
                });
            }
        })
        .then(result => result.json())
        .then(result=> {
            this.setState({
                currentUser: result
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
    addMessage(message) {
        const basicString = this.state.userCredentials.email + ':' 
        + this.state.userCredentials.password;

       fetch(`${process.env.API_URL}/msgs`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + btoa(basicString),
           },
           body: JSON.stringify(message)
        })
        .then(response=> this.handleHTTPErrors(response))
        .then(result => result.json() )
        .then(result => {
            this.setState({
                messages: [result].concat(this.state.messages)
            });
        })
        .catch(error=> {
            console.log(error);
        });
       }

       deleteMsg(message) {

        const basicString = this.state.userCredentials.email + ':' 
        + this.state.userCredentials.password;

           console.log("delete message success call messageId = " + message._id);
           fetch(`${process.env.API_URL}/msgs/`+message._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString),
            },
        })
         .then(response => this.handleHTTPErrors(response))
         .then(result => result.json() )
         .then(result => {
            var messageCopy = Object.assign(this.state.messages);
            messageCopy = messageCopy.filter(message => message._id !== result._id);
            this.setState({
                messages: messageCopy
            });
         })
        .catch(error => {
            console.log(error);
        });
    }

       deleteAllMsgs() {
        //console.log("delete all message success call");
        const basicString = this.state.userCredentials.email + ':' 
        + this.state.userCredentials.password;
        var messageCopy = Object.assign(this.state.messages);
        messageCopy.splice(0),

           fetch(`${process.env.API_URL}/msgs`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString),
            },
        })
         .then(response => this.handleHTTPErrors(response))
         .then(result => result.json() )
         .then(
            this.setState({
                messages: messageCopy
            })
        )
        .catch(error => {
            console.log(error);
        });

       }



       editMsg(message) {
        console.log(message._id);
        const basicString = this.state.userCredentials.email + ':' 
        + this.state.userCredentials.password;

           fetch(`${process.env.API_URL}/msgs/`+message._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString),
            },
           body: JSON.stringify(message)
         })
         .then(response=> this.handleHTTPErrors(response))
         .then(result => result.json() )
         .then(result => {
            console.log(result);
         })
         .catch(error=> {
             console.log(error);
         });
           
       }


    handleHTTPErrors(response) {
        if(!response.ok) throw Error(response.status + 
        ': ' + response.statusText);
        return response;
    }
    componentDidMount() {
        fetch(`${process.env.API_URL}/msgs`)
        .then(response=> this.handleHTTPErrors(response))
        .then(response=> response.json())
        .then(result=> {
            this.setState({
                messages: result
            });
        })
        .catch(error=> {
            console.log(error);
        });
    }
    render(){
        let form;
        let deleteAllButton;
        if(this.state.adminId == this.state.currentUser._id){
           deleteAllButton=<button className="btn btn-secondary" onClick={this.deleteAllMsgs}>Delete All Messages</button>
        }

        if(this.state.registrationForm) {
            let failedRegistration;

            if (this.state.registrationFail) {
                failedRegistration = 
                <p className="text-danger">User already Registered or Registration Error.</p>
            }

            return (
                <div>
                    <Registration registerNewUserCallback={this.addNewUser}/>
                    {failedRegistration}
                </div>
            );
        }else{

            if(this.state.loginForm) {
                form = <Login registerCallback={this.register}
                loginCallback={this.login}
                loginFail={this.state.loginFail}
                loginAttempts={this.state.loginAttempts}
                />
            }else {
                form = <NewMsg addMsgCallback={this.addMessage} currentUser={this.state.currentUser.username} />
            }
            return (
                <div>
                {form}
                {deleteAllButton}
                <MsgList messages={this.state.messages} adminId={this.state.adminId} currentUser={this.state.currentUser} editMsgCallback={this.editMsg} deleteMsgCallback={this.deleteMsg} />
                </div>
                );
        }
    }
}

module.exports = MsgBoard;