import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

class SubmitNewQuestion extends Component {
  state = {
    data: {
      question: "",
      answers: {
        answer1: "",
        answer2: "",
        answer3: "",
      },
    },
    loading: false,
    errors: {},
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.question) errors.question = "Can't be blank";
    return errors;
  };

  render() {
    const { data } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label htmlFor="question">Question</label>
          <input
            type="question"
            id="question"
            name="question"
            value={data.question}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="answer1">Answer 1</label>
          <input
            type="answer1"
            id="answer1"
            name="answer1"
            value={data.answers.answer1}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="answer2">Answer 1</label>
          <input
            type="answer2"
            id="answer2"
            name="answer2"
            value={data.answers.answer2}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="answer3">Answer 1</label>
          <input
            type="answer3"
            id="answer3"
            name="answer3"
            value={data.answers.answer3}
          />
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
