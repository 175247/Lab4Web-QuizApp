import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "./InlineError";

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
      isUserAnAdmin: true,
      questionData: [],
      isDatabaseSeeded: false,
      renderOption: "list",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchQuizData = this.fetchQuizData.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
      this.clearInputs()
    }
  };

  clearInputs = () => {
    this.setState({
      renderOption: "list",
      data: {},
      errors: {}
    })
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

  stateHandler = (option) => {
    this.setState({
      renderOption: option
    })
  }

  async fetchQuizData() {
    await fetch('questions', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          questionData: data,
          isDatabaseSeeded: true,
        })
      });
  }

  async deleteQuestion(id){
    await fetch('questions', {
      method: 'DELETE',
      body: id,
    })
    .then(response => response.json())
    .then(data => console.log)
  }

  renderQuestionForm() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} id="main-form">
        <Form.Field error={!!errors.question}>
          <label htmlFor="question">Question:</label>
          <br />
          <input
            type="text"
            id="question"
            name="question"
            value={data.question}
            onChange={this.onChange}
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
            onChange={this.onChange}
          />
          <input
            type="radio"
            id="answer1radio"
            name="correctAnswer"
            value="answer1"
            onChange={this.onChange}
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
            onChange={this.onChange}
          />
          <input
            type="radio"
            id="answer2radio"
            name="correctAnswer"
            value="answer2"
            onChange={this.onChange}
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
            onChange={this.onChange}
          />
          <input
            type="radio"
            id="answer3radio"
            name="correctAnswer"
            value="answer3"
            onChange={this.onChange}
          />
          {errors.answer3 && <InlineError text={errors.answer3} />}
        </Form.Field>
        {errors.correctAnswer && <InlineError text={errors.correctAnswer} />}{" "}
        <br />
        <Button primary>Submit question</Button>
        <button onClick={this.clearInputs}>Back to the list</button>
      </Form>
    );
  }

  renderQuestionList() {
    const questionData = this.state.questionData;
    if (!this.state.isDatabaseSeeded) {
      this.fetchQuizData();
    }
    console.log(questionData)
    let questionList = questionData.map(question => (
      <li>
        {question.questionString}
        <ol>
          {question.answerOptions.map(answer =>
            <li>{answer.answerString}</li>)}
        </ol>
        <button className="btn btn-primary" onClick={() => this.stateHandler("edit")}>Edit</button>
        <button className="btn btn-primary" onClick={() => this.stateHandler("delete")}>Delete</button>
      </li>
    ))
    return (
      <ol>
        <button className="btn btn-primary" onClick={() => this.stateHandler("newQuestion")} >New question</button>
        {questionList}
      </ol>
    )
  }

  renderDeleteQuestion() {
    const questionData = this.state.questionData;
    if (!this.state.isDatabaseSeeded) {
      this.fetchQuizData();
    }
    console.log(questionData)
    let questionList = questionData.map(question => (
      <li>
        {question.questionString}
        <ol>
          {question.answerOptions.map(answer =>
            <li>{answer.answerString}</li>)}
        </ol>
        <button className="btn btn-primary" onClick={() => this.deleteQuestion(answer.id)}>Delete</button>
      </li>
    ))
    return (
      <ol>
        <button className="btn btn-primary" onClick={() => this.stateHandler("newQuestion")} >New question</button>
        {questionList}
      </ol>
    )
  }

  renderAdmin() {
    switch (this.state.renderOption) {
      case "list":
        return (this.renderQuestionList())
      case "delete":
        return (this.renderDeleteQuestion())
      default:
        return (this.renderQuestionForm())
    }
  }

  renderNormalUser() {
    return (
        <p>You don't have access to this page</p>
    )
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
  submit: PropTypes.func.isRequired,
};

export default AdminPage;
