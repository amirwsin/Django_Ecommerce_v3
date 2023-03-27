import axiosInstance from "../axios/axios";


export const BasicProductApi = () => {
    return axiosInstance.get(`/api/inventory/products/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const ProductByCategoryApi = (category) => {
    return axiosInstance.get(`/api/inventory/products/?category__slug=${category}`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const ProductIsSpecialApi = () => {
    return axiosInstance.get(`/api/inventory/products/?is_special=true`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err

    })
}
export const ProductIsRecommendApi = () => {
    return axiosInstance.get(`/api/inventory/products/?is_recommend=true`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}


export const ProductBySlug = (slug) => {
    return axiosInstance.get(`/api/inventory/products/${slug}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}


export const ProductFilter = (filters) => {
    let filter_string = '?'
    let prices = filters.price
    let category = filters.category
    if (category) {
        filter_string += `category__slug=${category}&`
    }
    if (prices[0] >= 0 && prices[1] > 0) {
        filter_string += `min_price=${prices[0]}&max_price=${prices[1]}&`
    }
    return axiosInstance.get(`/api/inventory/products/${filter_string}`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

