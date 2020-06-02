import React, { Component } from "react"
import Question from "./Question"
import ScoreBoard from './ScoreBoard'

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
    this.renderScore = this.renderScore.bind(this)
  }

  handleAnswerSelection(selectedAnswer) {
    if (selectedAnswer.isCorrectAnswer === true) {
      this.setState({
        isCorrectAnswer: true,
        invalidAnswer: false,
      });
      this.loadQuestion();
    } else {
      this.setState({
        invalidAnswer: true,
      });
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
        score: previousState.score + 1,
        isCorrectAnswer: false,
        invalidAnswer: false
      }))
    }
  }

  renderScore() {
    return (
      <div>
        <p>Well done! You scored a total of {this.state.score}!</p>
        <ScoreBoard />
      </div>
    )
  }

  render() {
    let index = this.state.index
    let data = this.state.questionData[index]

    let content = this.state.quizComplete ?
      this.renderScore() : <Question
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

export default Quiz;
