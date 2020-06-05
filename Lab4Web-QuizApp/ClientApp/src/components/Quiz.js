import React, { Component } from "react"
import Question from "./Question"
import ScoreBoard from './ScoreBoard'
import authService from './api-authorization/AuthorizeService'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      invalidAnswer: false,
      isCorrectAnswer: false,
      score: 0,
      questionData: props.questions,
      token: {},
      user: {},
      quizComplete: false,
      isAuthenticated: false
    }
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this)
    this.renderScore = this.renderScore.bind(this)
  }

  async getUserData() {
    const token = await authService.getAccessToken();
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    });
  }

  componentDidMount() {
    this.getUserData()
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
      //this.submitScore()
    } else {
      this.setState(previousState => ({
        index: previousState.index + 1,
        score: previousState.score + 1,
        isCorrectAnswer: false,
        invalidAnswer: false
      }))
    }
  }

  submitScore() {
    console.log(this.state.score)
    console.log(this.state.user.sub)
    let score = this.state.score
    let userId = this.state.user.sub
    let scoreData = { score, userId }

    fetch('highscore', {
      method: 'POST',
      headers: !this.state.token ?
        {} : { 'Authorization': `Bearer ${this.state.token}`, 'Content-type': 'application/json' },
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

  renderForbidden() {
    return (
      <p>Please login to proceed.</p>
    )
  }

  render() {
    let index = this.state.index
    let data = this.state.questionData[index]

    let content = this.state.quizComplete ?
      this.submitScore() : <Question
        question={data}
        handler={this.handleAnswerSelection}
      />

    let allowedOrNot = this.state.isAuthenticated ? content : this.renderForbidden();

    let answerStatus = this.state.invalidAnswer ?
      <h1>Damn son, wrong answer...</h1> : null

    //{content}
    return (
      <div>
        {allowedOrNot}
        {answerStatus}
      </div>
    )
  }
}

export default Quiz;
