import axios from 'axios';
import humps from 'humps';

export const fetchComments = () => {
    return axios.get('http://localhost:3001/api/comments',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const createComment = (data) => {
    return axios.post(data.parent ? `http://localhost:3001/api/highlights/${data.id}/comments` : `http://localhost:3001/api/comments/${data.id}/comments`,
        {
            comment: {
                body: data.body,
                user_id: data.userId,
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