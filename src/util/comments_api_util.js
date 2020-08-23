import axios from 'axios';
import humps from 'humps';

export const fetchComments = () => {
    return axios.get('http://localhost:3001/api/highlights',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const createComment = (data) => {
    return axios.post('http://localhost:3001/api/comments',
        {
            comment: {
                body: data.text,
            },
        },
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const deleteComment = (id) => {
    return axios.delete(`http://localhost:3001/api/comments/${id}`)
}