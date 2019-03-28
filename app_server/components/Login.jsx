const React = require('react');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.login = this.login.bind(this);
        this.handleText = this.handleText.bind(this);
        this.register = this.register.bind(this);
    }
    login(event) {
        event.preventDefault();

        // pass control to MsgBoard and sent
        // the email and pass the user entered
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    }
    handleText(event) {
        if(event.target.id === 'email') {
            this.setState({
                email: event.target.value
            });
        }else {
            this.setState({
                password: event.target.value
            });
        }
    }
    register(event) {
        this.props.registerCallback();
    }
    render() {
        let loginFailText;
        if(this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
            &nbsp; { this.props.loginAttempts } attempts remaining. </p>
        }
        return(

            <div className="card">
            <form onSubmit={this.login}>
            <div className="row">
                    <label htmlFor="email"
                    className="col-3 col-form-label">
                    Enter email:
                    </label>
                <label htmlFor="password"
                className="col-3 col-form-label">
                Enter Password:
                </label>
                </div>
                <div className="row">
                    <div className="col-3">
                        <input id="email" type="text" className="form-control" 
                        placeholder="Your email" value={this.state.email}
                        onChange={this.handleText}
                        />
                    </div>
                    <div className="col-3">
                        <input id="password" type="password" className="form-control" 
                        placeholder="Your Password" value={this.state.password}
                        onChange={this.handleText}
                        />
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary">
                        Login
                        </button>
                    </div>
                </div>
            </form>
            <div className="col-10">
                not registered? &nbsp;&nbsp;
                <button onClick={this.register} className="btn btn-secondary">
                Register
                </button>
                <tr>
                <td>{loginFailText}</td>
                </tr>
            </div>
        </div>
        );
    }
}

module.exports = Login;