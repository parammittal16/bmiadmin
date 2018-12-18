import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse } from "mdbreact";
import SignedInLink from './SignedInLink';

class NavbarPage extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => { 
      this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar color="indigo" dark expand="md">
          <NavbarBrand>
            <strong className="white-text">BookmanIndia</strong>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />
          <Collapse
            id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar
          >
          <SignedInLink />
          </Collapse>
      </Navbar>
    );
  }
}

export default NavbarPage;