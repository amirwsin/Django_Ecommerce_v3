import {Button, Container, Grid} from "@mui/material";
import CartProducts from "../components/CartProducts";
import CartCheckout from "../components/CartCheckout";
import {Link} from "react-router-dom";
import {ShoppingCartCheckout} from "@mui/icons-material";
import {useSelector} from "react-redux";

const ShoppingCart = () => {
    const {qty } = useSelector(state => state.cartReducer)
    return (
        <Container maxWidth={"xl"} sx={{marginY: 5, minHeight: "63vh"}}>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <CartProducts/>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <CartCheckout>
                        <li>
                            {qty > 0 ?<Button component={Link} to={"checkout"} color={"black"} variant={"contained"}
                                    sx={{color: "background.main"}} fullWidth={true} endIcon={<ShoppingCartCheckout/>}>
                                Continue
                            </Button>:<p>your shopping cart is empty</p>}

                        </li>
                    </CartCheckout>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ShoppingCart