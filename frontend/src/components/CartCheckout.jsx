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
            <ul className={"checkout-list"}>
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
                {children}
            </ul>
        </Box>
    )
}
export default CartCheckout