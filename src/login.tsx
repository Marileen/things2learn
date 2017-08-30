import * as React from "react";
import * as ReactDOM from "react-dom";
import { loginService } from "./services/login-service";
import start from "./main";

declare var DB: any;

class Login extends React.Component<any,any> {

    constructor () {
        super();
        DB.connect("things2learn");
    }

    componentWillMount () {
        this.state = {
            pwVal    : "",
            loading  :  true
        }

        loginService.checkLogin("").then(() => {
            start();
        }, (e) => {
            this.setState({
                loading : false
            });
        });


    }

    handlePWChange (e) {
        this.setState({
            pwVal : e.target.value
        });

    }

    handleSubmit (e) {
        e.preventDefault();
        console.log('login button pressed');

        console.log(this.state.pwVal);

        loginService.checkLogin(this.state.pwVal).then(() => {
            console.log("login ok");
            start();
        }, (e) => {
            console.error(e);
        })
    }

    render () {

        if (this.state.loading) {
            return <div className="loading">loading ...</div>
        }
        return (
                <div className="main">
                    <p>Bitte gib das Passwort ein, dass du von Marileen bekommen hast oder erfragen kannst</p>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input type="password" id="pw" value={this.state.pwVal} onChange={this.handlePWChange.bind(this)} />
                        <button type="submit">
                            Los geht's
                        </button>
                    </form>
                </div>
        )
    }

}
ReactDOM.render(<Login />, document.getElementById('app'));
