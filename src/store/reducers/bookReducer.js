const initState = {};

const bookReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_BOOK' : console.log(action.book); return state;
        default: return state
    }
}

export default bookReducer;