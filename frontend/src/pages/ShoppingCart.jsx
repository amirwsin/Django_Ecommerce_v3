import {Button, Container, Grid, Typography} from "@mui/material";
import CartProducts from "../components/CartProducts";
import CartCheckout from "../components/CartCheckout";
import {Link} from "react-router-dom";
import {ShoppingCartCheckout} from "@mui/icons-material";
import {useSelector} from "react-redux";

const ShoppingCart = () => {
    const {qty,price} = useSelector(state => state.cartReducer)
    return (
        <Container maxWidth={"xl"} sx={{marginY: 5, minHeight: "63vh"}}>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <CartProducts/>
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
                                Price
                            </Typography>
                            <Typography variant={"h6"} fontWeight={400} component={"span"}>
                                ${price}
                            </Typography>
                        </li>
                        <li>
                            {qty > 0 ? <Button component={Link} to={"checkout"} color={"black"} variant={"contained"}
                                               sx={{color: "background.main"}} fullWidth={true}
                                               endIcon={<ShoppingCartCheckout/>}>
                                Continue
                            </Button> : <p>your shopping cart is empty</p>}

                        </li>
                    </CartCheckout>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ShoppingCart