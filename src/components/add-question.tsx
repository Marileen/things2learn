import * as React from "react";
import {questionService} from "../services/question-service";

interface IProps {
    visible : boolean;
}

export class AddQuestion extends React.Component<IProps, any> {

    componentWillMount() {         //wenn komponente benötigt und initialisiert wird

        this.state = {
            newQuestion : null,
            newAnswer : null,
            showSaved : false
        };
    }

    setQuestion(e) {
        this.setState({
            newQuestion : e.target.value
        })
    }

    setAnswer(e) {
        this.setState({
            newAnswer : e.target.value
        })
    }

    addNewQuestionToBaqend (e) {

        e.preventDefault();

        this.setState({
            showSaved : false
        });

        questionService.setNewQuestion(this.state.newQuestion, this.state.newAnswer).then(() => {
            //zeige gespeichert Hinweis und leere Textfelder
            this.setState({
                newQuestion : "",
                newAnswer : "",
                showSaved : true
            });

        });
        //this.props.visible = false;

    }

    render() {

        if (!this.props.visible) {
            return <div></div>
        }

        return (
            <div data-component="add-question">

                <form>

                    <label htmlFor="question">
                        Frage:<br/>
                        <textarea type="text" name="question" value={this.state.newQuestion} onChange={this.setQuestion.bind(this)}>
                            </textarea>
                    </label>

                    <label htmlFor="answer">
                        Antwort:<br/>
                        <textarea type="text" name="answer" value={this.state.newAnswer} onChange={this.setAnswer.bind(this)}>
                            </textarea>
                    </label>

                    <span className={ "info " +  (this.state.showInfo ? "show" : "")}>GESPEICHERT</span>
                    <button onClick={this.addNewQuestionToBaqend.bind(this)}>zur DB hinzufügen</button>
                </form>

                <div className="description">
                    <p>
                        Du kannst so viele Fragen hintereinander eintragen wie du magst, achte
                        darauf, dass oben die richtige Kategorie (das entsprechende Modul) ausgwählt ist.
                    </p>
                    <p>
                        Ist beim Eintragen von Fragen und Antworten etwas schief gelaufen, oder
                        findest du Fragen oder Antworten bei denen etwas nicht stimmt, dann musst du
                        Marileen kontaktieren!
                    </p>
                </div>


            </div>
        )

    }
}
