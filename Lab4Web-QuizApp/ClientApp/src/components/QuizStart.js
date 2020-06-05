import React, { Component } from "react"
import authService from './api-authorization/AuthorizeService'
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
            questionData: [],
            token: {},
            isAuthenticated: false,
            isUserAnAdmin: false,
            user: {}
        }
        this.fetchQuizData = this.fetchQuizData.bind(this)
        this.seedDatabase = this.seedDatabase.bind(this)
        this.renderQuiz = this.renderQuiz.bind(this)
        this.genericHandler = this.genericHandler.bind(this)
    }

    componentDidMount() {
        this.fetchQuizData();
        this.getUserData();
        this.checkUserRole();
    }

    async getUserData() {
        const token = await authService.getAccessToken();
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated: isAuthenticated,
            user: user,
            token: token
        });
        //this.checkUserRole()
        //if (!user === null) { this.checkUserRole(); }
    }

    //async checkUserRole() {
    //    const user = this.state.user
    //    return await fetch("database", {
    //        method: "POST",
    //        headers: { "Content-type": "application/json" },
    //        body: JSON.stringify(user.sub),
    //    })
    //        .then((response) => response.json())
    //        .then((data) => {
    //            console.log(data);
    //        })
    //        .catch((error) => {
    //            console.log(error);
    //        });
    //}

    async checkUserRole() {
        const token = await authService.getAccessToken();
        const userId = this.state.user.sub
        //console.log(this.state.user)
        //console.log(userId)
        await fetch('database', {
            method: 'POST',
            headers: !token ?
                {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(userId)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        isUserAnAdmin: true
                    })
                }
            })
    }

    async fetchQuizData() {
        const token = await authService.getAccessToken();
        await fetch('questions', {
            method: 'GET',
            headers: !token ?
                {} : { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json' }
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
        const token = await authService.getAccessToken();
        await fetch('database', {
            method: 'PUT',
            headers: !token ?
                {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    seedStatus: data.description
                })
            })
        //.catch(error => {
        //    console.log(error)
        //});
        // This is for seeding the admin (empty body). If "non-empty body required" appears, comment out the "checkUserRole" function.
        //await fetch('database', {
        //    method: 'POST',
        //    headers: !token ?
        //        {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log(data)
        //    })

        this.fetchQuizData()
    }

    renderQuiz() {
        if (this.state.questionData == null) {
            this.state.renderButtons()
        }
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

        return (
            <div>
                {buttons}
            </div>
        )
    }
}

export default QuizStart