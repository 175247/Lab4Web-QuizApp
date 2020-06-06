import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "./NavMenu.css";
import authService from './api-authorization/AuthorizeService'
//import AdminPage from "./AdminPage";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isAuthenticated: false,
      token: {},
      user: {},
      isUserAnAdmin: false
    };
  }

  componentDidMount() {
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
  }

  async checkUserRole() {
    await this.getUserData();
    const { token, user } = this.state;

    if (user != null) {
      await fetch('database', {
        method: 'GET',
        headers: !token ?
          {} : { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            this.setState({
              isUserAnAdmin: true
            })
          }
        })
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  renderNavbarNormal() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Lab4Web_QuizApp
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/quiz-start">
                    Quiz
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/scoreboard">
                    Scoreboard
                  </NavLink>
                </NavItem>
                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }

  renderNavbarAdmin() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Lab4Web_QuizApp
          </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/quiz-start">
                    Quiz
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/scoreboard">
                    Scoreboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/admin-page"
                  >
                    AdminPage
                </NavLink>
                </NavItem>
                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }


  render() {
    //const { isAuthenticated, isUserAnAdmin } = this.state
    const { isUserAnAdmin } = this.state


    //let isLoggedInCheck = isAuthenticated ? this.checkUserRole() : this.renderNavbarNormal()
    let content = isUserAnAdmin ? this.renderNavbarAdmin() : this.renderNavbarNormal()

    // Kolla först om man är inloggad
    //   Är man inte det, rendera LimitedNavbar
    //   Är man inloggad, kolla om man är admin
    //   Är man admin, rendera admin navbar, annars normalnavbar

    //   if (isAuthenticated){
    //     this.checkUserRole
    //   } else {
    //     this.renderLimitedNavbar()
    //   }

    return (
      <div>
        {content}
      </div>
    );
  }

}
