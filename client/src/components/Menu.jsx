import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logout} from '../action/auth';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </NavItem>
              {isAuthenticated ? (
                <React.Fragment>
                  <NavItem>
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/users">
                      Users
                    </Link>
                  </NavItem>
                  <NavItem>
                  <Link
                        className="nav-link"
                        to="/"
                        onClick={this.props.logout}
                      >Logout</Link>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {logout}
)(Menu);
