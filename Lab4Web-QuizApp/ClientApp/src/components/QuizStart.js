import React, { Component } from "react"
import Quiz from './Quiz'

class QuizStart extends Component {
    constructor() {
        super()
        this.state = {
            //            isLoading: true,
            score: 0,
            quizComplete: false,
            seedStatus: "",
        }
        this.seedDatabase = this.seedDatabase.bind(this)
        this.renderQuiz = this.renderQuiz.bind(this)
    }

    async fetchData() {
        await fetch('questions', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    questionData: data,
                })
            });
    }

    async seedDatabase() {
        await fetch('database', {
            method: 'PUT'
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        seedStatus: data.description
                    })
                } else {
                    this.setState({
                        seedStatus: data.description
                    })
                }
            });
    }

    renderQuiz() {
        return (
            <div>
                <Quiz />
            </div>
        )
    }

    render() {
        let seedButtonText = this.state.seedStatus === "" ? "Seed the database" : this.state.seedStatus

        return (
            <div>
                <Quiz />
                <button className="btn btn-primary"
                    onClick={this.seedDatabase}
                >{seedButtonText}
                </button>

                <button className="btn btn-primary"
                    onClick={this.renderQuiz}
                >Play the game!
                </button>
            </div>
        )
    }
}

export default QuizStart