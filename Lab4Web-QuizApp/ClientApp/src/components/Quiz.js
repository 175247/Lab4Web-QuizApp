import React, { Component } from "react"
import Question from "./Question"
import ScoreBoard from './ScoreBoard'
import authService from './api-authorization/AuthorizeService'
import apiCalls from '../helpers/ajaxCalls'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      score: 0,
      questionData: [],
      token: {},
      user: {},
      isAuthenticated: false,
      quizComplete: false
    }
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this)
    this.renderScore = this.renderScore.bind(this)
  }

  componentDidMount() {
    this.getUserData()
  }

  async getUserData() {
    const token = await authService.getAccessToken();
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    });

    await this.fetchQuizData()
  }

  async fetchQuizData() {
    const result = await apiCalls.genericFetch("questions", "GET", this.state.token)
    if (result.length > 0) {
      this.setState({
        questionData: result
      })
    }
  }

  async handleAnswerSelection(selectedAnswer) {
    if (selectedAnswer.isCorrectAnswer === true) {
      await this.setState(previousState => ({
        score: previousState.score + 1
      }));
    }

    this.loadQuestion();
  }

  loadQuestion() {
    if (this.state.index === this.state.questionData.length - 1) {
      this.submitScore();
    } else {
      this.setState(previousState => ({
        index: previousState.index + 1
      }))
    }
  }

  async submitScore() {
    let { score, user } = this.state
    let userId = user.sub
    let scoreData = { score, userId }

    await fetch('highscore', {
      method: 'POST',
      headers: !this.state.token ?
        {} : { 'Authorization': `Bearer ${this.state.token}`, 'Content-type': 'application/json' },
      body: JSON.stringify(scoreData)
    })
    this.setState({
      quizComplete: true
    })
  }

  renderScore() {
    let message = null
    this.state.score < 1 ?
      message = `Better luck next time! Score: ${this.state.score}` :
      message = `Well done! You scored a total of ${this.state.score}!`
    return (
      <div>
        <h1>{message}</h1>
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
    let content = null;
    let index = this.state.index
    let data = this.state.questionData[index]

    if (!this.state.questionData.length > 0) {
      this.fetchQuizData();
    } else {
      content = this.state.quizComplete ?
        this.renderScore() : <Question
          question={data}
          handler={this.handleAnswerSelection}
        />
    }

    let allowedOrNot = this.state.isAuthenticated ? content : this.renderForbidden();

    return (
      <div>
        {allowedOrNot}
      </div>
    )
  }
}

export default Quiz;
