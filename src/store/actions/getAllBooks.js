import axios from '../../axios-config';

export const getAllBooks = () => {
    return dispatch => {
        axios.get('/books.json')
        .then(res => {
            dispatch({ type: 'GET_BOOKS', books: res.data});
        })
        .catch(err => console.log(err));
    }
}