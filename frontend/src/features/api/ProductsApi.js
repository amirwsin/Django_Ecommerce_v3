import axiosInstance from "../axios/axios";


export const BasicProductApi = () => {
    return axiosInstance.get(`/api/inventory/products`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const ProductByCategoryApi = (category) => {
    return axiosInstance.get(`/api/inventory/products?category=${category}`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}


export const ProductBySlug = (slug) => {
    return axiosInstance.get(`/api/inventory/products/${slug}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

