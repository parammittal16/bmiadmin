import React , { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class Newbook extends Component {
    state = {
        isbn: '',
        pdf: '',
        video: ''
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
            <MDBRow className="d-flex justify-content-center mt-3">
            <MDBCol md="4">
            <form>
            <p className="h3 text-center mb-4">Add New Book</p>
            <div className="grey-text">
            <MDBInput id="isbn"
            label="Type ISBN"
            group
            type="text" onChange={this.HandleChange}
            />
            <MDBInput id="pdf"
            label="Type PDF Link"
            group
            type="text" onChange={this.HandleChange}
            />
            <MDBInput id="video"
            label="Type Video Link"
            group
            type="text" onChange={this.HandleChange}
            />
            </div>
            <div className="text-center">
            <MDBBtn onClick={this.HandleSubmit}>Add</MDBBtn>
            </div>
            </form>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
        );
    }
}

export default Newbook;