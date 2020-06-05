import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService'

class ScoreBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            highScores: [],
            isScoreExists: false,
            token: {},
            user: {},
            isAuthenticated: false
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
        isAuthenticated ? this.fetchScore() : this.renderForbidden()
        //this.fetchScore();
    }

    componentDidMount() {
        this.getUserData();
    }

    async fetchScore() {
        await fetch('highscore', {
            method: 'GET',
            headers: !this.state.token ?
                {} : { 'Authorization': `Bearer ${this.state.token}`, 'Content-type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    this.setState({
                        highScores: data,
                        isScoreExists: true
                    })
                }
            })
            .catch(error => {
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
                        {
                            this.state.highScores.map(entrance => (
                                <tr key={entrance.id}>
                                    <td>{entrance.id}</td>
                                    <td>{entrance.dateSubmitted}</td>
                                    <td>{entrance.score}</td>
                                    <td>{entrance.username}</td>
                                    <td></td>
                                </tr>
                            ))
                        }
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

    renderForbidden() {
        return (
            <div>
                <p>Please log in to continue.</p>
            </div>
        )
    }

    render() {
        let content = this.state.isScoreExists ?
            this.renderScores() : this.renderNoScore()
        let allowedOrNot = this.state.isAuthenticated ? content : this.renderForbidden();

        return (
            <div>
                {allowedOrNot}
            </div>
        )
    }
}

export default ScoreBoard