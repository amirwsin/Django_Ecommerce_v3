import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_CART, SAVE_LOCAL, LOAD_LOCAL, INCREMENT, DECREMENT
} from '../types/cartTypes'

const initialState = {
    products: [],
    qty: 0,
    price: 0,
}


export const cartReducer = (state = initialState, action) => {
    const {type, payload} = action
    let result, key, prepData, amount, readyData;
    switch (type) {
        case ADD_TO_CART:
            result = state.products.find((product, index) => {
                key = index
                return product?.product?.id === payload.product?.id && product?.inventory?.id === payload.inventory?.id
            })
            if (result) {
                prepData = state.products
                prepData[key].qty += 1;
                prepData[key].variant = payload.variant
                readyData = {
                    ...state,
                    products: prepData,
                    qty: state.qty + payload.qty,
                    price: state.price + parseFloat(payload.inventory.sale_price)
                }
                localStorage.setItem("shoppingCart", JSON.stringify(readyData))
                return readyData
            } else {
                readyData = {
                    ...state,
                    products: [...state.products, payload],
                    qty: state.qty + payload.qty,
                    price: state.price + parseFloat(payload.inventory.sale_price)
                }
                localStorage.setItem("shoppingCart", JSON.stringify(readyData))
                return readyData
            }
        case REMOVE_FROM_CART:
            result = state.products.find((product, index) => {
                key = index
                return product?.product?.id === payload.product?.id && product?.inventory?.id === payload.inventory?.id
            })
            if (result) {
                prepData = state.products
                amount = parseFloat(result.inventory.sale_price) * result.qty
                prepData.splice(key, 1)
                readyData = {
                    ...state,
                    products: prepData,
                    qty: state.qty - result.qty,
                    price: state.price - amount,
                }
                localStorage.setItem("shoppingCart", JSON.stringify(readyData))
                return readyData
            }
            return {...state}

        case INCREMENT:
            result = state.products.find((product, index) => {
                key = index
                return product?.product?.id === payload.product?.id && product?.inventory?.id === payload.inventory?.id
            })
            if (result) {
                prepData = state.products
                prepData[key].qty += 1;
                readyData = {
                    ...state,
                    products: prepData,
                    qty: state.qty + 1,
                    price: state.price + parseFloat(result.inventory.sale_price),
                }
                localStorage.setItem("shoppingCart", JSON.stringify(readyData))
                return readyData
            } else {
                return {...state}
            }
        case DECREMENT:
            result = state.products.find((product, index) => {
                key = index
                return product?.product?.id === payload.product?.id && product?.inventory?.id === payload.inventory?.id
            })
            if (result) {
                prepData = state.products
                prepData[key].qty -= 1;
                readyData = {
                    ...state,
                    products: prepData,
                    qty: state.qty - 1,
                    price: state.price - parseFloat(result.inventory.sale_price)
                }
                localStorage.setItem("shoppingCart", JSON.stringify(readyData))
                return readyData
            } else {
                return {...state}
            }
        case LOAD_LOCAL:
            if (payload) {
                return payload
            }
            else
                return initialState

        case LOAD_CART:
            let newQty = 0;
            let newPrice = 0;
            let product, inventory
            let variant = {}
            let prepProduct;
            let products = []
            let data = payload
            data.items.forEach(item => {
                newQty += item.qty
                inventory = item.product.inventory
                delete item.product["inventory"]
                product = item.product
                item.variants.forEach((varItem) => {
                    result = inventory.attribute_values.filter(attribute => {
                        return attribute.id === varItem
                    })
                    let attributeName = result[0].product_attribute?.name
                    variant[attributeName] = result[0].attribute_value
                })
                newPrice += parseFloat(inventory.sale_price) * item.qty
                prepProduct = {"product": product, "inventory": inventory, "qty": item.qty, "variant": variant}
                products = [...products, prepProduct]
            })

            readyData = {
                ...state, qty: newQty, price: newPrice, products: products
            }
            localStorage.setItem("shoppingCart", JSON.stringify(readyData))
            return readyData
        default:
            return state
    }
}