import axios from 'axios';
import humps from 'humps';

export const fetchHighlights = () => {
    return axios.get('http://localhost:3001/api/highlights',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const createHighlight = (data) => {
    const response = axios.post('http://localhost:3001/api/highlights', 
        {
            highlight: {
                text: data.text,
                cfi_range: data.cfiRange
            },
        },
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )

    return response
}