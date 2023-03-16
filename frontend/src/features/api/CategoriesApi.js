import axiosInstance from "../axios/axios";

export const BasicCategoriesApi = () => {
    return axiosInstance.get(`/api/inventory/categories/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}