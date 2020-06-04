import React, { Component } from "react"
import Question from "./Question"
import ScoreBoard from './ScoreBoard'
//import authService from './api-authorization/AuthorizeService'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      invalidAnswer: false,
      isCorrectAnswer: false,
      score: 0,
      questionData: props.questions,
      token: props.token,
      user: props.user,
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

  //async getUserData() {
  //  const token = await authService.getAccessToken();
  //  const user = await authService.getUser();
  //  this.setState({
  //    user: user,
  //    token: token
  //  });
  //}

  //async loadQuestion() {
  loadQuestion() {
    //await this.getUserData();
    if (this.state.index === this.state.questionData.length - 1) {
      this.setState(previousState => ({
        quizComplete: true,
        score: previousState.score + 1
      }))
      this.submitScore()
    } else {
      this.setState(previousState => ({
        index: previousState.index + 1,
        score: previousState.score + 1,
        isCorrectAnswer: false,
        invalidAnswer: false
      }))
    }
  }

  async submitScore() {
    let scoreData = [this.state.score, this.state.user.sub]
    await fetch('highscore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scoreData)
    })
    //.then(response => response.JSON())
    this.renderScore()
  }

  renderScore() {
    return (
      <div>
        <p>Well done! You scored a total of {this.state.score}!</p>
        <ScoreBoard
          user={this.state.user}
          score={this.state.score}
        />
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
