import axios from 'axios';

export const checkAuth = (credentials) => {
    return dispatch => {
        const authData = {
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyChljo7cbyL9qLMLU2doBAcBlAJXjhsRJE', authData)
        .then(res => {
            localStorage.setItem("token", res.data.idToken);
            dispatch({ type: 'AUTH_SUCCESS', idToken: res.data.idToken, localId: res.data.localId});
        })
        .catch(err => {
            dispatch({ type: 'AUTH_FAIL', error: err})
        }
        );
    }
}