const initState = {
    books: null
};

const bookReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_BOOK' : console.log(action.book); return state;
        case 'GET_BOOKS' : console.log(action.books); return {...state, ...{books: action.books}};
        default: return state
    }
}

export default bookReducer;