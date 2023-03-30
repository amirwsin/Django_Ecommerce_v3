import {Box, Button, Container, Grid, Typography} from "@mui/material";
import CartCheckout from "../components/CartCheckout";
import {Link} from "react-router-dom";
import {ShoppingCartCheckout} from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";
import {GetUserAddressApi} from "../features/api/UserApi";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {getDeliveryList} from "../features/api/CheckOutApi";
import Payment from "./Payment";


const CheckOut = () => {

    const {user} = useSelector(state => state.authReducer)
    const {price, qty, products} = useSelector(state => state.cartReducer)
    const readyUser = JSON.parse(user)
    const [showPayment, setShowPayment] = useState(false)
    const [addressSelect, setAddressSelect] = useState(null)
    const [deliverySelect, setDeliverySelect] = useState({})

    const addressQuery = useQuery({
        queryKey: ["address"],
        queryFn: () => GetUserAddressApi(readyUser.id),
        onSuccess: (data) => {
            let defaultItem = data.filter(item => {
                return item.is_default === true
            })
            setAddressSelect(defaultItem[0]?.id)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })


    const deliveryQuery = useQuery({
        queryKey: ["delivery"],
        queryFn: () => getDeliveryList(),
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })


    const FinalPrice = () => {
        let productPrice = parseFloat(price)
        let deliveryPrice = parseFloat(deliverySelect.price)
        let final
        if (deliveryPrice) {
            final = productPrice + deliveryPrice
        } else {
            final = productPrice
        }
        return final
    }
    const handleWeight = () => {
        let weight = 0
        products.forEach(product => {
            weight += product.inventory.weight * product.qty
        })
        return weight.toFixed(2)
    }


    return (
        <Container maxWidth={"xl"} sx={{marginY: 5, minHeight: "63vh"}}>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    {showPayment ? <Payment price={FinalPrice()} delivery={deliverySelect} address={addressSelect}/> :
                        <Box sx={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            padding: 1,
                            borderRadius: "7px",
                            backgroundColor: "background.main",
                            boxShadow: "0 0 4px var(--box-shadow-color)"
                        }}>
                            <CustomDivider text={"Address"}/>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 3,
                                justifyContent: "center", marginY: 2,
                            }}>
                                {addressQuery.data?.length > 0 ? addressQuery.data?.map(item => <CustomAddressCard
                                        addressSelect={addressSelect}
                                        key={item.id}
                                        setAddressSelect={setAddressSelect}
                                        data={item}/>) :
                                    <Typography component={Link} to={"/user/dashboard/address"}>click to add an
                                        address</Typography>}
                            </Box>
                            <CustomDivider text={"Delivery Method"}/>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                                gap: 3,
                                marginY: 2,
                            }}>
                                {deliveryQuery.data?.results?.map(item => <CustomDeliveryCard key={item.id} data={item}
                                                                                              deliverySelect={deliverySelect}
                                                                                              setDeliverySelect={setDeliverySelect}
                                                                                              weight={handleWeight}/>)}
                            </Box>
                        </Box>
                    }

                </Grid>
                <Grid item xs={12} lg={4}>
                    <CartCheckout>
                        <li className={"checkout-list-item"}>
                            <Typography variant={"h5"} fontWeight={600} component={"span"}>
                                Quantity
                            </Typography>
                            <Typography variant={"h6"} fontWeight={400} component={"span"}>
                                {qty}
                            </Typography>
                        </li>
                        <li className={"checkout-list-item"}>
                            <Typography variant={"h5"} fontWeight={600} component={"span"}>
                                Weight
                            </Typography>
                            <Typography variant={"h6"} fontWeight={400} component={"span"}>
                                {handleWeight()}kg
                            </Typography>
                        </li>
                        <li className={"checkout-list-item"}>
                            <Typography variant={"h5"} fontWeight={600} component={"span"}>
                                Final Price
                            </Typography>
                            <Typography variant={"h6"} fontWeight={400} component={"span"}>
                                ${FinalPrice()}
                            </Typography>
                        </li>
                        {deliverySelect.id && addressSelect ? <li>
                            <Button onClick={() => setShowPayment(prevState => !prevState)} color={"black"}
                                    variant={"contained"}
                                    sx={{color: "background.main"}} fullWidth={true}

                                    endIcon={<ShoppingCartCheckout/>}>
                                {showPayment ? "CANCEL" : "CHECKOUT"}
                            </Button>
                        </li> : <Button color={"black"} fullWidth={true}>Select Delivery Method & address to
                            continue</Button>}
                    </CartCheckout>
                </Grid>
            </Grid>
        </Container>
    )
}

