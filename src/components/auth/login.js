import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import img from '../../assets/bmi.png';
class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    HandleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    HandleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
        return(
            <MDBContainer>
            <div className="text-center mt-4"><img style={{width:"130px"}} src={img} alt="Logo"/></div>
            <MDBRow className="d-flex justify-content-center mt-3">
            <MDBCol md="4">
            <form>
            <p className="h3 text-center mb-4">Sign in</p>
            <div className="grey-text">
            <MDBInput id="email"
            label="Type your email"
            icon="envelope"
            group
            type="email" onChange={this.HandleChange}
            />
            <MDBInput id="password"
            label="Type your password"
            icon="lock"
            group
            type="password" onChange={this.HandleChange}
            />
            </div>
            <div className="text-center">
            <MDBBtn><Link to="/dashboard" className="text-white">Login</Link></MDBBtn>
            </div>
            </form>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login;