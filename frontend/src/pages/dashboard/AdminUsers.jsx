import {Box, Container} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import {GetAllUsers} from "../../features/api/cmsApi";
import {CheckBox, IndeterminateCheckBox} from "@mui/icons-material";
import {useState} from "react";

const columns = [
    {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
    {field: "username", headerName: "USERNAME", flex: 1},
    {field: "email", headerName: "EMAIL", flex: 1},
    {field: "first_name", headerName: "FIRST NAME", flex: 1},
    {field: "last_name", headerName: "LAST NAME", flex: 1},
    {
        field: "is_active",
        headerName: "ACTIVE",
        headerAlign: "center",
        align: "center",
        renderCell: ({row: {is_active}}) => {
            return (
                is_active ? <CheckBox color={"success"}/> : <IndeterminateCheckBox color={"error"}/>
            )
        },
    },
    {
        field: "is_staff",
        headerName: "STAFF",
        headerAlign: "center",
        align: "center",
        renderCell: ({row: {is_staff}}) => {
            return (
                is_staff ? <CheckBox color={"success"}/> : <IndeterminateCheckBox color={"error"}/>
            )
        },
    },
    {
        field: "is_superuser",
        headerName: "SUPERUSER",
        headerAlign: "center",
        align: "center",
        renderCell: ({row: {is_superuser}}) => {
            return (
                is_superuser ? <CheckBox color={"success"}/> : <IndeterminateCheckBox color={"error"}/>
            )
        },
    },
    {field: "last_login", headerName: "LAST LOGIN", flex: 1},
    {field: "date_joined", headerName: "DATE JOINED", flex: 1},
]
const mockData = [{
    id: 1,
    username: "admin",
    email: "example@gmail.com"
}]

const AdminUsers = () => {
    const [page,setPage] = useState(0)


    const userQuery = useQuery({
        queryKey: ["users"],
        queryFn: () => GetAllUsers()
    })

    return (
        <Container maxWidth={"xll"} sx={{paddingY: 2}}>
            <Box className={"card"} sx={{
                padding: 0,
                margin: 0,
                minHeight:"600px",
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
                <DataGrid paginationMode="server" checkboxSelection rows={userQuery.data ? userQuery.data.results : mockData} columns={columns}
                          components={{Toolbar: GridToolbar}}/>
            </Box>
        </Container>
    )
}
export default AdminUsers