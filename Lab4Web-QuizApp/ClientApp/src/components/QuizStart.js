import React, { Component } from "react"
import Quiz from './Quiz'

class QuizStart extends Component {
    constructor() {
        super()
        this.state = {
            isInitialSetup: false,
            score: 0,
            quizComplete: false,
            isDatabaseSeeded: false,
            seedStatus: "",
            isWantToPlay: false,
            questionData: []
        }
        this.fetchQuizData = this.fetchQuizData.bind(this)
        this.seedDatabase = this.seedDatabase.bind(this)
        this.renderQuiz = this.renderQuiz.bind(this)
        this.genericHandler = this.genericHandler.bind(this)
    }

    componentDidMount() {
        this.fetchQuizData();
    }

    async fetchQuizData() {
        await fetch('questions', {
            method: 'GET',
            xhrFields: { withCredentials: true }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    questionData: data,
                    isDatabaseSeeded: true,
                    isInitialSetup: true
                })
            });
    }

    async seedDatabase() {
        await fetch('database', {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    seedStatus: data.description
                })
            })
            .catch(error => {
                console.log(error)
            });

        await fetch('database', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })

        this.fetchQuizData()
    }

    renderQuiz() {
        return (
            <div>
                <Quiz
                    questions={this.state.questionData}
                    handler={this.genericHandler}
                />
            </div>
        )
    }

    genericHandler = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    renderButtons(isDatabaseSeeded) {
        let buttonName = isDatabaseSeeded ? "isWantToPlay" : "seedDatabase"
        let buttonValue = isDatabaseSeeded ? this.state.isWantToPlay : this.state.seedDatabase
        let buttonStyling = isDatabaseSeeded ? "btn btn-success" : "btn btn-danger"
        let buttonOnClick = isDatabaseSeeded ? this.genericHandler : this.seedDatabase
        let buttonText = isDatabaseSeeded ? "Play Game!" : "Seed the database"

        return (
            <div>
                <button
                    name={buttonName}
                    value={buttonValue}
                    className={buttonStyling}
                    onClick={buttonOnClick}
                >
                    {buttonText}
                </button>
            </div>
        )
    }

    render() {
        const { isWantToPlay, isDatabaseSeeded, isInitialSetup } = this.state
        let buttons = isWantToPlay ?
            this.renderQuiz() : this.renderButtons(isDatabaseSeeded)
        //let loadStatus = isInitialSetup ?
        //    buttons : <h1>Hold tight, loading all the amazeballs JUST for you!</h1>

        return (
            <div>
                {buttons}
            </div>
            //{loadStatus}
        )
    }
}

export default QuizStart