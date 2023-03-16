import {Box, Button, ButtonGroup, Chip, Grid, IconButton, Skeleton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    decrementProduct,
    incrementProduct, onlineDecrementProduct, onlineIncrementProduct,
    onlineRemoveFromCart,
    removeFromCart
} from "../features/actions/cartActions";
import {Delete} from "@mui/icons-material";

const CartProducts = () => {
    const {products} = useSelector(state => state.cartReducer)
    return (
        <Box sx={{
            position:"relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            padding: 1,
            borderRadius: "7px",
            backgroundColor:"background.main",
            boxShadow:"0 0 4px var(--box-shadow-color)"
        }}>
            {products.length !== 0 ? products.map(product => <CartProductsItem key={product?.product?.id}
                                                                               data={product}/>) :
                <h1>Your Cart Is Empty</h1>}
        </Box>
    )
}

const CartProductsItem = ({data}) => {

    const {isAuthenticated, user} = useSelector(state => state.authReducer)
    const readyUser = JSON.parse(user)
    const dispatch = useDispatch()
    let productAttribute = []

    const getProductTypeAttribute = (data) => {
        data?.product_type?.product_type_attribute.forEach(attribute => {
            return productAttribute.push(attribute.name)
        })
    }

    const getFinalPrice = (data) => {
        const singlePrice = parseFloat(data?.inventory?.sale_price)
        const qty = data?.qty
        return singlePrice * qty
    }
    const filterMedia = (item) => {
        let result;
        if (item) {
            result = item.find(item => {
                return item.is_feature === true
            })
        }
        return result
    }


    const handleIncrement = () => {
        if (data?.inventory?.stock?.units >= data.qty) {
            dispatch(incrementProduct(data))
            if (isAuthenticated) {
                dispatch(onlineIncrementProduct(readyUser.id, data.product.id))
            }
        }
    }
    const handleDecrement = () => {
        if (data.qty >= 1) {
            dispatch(decrementProduct(data))
            if (isAuthenticated) {
                dispatch(onlineDecrementProduct(readyUser.id, data.product.id))
            }
        }
    }
    const handleRemove = () => {
        dispatch(removeFromCart(data))
        if (isAuthenticated) {
            dispatch(onlineRemoveFromCart(readyUser.id, data.product.id))
        }
    }


    getProductTypeAttribute(data?.inventory)
    let selectedVariants = data?.variant
    let price = getFinalPrice(data)
    let media = filterMedia(data?.inventory?.media)
    return (
        <Box sx={{padding: 1, marginY: 1, height: "fit-content"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <img className={"shoppingCart-product-image"} alt={media != null ? media.alt_text : "image product"}
                         src={media?.image}/>
                </Grid>
                <Grid item xs={12} lg={9} sx={{display: "grid", alignItems: "start",gap:2}}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant={"h5"} component={Link} to={`/product/${data?.product?.slug}`} sx={{
                            textDecoration: "none",
                            color: "black.main",
                            fontWeight: 600,
                            "&:active": {
                                color: "inherit"
                            }
                        }}>
                            {data?.product?.name}
                        </Typography>
                        <Typography variant={"h6"} component={"p"} fontWeight={600}>
                            ${price}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2}}>
                        {productAttribute.map(key => {
                                return <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    alignItems: "center"
                                }} key={key}>
                                    <Chip sx={{minWidth: 60}} variant={"filled"} color={"secondary"} label={key}/>
                                    <Chip sx={{minWidth: 60}} variant={"filled"} color={"primary"}
                                          label={selectedVariants[key]}/>
                                </Box>
                            }
                        )}
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <ButtonGroup variant="contained" aria-label="cart action buttons">
                            <Button onClick={handleIncrement}
                                    disabled={data?.inventory?.stock?.units === data.qty ? true : false}>+</Button>
                            <Button variant={"outlined"}>{data?.qty}</Button>
                            <Button onClick={handleDecrement} disabled={data?.qty > 1 ? false : true}>-</Button>
                        </ButtonGroup>
                        <IconButton color={"error"} onClick={handleRemove}>
                            <Delete/>
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartProducts