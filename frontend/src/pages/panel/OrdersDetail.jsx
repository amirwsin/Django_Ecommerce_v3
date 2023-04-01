import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {GetUserOrderDetail} from "../../features/api/CheckOutApi";
import {
    Box,
    Button,
    Pagination, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useState} from "react";

const OrdersDetail = () => {
    const {id} = useParams()
    const orderQuery = useQuery({
        queryKey: ["orders", id],
        queryFn: () => GetUserOrderDetail(id),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })


    const subTotal = (data) => {
        let price = 0
        data?.items?.map(item => price += item.sale_price * item.qty)
        return price
    }

    return (
        <Stack gap={2}>
            <Box className={"panel-box"}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant={"h4"}>
                        ORDER : #{orderQuery?.data?.id}
                    </Typography>
                    <Typography variant={"span"} color={"secondary.contrast"} bgcolor={"secondary.light"} padding={1.2}
                                paddingX={2} borderRadius={25}>
                        {orderQuery.data?.status}
                    </Typography>
                </Box>
                <hr/>
                <TableContainer sx={{display: "grid"}}>
                    <Table sx={{
                        minWidth: 650,
                        "& .MuiTableRow-head": {
                            backgroundColor: "primary.dark",
                        },
                        "& .MuiTableRow-head .MuiTableCell-root": {
                            color: "background.main"
                        }
                    }} aria-label="order items list">
                        <TableHead>
                            <TableRow>
                                <TableCell>ITEM</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!orderQuery.isLoading && orderQuery.data?.items?.map((item, key) =>
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={item.id}>
                                    <TableCell component="th" scope="row">{key + 1}</TableCell>
                                    <TableCell align="center">{item.product}</TableCell>
                                    <TableCell align="center">{item.qty}</TableCell>
                                    <TableCell align="center">${item.sale_price}</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell rowSpan={4}/>
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align={"center"}>${subTotal(orderQuery?.data)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Delivery</TableCell>
                                <TableCell align={"center"}>${orderQuery.data?.delivery?.price}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align={"center"}>${orderQuery.data?.payment?.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>STATUS</TableCell>
                                <TableCell align={"center"}>{orderQuery.data?.payment?.status}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box className={"panel-box"}>
                <Typography variant={"h4"}>
                    DELIVERY :
                </Typography>
                <hr/>
                <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2}}>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        Person : {orderQuery.data?.address?.contact_name}
                    </Typography>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        Street : {orderQuery.data?.address?.street}
                    </Typography>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        Apartment : {orderQuery.data?.address?.apartment}
                    </Typography>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        City & State : {orderQuery.data?.address?.city}
                    </Typography>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        zip code : {orderQuery.data?.address?.zip_code}
                    </Typography>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        Mobile Number : {orderQuery.data?.address?.contact_phone}
                    </Typography>
                    <Typography variant={"h6"} component={"p"} minWidth={"45%"} maxWidth={"100%"}>
                        SEND BY : {orderQuery.data?.delivery?.name}
                    </Typography>
                </Box>
            </Box>
        </Stack>
    )
}

export default OrdersDetail