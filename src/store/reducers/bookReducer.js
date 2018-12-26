const initState = {
    books: null,
    responseMessage: null
};

const bookReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_BOOK' : console.log(action.msg); return {...state, ...{responseMessage: action.msg}};
        case 'ADD_BOOK_FAIL' : console.log(action.msg); return {...state, ...{responseMessage: action.msg}};
        case 'GET_BOOKS' : console.log(action.books); return {...state, ...{books: action.books}};
        case 'CLOSE_MODAL': return {...state, ...{responseMessage: null}};
        default: return state
    }
}

export default bookReducer;