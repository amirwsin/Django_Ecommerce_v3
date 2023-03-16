import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_CART, SAVE_LOCAL, LOAD_LOCAL, INCREMENT, DECREMENT
} from '../types/cartTypes'
import axiosInstance from "../axios/axios";

export const addToCart = (product) => (dispatch) => {
    dispatch({type: ADD_TO_CART, payload: product})
}
export const onlineAddToCart = (id, product) => async (dispatch) => {
    await axiosInstance.post(`/api/checkout/cart/${id}/`, product).then(res => {
        console.log(res)
    })
}

export const removeFromCart = (product) => (dispatch) => {
    dispatch({type: REMOVE_FROM_CART, payload: product})
}
export const onlineRemoveFromCart = (id, product) => async (dispatch) => {
    await axiosInstance.delete(`/api/checkout/cart/${id}/`, {data: {"product": product}}).then(res => {
        console.log(res)
    })
}

export const incrementProduct = (product) => (dispatch) => {
    dispatch({type: INCREMENT, payload: product})
}

export const onlineIncrementProduct = (id, product) => async (dispatch) => {
    await axiosInstance.patch(`/api/checkout/cart/${id}/`, {"type": "increment", "product": product}).then(res => {
        console.log(res)
    })
}

export const decrementProduct = (product) => (dispatch) => {
    dispatch({type: DECREMENT, payload: product})
}
export const onlineDecrementProduct = (id, product) => async (dispatch) => {
    await axiosInstance.patch(`/api/checkout/cart/${id}/`, {"type": "decrement", "product": product}).then(res => {
        console.log(res)
    })
}


export const loadLocal = () => (dispatch) => {
    let data = localStorage.getItem("shoppingCart")
    dispatch({type: LOAD_LOCAL, payload: JSON.parse(data)})
}

export const loadCart = (id) => async (dispatch) => {
    await axiosInstance.get(`/api/checkout/cart/${id}/`).then((res) => {
        dispatch({type: LOAD_CART, payload: res.data})
    })
}