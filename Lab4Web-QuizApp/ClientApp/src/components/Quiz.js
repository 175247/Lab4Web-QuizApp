import React, { Component } from "react"
import Question from "./Question"

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            invalidAnswer: false,
            isCorrectAnswer: false,
            score: 0,
            questionData: props.questions,
            quizComplete: false,
        }
        this.handleAnswerSelection = this.handleAnswerSelection.bind(this)
    }

    handleAnswerSelection(selectedAnswer) {
        if (selectedAnswer.isCorrectAnswer === true) {
            this.setState({
                isCorrectAnswer: true,
                invalidAnswer: false
            })
            this.loadQuestion()
        } else {
            this.setState({
                invalidAnswer: true
            })
        }
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
                isCorrectAnswer: false,
                invalidAnswer: false
            }))
        }
    }

    render() {
        let index = this.state.index
        let data = this.state.questionData[index]

        let content = this.state.quizComplete ?
            <p>Well done, bitch!</p> : <Question
                question={data}
                handler={this.handleAnswerSelection}
            />

        let answerStatus = this.state.invalidAnswer ?
            <h1>Damn son, wrong answer...</h1> : null

        return (
            <div>
                {content}
                {answerStatus}
            </div>
        )
    }
}

export default Quiz