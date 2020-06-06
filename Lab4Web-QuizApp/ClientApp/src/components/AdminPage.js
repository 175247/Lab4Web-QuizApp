import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "./InlineError";
import authService from './api-authorization/AuthorizeService'
import DeleteQuestion from './DeleteQuestion'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correctAnswer: "",
      },
      loading: true,
      errors: {},
      questionData: [],
      isDatabaseSeeded: false,
      renderOption: "list",
      token: {},
      isAuthenticated: false,
      isUserAnAdmin: false,
      user: {},
      chosenQuestion: {},
      renderMethod: [],
    };
    this.fetchQuizData = this.fetchQuizData.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  //async resetPage ()  {
  //  this.setState({
  //    renderOption: "list",
  //    data: "",
  //    errors: {},
  //    renderMethod: <QuestionList state={this.state} stateHandler={this.stateHandler}/>
  //  })
  //  await this.fetchQuizData();
  //};

  async stateHandler(option, questionData) {
    if(questionData){
    this.setState(prevState => {
      let data = { ...prevState.data };
      data.question = questionData.questionString;
      data.answer1 = questionData.answerOptions[0].answerString;
      data.answer2 = questionData.answerOptions[1].answerString;
      data.answer3 = questionData.answerOptions[2].answerString;
      return { data };
    })}
    this.setState({
      chosenQuestion: questionData,
    })
    if (option === "delete") {
      this.setState({
        renderMethod:<DeleteQuestion question={questionData} stateHandler={this.stateHandler}/>
      })
    }
    else if(option === "list"){
      this.setState({
        renderMethod:<QuestionList state={this.state} stateHandler={this.stateHandler}/>
      })
      await this.fetchQuizData();
    }
    else {
      this.setState({
        renderMethod:<QuestionForm questionData={questionData} option={option} stateHandler={this.stateHandler}/>
      })
    }
  }
  async getUserData() {
    const token = await authService.getAccessToken();
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    });
    if (this.state.user === null) {
      return(<></>)
    }
    this.checkUserRole();
  }

  async checkUserRole() {
    //await this.getUserData();
    const token = this.state.token
    const userId = this.state.user.sub
    await fetch('database', {
      method: 'POST',
      headers: !token ?
        {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(userId)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            isUserAnAdmin: true,
          })
        }
      })
    //this.forceUpdate()
  }

  async fetchQuizData() {
    try
    {
      await fetch('questions', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            questionData: data,
            isDatabaseSeeded: true,
            loading: false,
          })
          this.setState({
          renderMethod: <QuestionList state={this.state} stateHandler={this.stateHandler}/>
          })
        });
    }
    catch(e){
      console.log(e)
      alert(e)
    }
  }
  async seedDatabase() {
    const token = await authService.getAccessToken();
    await fetch('database', {
        method: 'PUT',
        headers: !token ?
            {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
    })
    this.fetchQuizData()
}

  async renderAdmin() {
    switch (this.state.renderOption) {
      case "list":
        return<ol>
            <button className="btn btn-primary" onClick={() => this.stateHandler("newQuestion", null)} >New question</button>
            <QuestionList state={this.state} stateHandler={this.stateHandler} />
        </ol>
      case "delete":
        let question = this.state.questionData.find(question => question.id === this.state.chosenQuestion.id)
        return <DeleteQuestion question={question} resetPage={this.resetPage}/>
      default:
        return <QuestionForm state={this.state} resetPage={this.resetPage}/>
    }
  }

  renderNormalUser() {
    return (
        <p>You don't have access to this page</p>
    )
  }

  async componentDidMount() {
    this.getUserData();
    await this.fetchQuizData();
  }

  render() {
    let adminCheckResult = this.state.isUserAnAdmin ? this.renderAdmin() : this.renderNormalUser()
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>: this.state.renderMethod
    return (
      <div>
        {contents}
      </div>
    );
  }

}
AdminPage.propTypes = {
  submitNewQuestion: PropTypes.func.isRequired,
};

export default AdminPage;
