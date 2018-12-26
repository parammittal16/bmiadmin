import React , { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

import { addBook, modal } from '../../store/actions/bookActions';

class Newbook extends Component {
    state = {
        name: '',
        isbn: -1,
        pdf: '', 
        videoname: [],
        video: []
    }
    HandleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.addBook({name: this.state.name,
            isbn: this.state.isbn,
            pdf: this.state.pdf, 
            videoname: this.state.videoname,
            video: this.state.video }, this.props.token);
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
    HandleAddVideoName = (e) => {
        this.setState({
            videoname: e.target.value.split(",")
        })
    }
    HandleClose = () => {
        this.props.Modal();
    }
    render(){
        let qrimage = (<h3 style={{color:'#adadad', marginTop: '30vh', textAlign: 'center'}}>QR Code</h3>);
        if(this.state.isbn !== -1) {
            qrimage = (<QRCode size={520} value={String(this.state.isbn)} />);
        }
        return(
            <MDBContainer>
            <MDBRow className="d-flex justify-content-center mt-3">
            <MDBCol md="6">
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
            <MDBInput type="textarea" id="videoName"
            label="Type Video(s) Name"
            group
            onChange={this.HandleAddVideoName}
            />
            <MDBInput type="textarea" id="video"
            label="Type Video(s) Link"
            group
            onChange={this.HandleAddVideo}
            />
            </div>
            <div className="text-center">
            <MDBBtn onClick={this.HandleSubmit}>Add</MDBBtn>
            </div>
            </form>
            </MDBCol>
            <MDBCol md="6" style={{textAlign: 'center'}}>
            { qrimage }
            </MDBCol>
            </MDBRow>
            { this.props.message ? <Modal isOpen toggle={this.HandleClose} size="sm">
                    <ModalHeader toggle={this.HandleClose}>{this.state.name}</ModalHeader>
                    <ModalBody style={{textAlign: 'center'}}>{this.props.message}</ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.HandleClose}>Close</Button>
                    </ModalFooter>
                    </Modal>: null}
            </MDBContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.idToken,
        message: state.book.responseMessage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (book, token) => dispatch(addBook(book, token)),
        Modal: () => dispatch(modal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newbook);