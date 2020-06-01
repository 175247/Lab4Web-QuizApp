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

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      token: [],
      isAuthenticated: false,
      user: {}
    };
  }

  componentDidMount() {
    this.getUserData();
    this.checkUserRole();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  async getUserData() {
    const token = await authService.getAccessToken();
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      user: user,
      token: token
    });
  }

  async checkUserRole() {
    await fetch('database', {
      method: 'GET',
      headers: !this.state.token ?
        {} : { 'Authorization': `Bearer ${this.state.token}` },
      body: JSON.stringify(this.state.user)
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
                  <NavLink tag={Link} className="text-dark" to="/counter">
                    Counter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">
                    Fetch data
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/SubmitNewQuestion"
                  >
                    Submit New Question
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
                  <NavLink tag={Link} className="text-dark" to="/counter">
                    Counter
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">
                    Counter
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">
                    Fetch data
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/SubmitNewQuestion"
                  >
                    Submit New Question
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
    let adminStuff = this.state.isUserAnAdmin ? this.renderNavbarAdmin : this.renderNavbarNormal
    return (
      <div>
        {adminStuff}
      </div>
    );
  }
}
