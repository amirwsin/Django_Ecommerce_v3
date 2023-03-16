import axiosInstance from "../axios/axios";

export const BasicBrandApi = () => {
    return axiosInstance.get(`/api/inventory/brands/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}