import axios from 'axios';
import humps from 'humps';
var $ = require('jquery');

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

// export const updateSettings = (color, fontSize, theme) => {
//     return axios.put(
//         'http://localhost:3001/api/users',
//         { color, fontSize, theme },
//         {
//             withCredentials: true,
//             transformResponse: [
//                 ...axios.defaults.transformResponse,
//                 data => humps.camelizeKeys(data)
//             ],
//         }
//     )
// }

export const updateSettings = (color, fontSize, theme) => {
    return $.ajax({
        method: 'PATCH',
        url: 'http://localhost:3001/api/users/1',
        data: { user: { highlight_color: color, font_size: fontSize, theme } },
    });
}

export const logout = () => {
    return axios.delete(
        'http://localhost:3001/api/session',
        { withCredentials: true }
    )
};