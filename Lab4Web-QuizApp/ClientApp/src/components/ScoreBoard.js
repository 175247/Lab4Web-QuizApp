import React, { Component } from 'react'

class ScoreBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            highScores: [],
            isScoreExists: false
        }
    }

    async fetchScore() {
        await fetch('highscore')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    highScores: data,
                    isScoreExists: true
                })
            })
    }

    renderScores() {
        return (
            <div className="border p-3 mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Score Id:</th>
                            <th>Submitted:</th>
                            <th>Score:</th>
                            <th>Username:</th>
                        </tr>
                        {this.state.highScores.map(entrance =>
                            <tr key={entrance.Id}>
                                <td>{entrance.DateSubmitted}</td>
                                <td>{entrance.Score}</td>
                                <td>{entrance.User}</td>
                            </tr>
                        )}
                    </thead>
                </table>
            </div>
        )
    }

    renderNoScore() {
        return (
            <div>
                <h1>No scores submitted</h1>
            </div>
        )
    }

    render() {
        let content = this.state.isScoreExists ?
            this.renderScores() : this.renderNoScore()

        return (
            { content }
        )
    }
}

export default ScoreBoard