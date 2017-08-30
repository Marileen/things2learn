import * as React from "react";
import * as ReactDOM from "react-dom";
import { Navigation } from "./components/navigation";
import { Categories } from "./components/categories";
import { QuestionMaster } from "./components/question-master";
import { AddQuestion } from "./components/add-question";
import { loginService } from "./services/login-service";

class Main extends React.Component<any, any> {

    private text : string;      //Beispiel
    //private categoryList = ["KN1", "TI", "MCK"];


    componentWillMount () {
        this.state = {
            category : null,
            loggedIn    : false
        }
    }

    handleCatetegoryChange (val) {

        this.setState({
            category : val,
        })

    }

    render() {

        return (
            <div className="main">
                <h1>Was möchtest du lernen?</h1>
                
                <Categories onChange={this.handleCatetegoryChange.bind(this)} />

                <QuestionMaster category={this.state.category} />

            </div>
        )
    }
}

export default function start () {
    ReactDOM.render(<Main />, document.getElementById('app'));
}