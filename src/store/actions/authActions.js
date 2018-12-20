import axios from 'axios';

export const checkAuthTime = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch({type: 'AUTH_LOGOUT'});
        }, expTime * 1000);
    };
}

export const checkAuth = (credentials) => {
    return dispatch => {
        const authData = {
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyChljo7cbyL9qLMLU2doBAcBlAJXjhsRJE', authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch({ type: 'AUTH_SUCCESS', idToken: res.data.idToken, localId: res.data.localId});
            dispatch(checkAuthTime(res.data.expiresIn));
        })
        .catch(err => {
            dispatch({ type: 'AUTH_FAIL', error: err})
        }
        );
    }
}

export const doLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return dispatch => {
        dispatch({type: 'AUTH_LOGOUT'})
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(doLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(doLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch({ type: 'AUTH_SUCCESS', idToken: token, localId: userId});
                dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};