import {Box, Chip, Container} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import {GetAllUsers} from "../../features/api/cmsApi";
import {CheckBox, IndeterminateCheckBox} from "@mui/icons-material";
import {useState} from "react";


const AdminUsers = () => {
    const [page, setPage] = useState(0)


    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left",flex: 0},
        {field: "username", headerName: "USERNAME", flex: 2},
        {field: "email", headerName: "EMAIL", flex: 2},
        {field: "first_name", headerName: "FIRST NAME", flex: 1},
        {field: "last_name", headerName: "LAST NAME", flex: 1},
        {
            field: "is_active",
            headerName: "ACTIVE",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({row: {is_active}}) => {
                return (
                    is_active ? <Chip variant={"filled"} color={"success"} label={"ACTIVE"}/> :
                        <Chip variant={"outlined"} color={"error"} label={"INACTIVE"}/>
                )
            },
        },
        {
            field: "is_staff",
            headerName: "STAFF",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({row: {is_staff}}) => {
                return (
                    is_staff ? <Chip variant={"filled"} color={"warning"} label={"STAFF"}/> :
                        <Chip variant={"outlined"} color={"default"} label={"CUSTOMER"}/>
                )
            },
        },
        {
            field: "is_superuser",
            headerName: "SUPERUSER",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({row: {is_superuser}}) => {
                return (
                    is_superuser ? <Chip variant={"filled"} color={"info"} label={"SUPERUSER"}/> :
                        <Chip variant={"outlined"} color={"default"} label={"NORMAL"}/>
                )
            },
        },
        {
            field: "last_login", headerName: "LAST LOGIN", flex: 2, renderCell: ({row: {last_login}}) => {
                let date = new Date(last_login)
                return `${date.toLocaleString('default', {weekday: "long"})}, ${date.toLocaleString('default', {
                    month: "long",
                })} ${date.getDay()}, ${date.getFullYear()}`
            }
        },
        {
            field: "date_joined", headerName: "DATE JOINED", flex: 2, renderCell: ({row: {date_joined}}) => {
                let date = new Date(date_joined)
                return `${date.toLocaleString('default', {weekday: "long"})}, ${date.toLocaleString('default', {
                    month: "long",
                })} ${date.getDay()}, ${date.getFullYear()}`
            }
        },
    ]
    const mockData = [{
        id: 1,
        username: "admin",
        email: "example@gmail.com"
    }]


    const userQuery = useQuery({
        queryKey: ["users"],
        queryFn: () => GetAllUsers()
    })

    return (
        <Container maxWidth={"xll"} sx={{paddingY: 2}}>
            <Box className={"card"} sx={{
                padding: 0,
                margin: 0,
                height: "100%",
                maxHeight: "600px",
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "action.main",

                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "action.main"
                },
                "& .MuiButtonBase-root": {
                    color: "text.main"
                },
            }}>
                <DataGrid paginationMode="server" checkboxSelection
                          rows={userQuery.data ? userQuery.data?.results : mockData} columns={columns}
                          components={{Toolbar: GridToolbar}} loading={userQuery.isLoading} disableSelectionOnClick autoPageSize/>
            </Box>
        </Container>
    )
}
export default AdminUsers