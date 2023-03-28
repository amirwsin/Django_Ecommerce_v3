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


export const ProductFilter = async (filters) => {
    let filter_string = '?'
    if (filters.category.length > 0) {
        let catstring = ``
        filters.category.map(item => {
            catstring += `${item},`
        })
        filter_string += `category=${catstring}&`
    }
    if (filters.brand.length > 0) {
        let brstring = ``
        filters.brand.map(item => {
            brstring += `${item},`
        })
        filter_string += `brand=${brstring}&`
    }
    if (filters.price[0] >= 0 && filters.price[1] > 0) {
        filter_string += `min_price=${filters.price[0]}&max_price=${filters.price[1]}&`
    }
    if (filters.is_special) {
        filter_string += `is_special=true&`
    }
    if (filters.is_recommend) {
        filter_string += `is_recommend=true&`
    }
    return await axiosInstance.get(`/api/inventory/products/${filter_string}`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

