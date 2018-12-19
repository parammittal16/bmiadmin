import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bmiadmin.firebaseio.com/'
});

export default instance;