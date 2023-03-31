import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {GetUserOrderDetail} from "../../features/api/CheckOutApi";
import {Box} from "@mui/material";

const OrdersDetail = () => {
    const {id} = useParams()

    const orderQuery = useQuery({
        queryKey: ["orders", id],
        queryFn: () => GetUserOrderDetail(id),

    })


    return (
        <Box className={"panel-box"}>
            <h1>detail</h1>
        </Box>
    )
}

export default OrdersDetail