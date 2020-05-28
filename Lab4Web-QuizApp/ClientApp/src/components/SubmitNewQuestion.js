import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "./InlineError";

class SubmitNewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        question: "",
        correctAnswer: "",
        answer2: "",
        answer3: "",
      },
      loading: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.question) errors.question = "You need to enter the question";
    if (!data.correctAnswer)
      errors.correctAnswer = "Correct answer is required";
    if (!data.answer2) errors.answer2 = "Answer nr 2 required";
    if (!data.answer3) errors.answer3 = "Answer nr 3 required";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
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
        <Form.Field error={!!errors.correctAnswer}>
          <label htmlFor="correctAnswer">Correct Answer:</label>
          <br />
          <input
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            value={data.correctAnswer}
            onChange={this.onChange}
          />
          {errors.correctAnswer && <InlineError text={errors.correctAnswer} />}
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
          {errors.answer3 && <InlineError text={errors.answer3} />}
        </Form.Field>
        <Button primary>Submit question</Button>
      </Form>
    );
  }
}

SubmitNewQuestion.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SubmitNewQuestion;
