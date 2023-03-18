import {Box, Container} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {CheckBox, IndeterminateCheckBox} from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";
import {GetAllProducts} from "../../features/api/cmsApi";

const columns = [
    {field: "web_id", headerName: "WEB ID", align: "left", headerAlign: "left"},
    {field: "name", headerName: "NAME", flex: 1},
    {field: "category", headerName: "FIRST NAME", flex: 1},
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
    {field: "create_at", headerName: "DATE CREATE", flex: 1},
    {field: "update_at", headerName: "DATE UPDATE", flex: 1},
]
const mockData = [{
    id: 1,
    name: "cream_124",
    category: "cream",
    is_active: true,
    create_at: Date.now(),
    update_at: Date.now(),
}]

const AdminProducts = () => {

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: () => GetAllProducts()
    })

    return (
        <Container maxWidth={"xll"} sx={{paddingY: 2}}>
            <Box className={"card"} maxHeight={600} sx={{
                padding: 0,
                margin: 0,
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
                          rows={productsQuery.data ? productsQuery.data.results : mockData} columns={columns}
                          components={{Toolbar: GridToolbar}}/>
            </Box>
        </Container>
    )
}

export default AdminProducts