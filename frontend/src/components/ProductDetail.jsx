import {Box, Button, Chip, Divider, IconButton, Skeleton, Typography} from "@mui/material";
import ProductAttribute from "./ProductAttribute";
import {useContext, useEffect, useState} from "react";
import {AddShoppingCart, Favorite} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, onlineAddToCart} from "../features/actions/cartActions";
import MySnackBar from "./MySnackBar";
import {AlertContext} from "../AlertContext";

const ProductDetail = ({data, setSelection, isLoading}) => {

    const {setAlertState} = useContext(AlertContext)
    const {user,isAuthenticated} = useSelector(state => state.authReducer)
    let productAttribute = []
    const [currentInventory, setCurrentInventory] = useState(data?.inventory && data?.inventory[0])
    const [variants, setVariants] = useState({})
    let defaultInventory;
    const dispatch = useDispatch()


    const getProductTypeAttribute = (data) => {
        data?.product_type?.product_type_attribute.forEach(attribute => {
            return productAttribute.push(attribute.name)
        })
    }
    const getProductAttributeValues = (data) => {
        let result = [];
        if (data !== undefined || data !== "undefined") {
            [data].map(item => {
                item?.attribute_values?.map((attribute) => {
                    result.push(attribute)
                })
            })
        }
        return result
    }

    const finalProductAttribute = () => {
        let result = []
        productAttribute.map(itemKey => {
            productAttributeList.map(attribute => {
                if (itemKey === attribute.product_attribute.name) {
                    result.push({key: itemKey, value: attribute.attribute_value})
                }
            })
        })
        return result
    }

    const handleInventorySelection = (item) => {
        setCurrentInventory(item)
        setSelection(item?.id)
    }

    const handleVariant = (key, value) => {
        setVariants({...variants, [key]: value})
    }

    const checkVariants = () => {
        let result = true
        if (variants && Object.keys(variants).length !== 0) {
            productAttribute.forEach(attribute => {
                if (variants[attribute] === null || variants[attribute] === undefined) {
                    result = false
                }
            })
        } else {
            result = false
        }
        return result
    }

    const handleAddToCart = () => {
        let preData = {}
        let variantCheckResult = checkVariants()
        if (variantCheckResult) {
            preData = {"product": data, "variant": variants, "inventory": currentInventory, "qty": 1}
            delete preData.product.inventory
            dispatch(addToCart(preData))
            if (isAuthenticated){
                const readyUser = JSON.parse(user)
                dispatch(onlineAddToCart(readyUser.id,preData))
            }
        } else {
            setAlertState({"open": true, "msg": "Please Select Variants", "color": "error"})
        }
    }

    useEffect(() => {
        defaultInventory = data?.inventory
        handleInventorySelection(defaultInventory)
    }, [data])


    getProductTypeAttribute(currentInventory)
    const productAttributeList = getProductAttributeValues(currentInventory)
    const finalAttributeValues = finalProductAttribute()


    return (
        <Box sx={{
            backgroundColor: "background.main",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            gap: 2,
            borderRadius: "7px",
            padding: 2,
            boxShadow: "2px 2px 8px grey"
        }}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant={"h5"} component={"h1"} sx={{fontWeight: 500,}}>
                    {data?.name ? data?.name : <Skeleton variant={"rectangular"} animation={"wave"} width={"20rem"}/>}
                </Typography>
                <Box sx={{display: "grid", alignItems: "center", gap: 2}}>
                    {
                        currentInventory?.brand?.name ?
                            <Chip variant={"filled"} size={"medium"} color={"warning"}
                                  label={currentInventory?.brand?.name}/> :
                            <Skeleton variant={"rectangular"} animation={"wave"} width={"5rem"}/>
                    }

                    {currentInventory?.sale_price ? <Typography variant={"h5"} component={"p"}
                                                                sx={{fontWeight: 600}}>${currentInventory?.sale_price}</Typography> :
                        <Skeleton variant={"rectangular"} animation={"wave"}/>}
                </Box>
            </Box>
            <Divider variant={"fullWidth"}/>
            <Typography variant={"body1"} component={"p"}>
                {data?.description ? data?.description :
                    <Skeleton variant={"rectangular"} animation={"wave"} width={"100%"} height={300}/>}
            </Typography>
            <Divider variant={"fullWidth"}/>
            <Box sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 2}}>
                {productAttribute.length > 0 ?
                    productAttribute.map(key => {
                        return <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 2,
                            alignItems: "center"
                        }} key={key}>
                            <Chip variant={"filled"} color={"secondary"} label={key}/>
                            {finalAttributeValues.map((item) => {
                                if (item.key === key) {
                                    return (
                                        <ProductAttribute variants={variants} handleVariant={handleVariant}
                                                          key={item.value} keyValue={key}
                                                          value={item.value}/>)
                                }
                            })}</Box>
                    }) : <Skeleton variant={"rectangular"} width={"10rem"} height={"2rem"} animation={"wave"}/>
                }
            </Box>
            <Divider variant={"fullWidth"}/>
            <Button color={"black"} sx={{color:"white"}} variant={"contained"} onClick={handleAddToCart} endIcon={<AddShoppingCart/>}>Add
                To Cart</Button>
            <Button color={"error"} variant={"outlined"} endIcon={<Favorite/>}>Add To Favorite</Button>
        </Box>
    )
}


export default ProductDetail