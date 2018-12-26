import React , { Component } from 'react';
import { connect } from 'react-redux'; 
import { MDBContainer, MDBRow, MDBCol, MDBInput, Table, TableBody, TableHead, MDBBtn, Button, Modal, ModalBody, ModalHeader, ModalFooter   } from 'mdbreact';
import QRCode from 'qrcode.react';

import { getAllBooks } from '../../store/actions/getAllBooks';
import axios from '../../axios-config';

class AllBooks extends Component {
    state = {
        modal: false,
        keySave: null,
        name: '',
        isbn: -1,
        pdf: '', 
        videoname: [],
        video: []  
    }
    componentDidMount(){
        this.props.getAllBooks();
    }
    HandleAddISBN = (e) => {
        this.setState({isbn: e.target.value});
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
        console.log(e.target.value);
        this.setState({
            videoname: e.target.value.split(",")
        })
    }
    HandleDelete = (keyDel) => {
        axios.delete(`/books/${keyDel}.json?auth=${this.props.token}`)
        .then(res => this.props.getAllBooks())
        .catch(err => console.log(err))
    }
    HandleInfo = (keyInfo) => {
        axios.get(`/books/${keyInfo}.json`)
        .then(res => 
            this.setState({keySave: keyInfo, modal: !this.state.modal, name: res.data.name, isbn: res.data.isbn, pdf: res.data.pdf, videoname: res.data.videoname, video: res.data.video}))
        .catch(err => console.log(err))
    } 
    HandleSave = () => {
        axios.patch(`/books/${this.state.keySave}.json?auth=${this.props.token}`, {name: this.state.name,
        isbn: this.state.isbn,
        pdf: this.state.pdf, 
        videoname: this.state.videoname,
        video: this.state.video })
        .then(res => {this.props.getAllBooks(); this.setState({modal: false})})
        .catch(err => console.log(err))
    }
    render() {
        console.log(this.state);
        let rows = null;
        if(this.props.booksData) {
            //console.log(this.props.booksData[Object.keys(this.props.booksData)[0]].isbn);
            rows = Object.keys(this.props.booksData).map((key, i) => (<tr key={key}>
                <td>{i+1}</td>
                <td>{this.props.booksData[key].name}</td>
                <td>{this.props.booksData[key].isbn}</td>
                <td><a href={this.props.booksData[key].pdf}>Book Link</a></td>
                <td>{this.props.booksData[key].video.map(((v, j) => (<p key={v}><a href={v}>{this.props.booksData[key].videoname[j]}</a></p>)))}</td>
                <td><MDBBtn color="info" onClick={() => this.HandleInfo(key)}>Edit</MDBBtn>
                <MDBBtn color="danger" onClick={() => this.HandleDelete(key)}>Delete</MDBBtn></td>
                </tr>)
                );
            }
            let qrimage = (<h3 style={{color:'#adadad', marginTop: '30vh', textAlign: 'center'}}>QR Code</h3>);
        if(this.state.isbn !== -1) {
            qrimage = (<QRCode size={520} value={String(this.state.isbn)} />);
        }
            return (
                <div>
                <h1 className="text-center mt-5 mb-5">Manage Books</h1>
                {this.props.booksData ? (
                    <Table striped style={{margin:'auto', width: '80%', textAlign: 'center'}}>
                    <TableHead color="default-color" textWhite>
                    <tr>
                    <th>S.No.</th>
                    <th>NAME</th>
                    <th>ISBN</th>
                    <th>PDF</th>
                    <th>VIDEO(S)</th>
                    <th>Modify</th>
                    </tr>
                    </TableHead>
                    <TableBody>
                    {rows}
                    </TableBody>
                    </Table>) : <h1 style={{marginTop: '200px', textAlign: 'center'}}>Please wait ...</h1>}
                    
                    
                    <Modal isOpen={this.state.modal} toggle={() => this.setState({modal: !this.state.modal})} size="fluid">
                    <ModalHeader toggle={() => this.setState({modal: !this.state.modal})}>{this.state.name}</ModalHeader>
                    <ModalBody>
                    <MDBContainer>
                    <MDBRow className="d-flex justify-content-center">
                    <MDBCol md="6">
                    <form>
                    <div className="grey-text">
                    <MDBInput id="name"
                    label="Type Book Name"
                    group
                    value={this.state.name} 
                    onChange={this.HandleAddName}
                    type="text"
                    />
                    <MDBInput id="isbn"
                    label="Type ISBN"
                    group
                    value={this.state.isbn} 
                    type="number" onChange={this.HandleAddISBN}
                    />
                    <MDBInput id="pdf"
                    label="Type PDF Link"
                    group
                    value={this.state.pdf} 
                    type="text" onChange={this.HandleAddPdf}
                    />
                    <MDBInput type="textarea" id="videoName"
                    label="Type Video(s) Name"
                    group
                    value={this.state.videoname.join(',')} 
                    onChange={this.HandleAddVideoName}
                    />
                    <MDBInput type="textarea" id="video"
                    label="Type Video(s) Link"
                    group
                    value={this.state.video.join(',')} 
                    onChange={this.HandleAddVideo}
                    />
                    </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="6" style={{textAlign: 'center'}}>
                    { qrimage }
                    </MDBCol>
                    </MDBRow>
                    </MDBContainer>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={() => this.setState({modal: !this.state.modal})}>Close</Button>
                    <Button color="primary" onClick={this.HandleSave}>Save changes</Button>
                    </ModalFooter>
                    </Modal>
                    </div>
                    );
                }
            }
            const mapStateToProps = state => {
                return {
                    booksData: state.book.books,
                    token: state.auth.idToken
                }
            }
            const mapDispatchToProps = (dispatch) => {
                return {
                    getAllBooks: () => dispatch(getAllBooks())
                }
            }
            
            export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);