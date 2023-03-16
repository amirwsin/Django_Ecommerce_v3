import {
    LOGIN_PROGRESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from '../types/authTypes'
import axiosBasicInstance from "../axios/axiosBasic";
import axiosInstance from "../axios/axios";

const client_id = "fPvVX45n5HUW7UIkmXXk256Qkda2JFdVNVXP8heS"
const client_secret = "vXMqpYk3svZ1g5Z98a2R9CblH3oqVBV5XGpFrB5Gl6PBfQ95ubC5ZW1hA13ThuKoTG5w6rzeVcGNTGLb2I8WNz9hO96q7zffyR7w8rAQsjQnoVK0vGcG7dfgP2bAxskt"


export const loadUser = () => async (dispatch) => {
    const token = localStorage.getItem('access_token')
    const result = await axiosInstance.post(`/api/user/login/${token}/`,).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        dispatch({
            type: LOGIN_SUCCESS,
            payload: JSON.stringify(res.data),
        })
        return true
    }).catch((err) => {
        dispatch({
            type: LOGIN_FAIL,
        })
        return false
    });
    return result
}


export const login = (data) => async (dispatch) => {
    dispatch({type: LOGIN_PROGRESS})
    const result = await axiosBasicInstance.post(`/auth/token/`, {
        username: data.username,
        password: data.password,
        grant_type: "password",
        client_id: client_id,
        client_secret: client_secret
    }).then((res) => {
        if (res.status === 200) {
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            return true
        }
    }).catch((err) => {
        dispatch({
            type: LOGIN_FAIL,
        })
        console.log(err)
        return false
    });
    return result
}

export const register = (data) => async (dispatch) => {
    const result = await axiosBasicInstance.post(`/api/user/register/`, {
        username: data.username,
        password: data.password,
        email: data.email
    }).then((res) => {
        if (res.request.status === 201) {
            return "Your Account Created Successfully"
        }
    }).catch((err) => {
        return (err.response.data)
    })
    return result
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    dispatch({type: LOGOUT, payload: null})
}