import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://api.illusiodesigns.com',
    timeout: 10000
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `token ${token}`;
        }

        const currentCompanyId = localStorage.getItem('current_company_id');
        if (currentCompanyId) {
            config.params = {
                ...config.params,
                company: currentCompanyId
            };

            if (config.method != 'get') {
                config.data = {
                    ...config.data,
                    company: currentCompanyId
                };
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // if (error.response) {
        //     console.error('Response Error:', error.response.data);
        //     // console.error('Status Code:', error.response.status);
        //     // console.error('Headers:', error.response.headers);
        // } else if (error.request) {
        //     console.error('Request Error:', error.request);
        // } else {
        //     console.error('Error Message:', error.message);
        // }
        if (error.response.status == 401) {
            localStorage.clear();
            document.location.reload();
        }

        if (error.response.status == 403) {
            toast.error(error.response.data.error)
        }
        return Promise.reject(error);
    }
);

export default instance;
