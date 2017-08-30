import * as React from "react";
import {questionService} from "../services/question-service";
import {AddQuestion} from "./add-question";
import Swipeable = require("react-swipeable");

interface IProps {
    category : any;
}

export class QuestionMaster extends React.Component<IProps, any> {

    componentWillMount() {         //wenn komponente benötigt und initialisiert wird

        this.state = {
            activeQuestion: null,
            questionNumber: 0,
            showAnswer: false,
            addNew : false,
            numberOfQuestions : 0,
            alwaysShowAnswersChecked : false
        };

    }

    componentWillReceiveProps(nextProps, nextContext) {
        questionService.setCategory(nextProps.category).then(this.handleNext.bind(this));

    }

    handleNext() {
        var nr = questionService.getQuestionNumber();

        console.log(nr);

        questionService.getNextQuestion().then((questionElem) => {
            this.setState({
                activeQuestion : questionElem,
                questionNumber : questionElem.number,
                showAnswer: false,
                numberOfQuestions : nr
            });
        });
    }

    handlePrev() {
        var nr = questionService.getQuestionNumber();

        questionService.getPrevQuestion().then((questionElem) => {
            this.setState({
                activeQuestion : questionElem,
                questionNumber : questionElem.number,
                showAnswer: false,
                numberOfQuestions : nr
            });
        });
    }

    handleShowAnswer() {

        this.setState({
            showAnswer: !this.state.showAnswer
        })
    }

    handleNewQuestion() {
       console.log('new');
       this.setState({
           addNew : true
       })

    }

    handlealwaysShowAnswersClick (e) {
        this.setState({
            alwaysShowAnswersChecked: e.target.checked
        });

    }
    handleSwipeLeft (e, delta) {

        e.currentTarget.style.transform = null;

        if (delta > 100) {
            e.currentTarget.classList.add('fade');
            questionService.getNextQuestion().then((questionElem) => {
                this.setState({
                    activeQuestion: questionElem,
                    questionNumber: questionElem.number,
                    showAnswer: false,
                });
            });
        }
    }

    handleSwipingRight (e, delta) {
        e.currentTarget.classList.remove('fade');
        e.currentTarget.style.transform = "translateX(" + delta + "px)";
    }

    handleSwipeRight (e, delta) {

        e.currentTarget.style.transform = null;

        console.log(delta);
        //if (delta > 100) {
            e.currentTarget.classList.add('fade');
            questionService.getPrevQuestion().then((questionElem) => {
                this.setState({
                    activeQuestion: questionElem,
                    questionNumber: questionElem.number,
                    showAnswer: false,
                });
            });
        //}
    }

    handleSwipingLeft (e, delta) {
        e.currentTarget.classList.remove('fade');
        e.currentTarget.style.transform = "translateX(" + -delta + "px)";
    }

    render() {

        const question = this.state.activeQuestion;

        //wenn keine cat dann nix ausgeben

        if (!this.state.activeQuestion) {
            return <div></div>
        }

        return (
            <div data-component="question-master">

                <p>Anzahl der Fragen: {this.state.numberOfQuestions}</p>
                <p className="dont-show">
                    <label>
                        Antworten immer anzeigen
                        <input type="checkbox"
                               name="alwaysShowAnswers"
                               checked={this.state.alwaysShowAnswersChecked}
                               onClick={this.handlealwaysShowAnswersClick.bind(this)}
                               value="alwaysShowAnswers"
                        />
                    </label>
                </p>
                <div className="control">
                    <button className="prev"  onClick={this.handlePrev.bind(this)}>&lt;&lt;</button>
                    <button className="next"  onClick={this.handleNext.bind(this)}>&gt;&gt;</button>
                </div>
                <Swipeable
                    onSwipedLeft={this.handleSwipeLeft.bind(this)}
                    onSwipingLeft={this.handleSwipingLeft.bind(this)}
                    onSwipedRight={this.handleSwipeRight.bind(this)}
                    onSwipingRight={this.handleSwipingRight.bind(this)}
                >
                    <p className="question">{question.q}
                        <span className="info">{this.state.questionNumber}</span>
                    </p>
                    <div className={ "answer " +  (this.state.showAnswer ? "show" : "")}>
                        <div dangerouslySetInnerHTML={ { __html: question.a } }></div>
                    </div>
                </Swipeable>

                <button onClick={this.handleShowAnswer.bind(this)} className="btn-green">zeige Antwort</button>
                <div className="control">
                    <button className="prev" onClick={this.handlePrev.bind(this)}>&lt;&lt;</button>
                    <button className="next" onClick={this.handleNext.bind(this)}>&gt;&gt;</button>
                </div>
                <button onClick={this.handleNewQuestion.bind(this)} className="btn-gray">Frage hinzufügen</button>

                <AddQuestion visible={this.state.addNew} />

            </div>
        )

    }
}
