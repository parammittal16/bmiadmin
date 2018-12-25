import React , { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

import { addBook } from '../../store/actions/bookActions';

class Newbook extends Component {
    state = {
        isbn: -1,
        pdf: '',
        name: '',
        video: []
    }
    HandleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.addBook(this.state, this.props.token);
    }
    HandleAddISBN = (e) => {
        this.setState({
            isbn: parseInt(e.target.value)
        })
    }
    HandleAddPdf = (e) => {
        this.setState({
            pdf: e.target.value
        })
    }
    HandleAddName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    HandleAddVideo = (e) => {
        this.setState({
            video: e.target.value.split(",")
        })
    }
    render(){
        let qrimage = null;
        if(this.state.isbn !== -1) {
            qrimage = (<QRCode size={520} value={String(this.state.isbn)} />);
        }
        return(
            <MDBContainer>
            <MDBRow className="d-flex justify-content-center mt-5">
            <MDBCol md="5">
            <form>
            <p className="h3 text-center mb-4">Add New Book</p>
            <div className="grey-text">
            <MDBInput id="name"
            label="Type Book Name"
            group
            type="text" onChange={this.HandleAddName}
            />
            <MDBInput id="isbn"
            label="Type ISBN"
            group
            type="number" onChange={this.HandleAddISBN}
            />
            <MDBInput id="pdf"
            label="Type PDF Link"
            group
            type="text" onChange={this.HandleAddPdf}
            />
            <MDBInput type="textarea" id="video"
            label="Type Video Link"
            group
            onChange={this.HandleAddVideo}
            />
            </div>
            <div className="text-center">
            <MDBBtn onClick={this.HandleSubmit}>Add</MDBBtn>
            </div>
            </form>
            </MDBCol>
            <MDBCol md="4" style={{textAlign: 'center'}}>
            { qrimage }
            </MDBCol>
            </MDBRow>
            </MDBContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.idToken
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (book, token) => dispatch(addBook(book, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newbook);