import axiosInstance from "../axios/axios";

export const GetAllProducts = async (page) => {
    return await axiosInstance.get(`/api/cms/products/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const GetAllUsers = async (page) => {
    return await axiosInstance.get(`/api/cms/users/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}