import React, { Component } from "react";
import Question from "./Question";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      invalidAnswer: false,
      isCorrectAnswer: false,
      //            isLoading: true,
      score: 0,
      questionData: [],
      quizComplete: false,
      message: "",
      seedStatus: "",
      playable: false,
    };
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
    this.seedDatabase = this.seedDatabase.bind(this);
    // this.renderQuiz = this.renderQuiz.bind(this)
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

  // componentDidMount() {
  //     this.fetchData();
  // }

  async fetchData() {
    await fetch("questions", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          questionData: data,
          //                    isLoading: false
        });
      });
  }

  async seedDatabase() {
    await fetch("database", {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            seedStatus: data.description,
          });
        } else {
          this.setState({
            seedStatus: data.description,
          });
        }
      });
  }

  loadQuestion() {
    if (this.state.index === this.state.questionData.length - 1) {
      return (
        //<p>DISPLAY SCORE</p>
        this.setState({
          quizComplete: true,
        })
      );
    } else {
      this.setState((previousState) => ({
        index: previousState.index + 1,
        isCorrectAnswer: false,
        invalidAnswer: false,
      }));
    }
  }

  render() {
    let index = this.state.index;
    let data = this.state.questionData[index];

    let content = this.state.quizComplete ? (
      <p>Well done, bitch!</p>
    ) : (
      <Question question={data} handler={this.handleAnswerSelection} />
    );
    //let loadingCheck = this.state.isLoading ? <h1>Loading... hold tight!</h1> : content
    let loadingCheck =
      this.state.questionData.length < 1 ? (
        <h1>Loading... hold tight!</h1>
      ) : (
        content
      );

    let answerStatus = this.state.invalidAnswer ? (
      <h1>Damn son, wrong answer...</h1>
    ) : null;

    return (
      <div>
        {loadingCheck}
        {answerStatus}
      </div>
    );
  }
}

export default Quiz;
