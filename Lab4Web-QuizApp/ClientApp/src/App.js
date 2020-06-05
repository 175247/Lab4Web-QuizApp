import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import QuizStart from "./components/QuizStart";
import Quiz from "./components/Quiz";
import AdminPage from "./components/AdminPage";
import SubmitNewQuestion from "./components/SubmitNewQuestion";
import SubmitQuestionChanges from "./components/SubmitQuestionChanges"
import ScoreBoard from "./components/ScoreBoard";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <AuthorizeRoute path="/fetch-data" component={FetchData} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Route path="/quiz" component={Quiz} />
        <Route path="/scoreboard" component={ScoreBoard} />
        <Route path="/quiz-start" component={QuizStart} />
        <Route
          path="/admin-page"
          render={(props) => <AdminPage {...props} submitNewQuestion={SubmitNewQuestion} submitQuestionChanges={SubmitQuestionChanges} />}
        />
      </Layout>
    );
  }
}