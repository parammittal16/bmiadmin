import axios from '../../axios-config';

export const addBook = (book, token) => {
    return dispatch => {
        console.log(token);
        axios.post('/books.json?auth=' + token, book)
        .then(res => {
            dispatch({ type: 'ADD_BOOK', msg: 'Book Added'});
        })
        .catch(err => dispatch({ type: 'ADD_BOOK_FAIL', msg: 'Failed'}));
    }
}

export const modal = () => {
    return dispatch => {
        dispatch({ type: 'CLOSE_MODAL'});
    }
}
