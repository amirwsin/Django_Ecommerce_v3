import {
    Box,
    Button, Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import {useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {GetUserOrders} from "../../features/api/CheckOutApi";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const Orders = () => {
    const {user} = useSelector(state => state.authReducer)
    const [page, setPage] = useState(1)
    const readyUser = JSON.parse(user)
    const navigate = useNavigate()

    const ordersQuery = useQuery({
        queryKey: ["orders", {"page": page}],
        queryFn: () => GetUserOrders(readyUser.id, page),
    })

    const handleClick = (id) => {
        navigate(`${id}/`)
    }


    return (
        <Box className={"panel-box"}>
            <TableContainer sx={{display: "grid"}}>
                <Table sx={{
                    minWidth: 650,
                    "& .MuiTableRow-head": {
                        backgroundColor: "primary.dark",
                    },
                    "& .MuiTableRow-head .MuiTableCell-root": {
                        color: "background.main"
                    },
                    "& tbody .MuiTableRow-root:hover": {
                        backgroundColor: "whitesmoke",
                        cursor: "pointer"
                    }

                }} aria-label="orders list">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">status</TableCell>
                            <TableCell align="center">Payment Status</TableCell>
                            <TableCell align="right">Date Ordered</TableCell>
                            <TableCell align="right">Last Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!ordersQuery.isLoading && ordersQuery.data?.results?.map((item, key) =>
                            <TableRow onClick={() => handleClick(item.id)} key={item.id}
                                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{key + 1}</TableCell>
                                <TableCell align="center">${item.payment.amount}</TableCell>
                                <TableCell align="center">
                                    {item.status === "PENDING" &&
                                    <Button variant={"outlined"} color={"text"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.status}</Button>}
                                    {item.status === "FAILED" &&
                                    <Button variant={"outlined"} color={"error"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.status}</Button>}
                                    {item.status === "PROCESSING" &&
                                    <Button variant={"outlined"} color={"warning"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.status}</Button>}
                                    {item.status === "COMPLETED" &&
                                    <Button variant={"outlined"} color={"info"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.status}</Button>}
                                </TableCell>
                                <TableCell align="center">
                                    {item.payment.status === "PENDING" &&
                                    <Button variant={"contained"} color={"warning"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.payment.status}</Button>}
                                    {item.payment.status === "UNCOMPLETED" &&
                                    <Button variant={"contained"} color={"error"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.payment.status}</Button>}
                                    {item.payment.status === "COMPLETED" &&
                                    <Button variant={"contained"} color={"info"} size={"small"}
                                            sx={{borderRadius: "15rem"}}>{item.payment.status}</Button>}
                                </TableCell>
                                <TableCell align="right">
                                    {`${new Date(item.create_at).toLocaleString('default', {weekday: "long"})},
                                     ${new Date(item.create_at).toLocaleString('default', {month: "long"})} ${new Date(item.create_at).getDay()},
                                      ${new Date(item.create_at).getFullYear()}`}
                                </TableCell>
                                <TableCell align="right">
                                    {`${new Date(item.update_at).toLocaleString('default', {weekday: "long"})},
                                     ${new Date(item.update_at).toLocaleString('default', {month: "long"})} ${new Date(item.update_at).getDay()},
                                      ${new Date(item.update_at).getFullYear()}`}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Pagination page={page} onChange={(e, value) => setPage(value)} sx={{marginY: 2, justifySelf: "end"}}
                            count={!ordersQuery.isLoading ? Math.round(ordersQuery?.data?.count / 30) : page}/>
            </TableContainer>
        </Box>
    )

}

export default Orders