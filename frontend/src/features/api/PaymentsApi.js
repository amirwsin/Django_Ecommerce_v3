import axiosInstance from "../axios/axios";


export const GetClientSecretApi = async (data) => {
    return await axiosInstance.post(`/api/checkout/payment/`, data).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

