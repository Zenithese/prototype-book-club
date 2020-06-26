import axios from 'axios';
import humps from 'humps';

export const login = user => {
    return axios.post(
        'http://localhost:3001/api/session', 
        { user }, 
        { withCredentials: true }
    )
};

export const getCurrentUser = () => {
    return axios.get('http://localhost:3001/api/session', 
        {
            withCredentials: true,
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        },
    )
}

export const signup = user => {
    return axios.post(
        'http://localhost:3001/api/users', 
        { user }, 
        { withCredentials: true }
    )
};

export const updateSettings = (color, fontSize, theme) => {
    return axios.patch(
        'http://localhost:3001/api/users/1',
        { highlight_color: color, font_size: fontSize, theme },
        {
            withCredentials: true,
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const logout = () => {
    return axios.delete(
        'http://localhost:3001/api/session',
        { withCredentials: true }
    )
};