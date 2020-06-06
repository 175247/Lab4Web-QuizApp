import React, { Component } from "react";
import PropTypes from "prop-types";
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
      token: {},
      isUserAnAdmin: false,
      user: {},
      renderMethod: [],
    };
    this.fetchQuizData = this.fetchQuizData.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

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
  }

  async checkUserRole() {
    await this.getUserData();
    const { token, user } = this.state;

    if (user == null) {
      return(
        <p>Login to continue.</p>
      )
    }

    if (user != null) {
      await fetch('database', {
        method: 'GET',
        headers: !token ?
          {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        //body: JSON.stringify(user.sub)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            this.setState({
              isUserAnAdmin: true
            })
            
          } else {
            this.setState({
              isUserAnAdmin: false
            })
          }
        })
      this.fetchQuizData();
      
    }
  }

  async fetchQuizData() {
    //try
    //{
      await fetch('questions', {
        method: 'GET',
        headers: !this.state.token ?
        {} : { 'Authorization': `Bearer ${this.state.token}`, 'Content-type': 'application/json' }
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
    //}
    //catch{
    //  alert("Database emptied, seeded database again. If you want to remove all the seeded questions then you need to add another one first")
    //  this.seedDatabase()
    //}
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

  renderForbidden() {
    return (
        <p>You don't have access to this page</p>
    )
  }

  async componentDidMount() {
    await this.checkUserRole();
  }

  
  render() {
    let adminCheckResult = this.state.isUserAnAdmin ? this.state.renderMethod : this.renderForbidden()
    return (
      <div>
        {adminCheckResult}
      </div>
    );
  }

}
AdminPage.propTypes = {
  submitNewQuestion: PropTypes.func.isRequired,
};

export default AdminPage;
