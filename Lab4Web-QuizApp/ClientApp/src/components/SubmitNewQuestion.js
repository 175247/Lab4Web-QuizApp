import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

class SubmitNewQuestion extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label htmlFor="questionName">Question</label>
        </Form.Field>
        <Button primary>Submit question</Button>
      </Form>
    );
  }
}

export default SubmitNewQuestion;
