import {Box, Typography,} from "@mui/material";
import {useSelector} from "react-redux";

const CartCheckout = ({children}) => {
    const {qty, price} = useSelector(state => state.cartReducer)
    return (
        <Box sx={{
            boxShadow: "0 0 4px var(--box-shadow-color)",
            padding: 3,
            borderRadius: "7px",
            backgroundColor: "background.main"
        }}>
            <ul className={"checkout-list"} style={{padding:0}}>
                {children}
            </ul>
        </Box>
    )
}
export default CartCheckout