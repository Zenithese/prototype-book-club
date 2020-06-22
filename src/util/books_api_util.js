import axios from 'axios';
import humps from 'humps';

export const fetchBooks = () => {
    return axios.get('http://localhost:3001/api/books',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};