import React, { Component } from "react";
import  { Link } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";

class Dashboard extends Component {
    render(){
        return(
            <MDBContainer>
            <h1 className="text-center mt-5 mb-5">Welcome to Dashboard </h1>
            <MDBRow className="mt-5">
            <MDBCol className="d-flex justify-content-center"><MDBBtn className="w-100" color="primary"><Link className="text-white d-block" to="/newbook">Add a Book</Link></MDBBtn></MDBCol>
            <MDBCol className="d-flex justify-content-center"><MDBBtn className="w-100" color="default"><Link className="text-white d-block" to="/allbooks">Manage Books</Link></MDBBtn></MDBCol>
            </MDBRow>
            </MDBContainer>
        );
    }
}

export default Dashboard;