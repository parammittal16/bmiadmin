import React from 'react';
import { NavbarNav, NavItem, NavLink } from "mdbreact"; 

const SignedInLink = () => {
    return (
        <NavbarNav right>
        <NavItem active>
        <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
        <NavLink to="/logout">Log Out</NavLink>
        </NavItem>
        </NavbarNav>
    );
}

export default SignedInLink;