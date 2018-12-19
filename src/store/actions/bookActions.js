import axios from '../../axios-config';

export const addBook = (book, token) => {
    return dispatch => {
        console.log(token);
        axios.post('/books.json?auth=' + token, book)
        .then(res => {
            dispatch({ type: 'ADD_BOOK', book});
        })
        .catch(err => console.log(err));
    }
}