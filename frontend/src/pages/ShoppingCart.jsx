import {Button, Container, Grid} from "@mui/material";
import CartProducts from "../components/CartProducts";
import CartCheckout from "../components/CartCheckout";
import {Link} from "react-router-dom";
import {ShoppingCartCheckout} from "@mui/icons-material";

const ShoppingCart = () => {
    return (
        <Container maxWidth={"xl"} sx={{marginY: 5, minHeight: "63vh"}}>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <CartProducts/>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <CartCheckout>
                        <li>
                            <Button component={Link} to={"checkout"} color={"black"} variant={"contained"}
                                    sx={{color: "background.main"}} fullWidth={true} endIcon={<ShoppingCartCheckout/>}>
                                Continue
                            </Button>
                        </li>
                    </CartCheckout>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ShoppingCart