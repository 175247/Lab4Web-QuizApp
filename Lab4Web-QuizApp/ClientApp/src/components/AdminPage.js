import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "./InlineError";
import authService from './api-authorization/AuthorizeService'
import DeleteQuestion from './DeleteQuestion'

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
      loading: false,
      errors: {},
      questionData: [],
      isDatabaseSeeded: false,
      renderOption: "list",
      token: {},
      isAuthenticated: false,
      isUserAnAdmin: false,
      user: {},
      chosenQuestion: {},
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchQuizData = this.fetchQuizData.bind(this);
    this.resetPage = this.resetPage.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      if (this.state.renderOption === "newQuestion") {
        this.props.submitNewQuestion(this.state.data);
      }
      else{
        this.props.submitQuestionChanges(this.state.data, this.state.chosenQuestion);
      }
      this.resetPage();
    }
  };

  async resetPage ()  {
    this.setState({
      renderOption: "list",
      data: {},
      errors: {}
    })
    await this.fetchQuizData();
  };

  validate = (data) => {
    const errors = {};
    if (!data.question) errors.question = "You need to enter the question";
    if (!data.answer1) errors.answer1 = "Answer nr 1 required";
    if (!data.answer2) errors.answer2 = "Answer nr 2 required";
    if (!data.answer3) errors.answer3 = "Answer nr 3 required";
    if (!data.correctAnswer)
      errors.correctAnswer = "You need to pick which answer is the correct one";
    return errors;
  };

  stateHandler = (option, questionData) => {
    this.setState({
      renderOption: option,
    })
    if(questionData === null) return
    this.setState(prevState => {
      let data = { ...prevState.data };
      data.question = questionData.questionString;
      data.answer1 = questionData.answerOptions[0].answerString;
      data.answer2 = questionData.answerOptions[1].answerString;
      data.answer3 = questionData.answerOptions[2].answerString;
      return { data };
    })
    this.setState({
      chosenQuestion: questionData,
    })
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
          console.log(data)
          this.setState({
            questionData: data,
            isDatabaseSeeded: true,
          })
        });
    }
    catch(e){
      console.log(e)
      alert("Database emptied, seeded database again. If you want to remove all the seeded questions then you need to add another one first")
      this.seedDatabase()
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

  renderQuestionForm() {
    let submitButton =  <Button  className="btn btn-primary" primary>Submit question</Button>
    if (this.state.renderOption === "edit") {
      submitButton =  <Button  className="btn btn-primary" primary>Submit changes</Button>
    }
    const { data, errors } = this.state;
    return (
      <Form onSubmit={()=> this.onSubmit()} id="main-form">
        <Form.Field error={!!errors.question}>
          <label htmlFor="question">Question:</label>
          <br />
          <input
            type="text"
            id="question"
            name="question"
            value={data.question}
            onChange={this.onChangeHandler}
          />
          {errors.question && <InlineError text={errors.question} />}
        </Form.Field>
        <Form.Field error={!!errors.answer1}>
          <label htmlFor="answer1">Answer 1:</label>
          <br />
          <input
            type="text"
            id="answer1"
            name="answer1"
            value={data.answer1}
            onChange={this.onChangeHandler}
          />
          <input
            type="radio"
            id="answer1radio"
            name="correctAnswer"
            value="answer1"
            onChange={this.onChangeHandler}
          />
          {errors.answer1 && <InlineError text={errors.answer1} />}
        </Form.Field>
        <Form.Field error={!!errors.answer2}>
          <label htmlFor="answer2">Answer 2:</label>
          <br />
          <input
            type="text"
            id="answer2"
            name="answer2"
            value={data.answer2}
            onChange={this.onChangeHandler}
          />
          <input
            type="radio"
            id="answer2radio"
            name="correctAnswer"
            value="answer2"
            onChange={this.onChangeHandler}
          />
          {errors.answer2 && <InlineError text={errors.answer2} />}
        </Form.Field>
        <Form.Field error={!!errors.answer3}>
          <label htmlFor="answer3">Answer 3:</label>
          <br />
          <input
            type="text"
            id="answer3"
            name="answer3"
            value={data.answer3}
            onChange={this.onChangeHandler}
          />
          <input
            type="radio"
            id="answer3radio"
            name="correctAnswer"
            value="answer3"
            onChange={this.onChangeHandler}
          />
          {errors.answer3 && <InlineError text={errors.answer3} />}
        </Form.Field>
        {errors.correctAnswer && <InlineError text={errors.correctAnswer} />}
        <br />
        {submitButton}
        <button  className="btn btn-primary" onClick={this.resetPage}>Back to the list</button>
      </Form>
    );
  }

  renderQuestionList() {
    if (!this.state.isDatabaseSeeded) {
      this.fetchQuizData();
    }
    const questionData = this.state.questionData;
    let questionList = questionData.map(question => (
      <li>
        {question.questionString}
        <ol>
          {question.answerOptions.map(answer =>
            <li>{answer.answerString}</li>)}
        </ol>
        <button className="btn btn-primary" onClick={() => this.stateHandler("edit", question)}>Edit</button>
        <button className="btn btn-primary" onClick={() => this.stateHandler("delete", question)}>Delete</button>
      </li>
    ))
    return (
      <ol>
        <button className="btn btn-primary" onClick={() => this.stateHandler("newQuestion", null)} >New question</button>
        {questionList}
      </ol>
    )
  }

  renderAdmin() {
    switch (this.state.renderOption) {
      case "list":
        return (this.renderQuestionList())
      case "delete":
        let question = this.state.questionData.find(question => question.id === this.state.chosenQuestion.id)
        return <DeleteQuestion question={question} resetPage={this.resetPage}/>
      default:
        return (this.renderQuestionForm())
    }
  }

  renderNormalUser() {
    return (
        <p>You don't have access to this page</p>
    )
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    let adminCheckResult = this.state.isUserAnAdmin ? this.renderAdmin() : this.renderNormalUser()
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
