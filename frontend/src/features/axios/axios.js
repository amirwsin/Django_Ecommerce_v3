import axios from "axios";
import axiosBasicInstance from "./axiosBasic";

const baseUrl = 'http://127.0.0.1:8000';
const client_id = "djn3mVQrJMTH4ypYWxWIYsp2peRtNR1hYiIANifI"
const client_secret = "lzv2CzvMrJlRf8CRudJTn6kFtU7k2DxTtEcbRBiQho9nNDpAg6aftvCX44EprHxbjRLn4pYX8kVLyuohvhLAdU6VjnBTFt0xtrT9yOWnFVmZThrTUqiJxqDAv9JF2mI3"


const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});

axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (typeof error.response === 'undefined') {
            console.log('A server/netowork error occurred. ' +
                'Looks like CORS might be the problem. ' +
                'Sorry about this - we will get it fixed shortly.');
            return Promise.reject(error);
        }
        if (error.response.status === 401 && originalRequest.url === baseUrl + 'token/refresh/') {
            window.location.href = '/login';
            return Promise.reject(error)
        }
        if (error.response.data.detail === 'Invalid token header. No credentials provided.' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken && refreshToken !== 'undefined' && refreshToken !== null) {
                const prepData = {
                    refresh_token: refreshToken,
                    grant_type: "refresh_token",
                    client_id: client_id,
                    client_secret: client_secret
                }
                return axiosBasicInstance.post('/auth/token/', prepData).then((res) => {
                    localStorage.setItem('access_token', res.data.access_token)
                    localStorage.setItem('refresh_token', res.data.refresh_token)
                    axiosInstance.defaults.headers['Authorization'] =
                        'JWT ' + res.data.access_token;
                    originalRequest.headers['Authorization'] =
                        'JWT ' + res.data.access_token;
                    window.location.reload()
                    return axiosInstance(originalRequest);
                }).catch((err) => {
                    console.log(err)
                });
            } else {
                console.log('Refresh token not available');
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('access_token')
                localStorage.removeItem('user')
                return window.location.href = '/login';
            }
        }
        console.log(error)
        return error
    })


export default axiosInstance