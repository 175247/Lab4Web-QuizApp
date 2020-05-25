import React, { Component } from "react"
import quizData from "../data/quizData"
import Question from "./Question"

class Quiz extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            isCorrectAnswer: false,
            score: 0,
            questionData: [],//this.fetchData,//quizData,
            quizComplete: false,
            message: ""
        }
        this.handleAnswerSelection = this.handleAnswerSelection.bind(this)
    }

    //fetchData() {
    //    fetch("localhost:3000/https://localhost:questions/all")
    //        .then(response => response.json())
    //        .then(data =>
    //            this.setState({ questionData: data }))
    //}
    handleAnswerSelection(question, answer) {
        if (answer === question.correctAnswer) {
            this.setState({
                isCorrectAnswer: true
            })
            this.loadQuestion()
        } else {
            // THIS DOES NOT WORK!
            //return (
            //    <div>
            //        <h1>Derp out! 300 points! Not.</h1>
            //    </div>
            //)
        }
    }

    componentDidMount() {
        //this.setState({
        //    questionData: quizData
        //})
        fetch('question')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    message: data
                }));
    }

    loadQuestion() {
        if (this.state.index === this.state.questionData.length - 1) {
            return (
                //<p>DISPLAY SCORE</p>
                this.setState({
                    quizComplete: true
                })
            )
        } else {
            this.setState(previousState => ({
                index: previousState.index + 1,
                isCorrectAnswer: false
            }))
        }
    }

    render() {
        let index = this.state.index
        let data = this.state.questionData[index]
        let content = this.state.message
        //let content = this.state.quizComplete ? <p>Well done, bitch!</p>
        //    : <Question
        //        question={data}
        //        handler={this.handleAnswerSelection}
        //    />

        return (
            <div>
                {content}
            </div>
            //<Question data={this.state.questionData[this.state.index]} />
        )
    }

}

export default Quiz