export const CustomDeliveryCard = ({data, deliverySelect, setDeliverySelect, weight}) => {
    const handleClick = () => {
        if (weight() < data.max_weight) {
            setDeliverySelect(data)
        }
    }
    return (
        <Box sx={{
            position: "relative",
            display: "block",
            width: "100%",
            padding: 1,
            borderRadius: "7px",
            backgroundColor: weight() > data.max_weight ? "background.light" : "unset",
            boxShadow: deliverySelect.id === data.id ? "0 0  10px var(--text)" : "0 0 4px var(--box-shadow-color)",
        }} onClick={handleClick}>
            <Grid container spacing={3}>
                <Grid item xs={5} sm={3} md={2}>
                    <img src={data.image} style={{width: "150px", height: "150px", borderRadius: "7px"}}/>
                </Grid>
                <Grid item xs={7} sm={9} md={10}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant={"h5"} fontWeight={500}>
                            {data.name}
                        </Typography>
                        <Typography variant={"h6"}>
                            ${data.price}
                        </Typography>
                    </Box>
                    <Typography variant={"h6"} alignSelf={"center"}>
                        Maximum Weight : {data.max_weight}kg
                    </Typography>
                    {weight() > data.max_weight &&
                    <Typography variant={"caption"} color={"error"}>your package weight heavier then
                        allowed</Typography>}
                </Grid>
            </Grid>
        </Box>
    )
}

export const CustomAddressCard = ({data, addressSelect, setAddressSelect}) => {
    const handleClick = () => {
        setAddressSelect(data.id)
    }
    return (
        <Box sx={{
            minWidth: "30%",
            width: {xs: "100%", lg: "fit-content"},
            border: addressSelect === data.id ? "2px solid var(--secondary)" : "1px solid var(--box-shadow-color)",
            boxShadow: addressSelect === data.id ? "0 0 10px var(--secondary)" : "0 0 2px var(--box-shadow-color)",
            borderRadius: "7px",
            padding: 1,
        }} onClick={handleClick}>
            <Box sx={{
                borderBottom: "1px solid grey",
                marginTop: 1,
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {addressSelect === data.id ? <Typography color={"secondary"} variant={"body1"}>selected</Typography> :
                    <Typography variant={"body1"}>Click to select</Typography>}
                {data.is_default && <Typography variant={"caption"}
                                                sx={{color: "info.main"}}>default address</Typography>}
            </Box>
            <Typography variant={"body1"} marginY={0.5} component={"p"} fontWeight={500}>
                name : {data.contact_name}
            </Typography>
            <Typography variant={"body1"} marginY={0.5} component={"p"} fontWeight={500}>
                street : {data.street}
            </Typography>
            <Typography variant={"body1"} marginY={0.5} component={"p"} fontWeight={500}>
                apartment : {data.apartment}
            </Typography>
            <Typography variant={"body1"} marginY={0.5} component={"p"} fontWeight={500}>
                city : {data.city}
            </Typography>
            <Typography variant={"body1"} marginY={0.5} component={"p"} fontWeight={500}>
                zip code : {data.zip_code}
            </Typography>
            <Typography variant={"body1"} marginY={0.5} component={"p"} fontWeight={500}>
                mobile : {data.contact_phone}
            </Typography>
        </Box>
    )
}

export const CustomDivider = ({text}) => {
    return (
        <Box className={"custom-divider"}>
            <Typography className={"custom-divider-text"} variant={"h5"} component={"span"} textAlign={"center"}>
                {text}
            </Typography>
        </Box>
    )
}

export default CheckOut