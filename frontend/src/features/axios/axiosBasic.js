import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/';

const axiosBasicInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json'
    }
});

export default axiosBasicInstance