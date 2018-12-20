import React , { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { addBook } from '../../store/actions/bookActions';

class Newbook extends Component {
    state = {
        isbn: -1,
        pdf: '',
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
    HandleAddVideo = (e) => {
        this.setState({
            video: e.target.value.split(",")
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