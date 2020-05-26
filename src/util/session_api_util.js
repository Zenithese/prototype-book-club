import axios from 'axios'
var $ = require('jquery');

export const login = user => {
    return axios.post(
        'http://localhost:3001/api/session', 
        { user }, 
        { withCredentials: true }
    )
};

export const getCurrentUser = () => {
    return axios.get(
        'http://localhost:3001/api/session', 
        { withCredentials: true }
    )
}

export const signup = user => {
    return axios.post(
        'http://localhost:3001/api/users', 
        { user }, 
        { withCredentials: true }
    )
};

export const logout = () => (
    $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
);