import React , { Component } from 'react';
import { connect } from 'react-redux'; 
import { getAllBooks } from '../../store/actions/getAllBooks';
import { Table, TableBody, TableHead  } from 'mdbreact';

class AllBooks extends Component {
    componentDidMount(){
        if(!this.props.booksData){
            this.props.getAllBooks();
        }
    }
    render() {
        let rows = null;
        if(this.props.booksData) {
            //console.log(this.props.booksData[Object.keys(this.props.booksData)[0]].isbn);
             rows = Object.keys(this.props.booksData).map((key, i) => (<tr key={key}>
                <td>{i+1}</td>
                <td>{this.props.booksData[key].name}</td>
                <td>{this.props.booksData[key].isbn}</td>
                <td><a href={this.props.booksData[key].pdf}>Book Link</a></td>
                <td>{this.props.booksData[key].video.map(((v, j) => (<p key={v}><a href={v}>Video {j+1} Link</a></p>)))}</td>
                </tr>)
                );
            }
            return (
                this.props.booksData ? (
                <Table striped style={{margin:'auto', width: '80%', textAlign: 'center'}}>
                <TableHead color="primary-color" textWhite>
                <tr>
                <th>S.No.</th>
                <th>NAME</th>
                <th>ISBN</th>
                <th>PDF</th>
                <th>VIDEO(S)</th>
                </tr>
                </TableHead>
                <TableBody>
                {rows}
                </TableBody>
                </Table>) : <h1 style={{marginTop: '200px', textAlign: 'center'}}>Please wait</h1>
                );
            }
        }
        const mapStateToProps = state => {
            return {
                booksData: state.book.books
            }
        }
        const mapDispatchToProps = (dispatch) => {
            return {
                getAllBooks: () => dispatch(getAllBooks())
            }
        }
        
        export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);