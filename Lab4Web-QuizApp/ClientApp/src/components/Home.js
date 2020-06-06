import React, { Component } from "react";
import authService from './api-authorization/AuthorizeService'
import apiCalls from '../helpers/ajaxCalls'

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            token: {},
            user: {},
            isUserAnAdmin: false,
            questionData: [],
            isDatabaseSeeded: false,
            isAdminSeeded: false,
        };
    }
    async componentDidMount() {
        await this.checkUserRole();
        await this.seedDatabase();
    }

    async getUserData() {
        const token = await authService.getAccessToken();
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated: isAuthenticated,
            user: user,
            token: token
        });
    }

    async checkUserRole() {
        await this.getUserData();
        if (this.state.user != null) {
            const result = await apiCalls.genericFetch("database", "GET", this.state.token)
            if (result.success === true) {
                this.setState({
                    isUserAnAdmin: true
                })
            }
        }
    }
    async fetchQuizData() {
        const result = await apiCalls.genericFetch("questions", "GET", this.state.token)
        if (result.length > 0) {
            this.setState({
                questionData: result,
                isDatabaseSeeded: true
            })
        }
    }

    async seedDatabase() {
        const { isDatabaseSeeded, isAdminSeeded, token } = this.state
        if (isDatabaseSeeded === false) {
            const result = await apiCalls.genericFetch("database", "PUT", token)
            this.setState({ seedStatus: result.description })
        }
        if (isAdminSeeded === false) {
            const result = await apiCalls.genericFetch("database", "POST", token)
            if (result.success === true) {
                this.setState({ isAdminSeeded: true })
            } else {
            }
        }

        await this.fetchQuizData()
    }

    renderInstructions() {
        return (
            <div>
                <h2>Hej Pontus!</h2>
                <ol>
                    <li>Starta appen som du nu gjort, och den kommer att försöka skapa databasen och seeda den automatiskt.
                        Gör den inte detta så får du registrera dig och navigera till Home.</li>
                    <li>Admin login:</li>
                    <ul>
                        <li>
                            Username: admin@admin.com
                        </li>
                        <li>
                            Password: Admin1½
                        </li>
                    </ul>
                    <li>Är det fortfarande inte seedat så gå till Quiz och tryck på knappen.</li>
                </ol>
            </div>
        )
    }

    render() {
        const content = this.renderInstructions()
        return (
            <div>
                {content}
            </div>
        );
    }
}
