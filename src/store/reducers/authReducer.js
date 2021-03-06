const initState = {
    idToken: null,
    userId: null,
    error: null
};

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'AUTH_SUCCESS':
        return { ...state, ...{idToken: action.idToken, userId: action.localId}}
        case 'AUTH_FAIL':
        return { ...state, ...{error: action.error}}
        case 'AUTH_LOGOUT': return { ...state, ...{idToken: null, userId: null}}
        default:
        return state;
    }
}

export default authReducer;