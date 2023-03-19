import {Avatar, AvatarGroup, Box, Container, Divider, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {
    CheckBox,
    Delete,
    DisabledByDefault,
    Edit,
    IndeterminateCheckBox,
    TaskAlt,
    Visibility
} from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";
import {GetAllProducts} from "../../features/api/cmsApi";
import {Link} from "react-router-dom";
import {useState} from "react";


const AdminProducts = () => {

    const [selectProduct, setSelectProduct] = useState(null)

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: () => GetAllProducts()
    })


    const columns = [
        {field: "web_id", headerName: "WEB ID", align: "left", headerAlign: "left"},
        {field: "name", headerName: "NAME", flex: 1},
        {
            field: "category", headerName: "CATEGORY", flex: 1, renderCell: ({row: {category}}) => {
                return category.name
            }
        },
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
        {
            field: " ", headerName: "ACTION", flex: 1, renderCell: (param) => {
                return (<>
                        <Tooltip title={"brief view"} arrow>
                            <IconButton onClickCapture={() => setSelectProduct(param.row)}>
                                <Visibility color={"action"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title={"Edit Product"}>
                            <IconButton color={"info"} component={Link} to={`${param.row.id}/`}>
                                <Edit fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        },
    ]
    const mockData = [{
        id: 1,
        name: "cream_124",
        category: "cream",
        is_active: true,
        create_at: Date.now(),
        update_at: Date.now(),
    }]


    return (
        <Container maxWidth={"xll"} sx={{paddingY: 2, display: "flex", flexDirection: "column", gap: 2}}>
            {selectProduct && <Detail data={selectProduct} setSelectProduct={setSelectProduct}/>}
            <Box className={"card"} sx={{
                padding: 0,
                margin: 0,
                minHeight: "600px",
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

export const Detail = ({data, setSelectProduct}) => {
    return (
        <Box className={"card"} sx={{padding: 2, height: "fit-content"}} minHeight={320}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} lg={2}>
                    {data.inventory.media.map(item => {
                        return item.is_feature &&
                            <img alt={item.alt_text} src={item.image} key={item.id} className={"card-product-image"}/>
                    })}
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant={"h2"} component={"h1"} fontWeight={400}>
                            {data.name}
                        </Typography>
                        <Box>
                            {data.is_active &&
                            <Tooltip arrow title={"This Product is Active And Customer Can Buy It"}>
                                <IconButton color={"success"}><TaskAlt/></IconButton>

                            </Tooltip>}
                            <Tooltip arrow title={"Edit Product"}>
                                <IconButton color={"info"} component={Link} to={`${data.id}/`}>
                                    <Edit fontSize={"medium"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title={"Close Product View"}>
                                <IconButton color={"error"} onClick={() => setSelectProduct(null)}>
                                    <DisabledByDefault fontSize={"medium"}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <hr/>
                    <Typography component={"p"} variant={"body1"}>
                        {data.description.length > 250 ? data.description.substring(0, 250) + "..." : data.description}
                    </Typography>
                    <hr/>
                    <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2}}>
                        <Box>
                            <Typography>
                                WEB ID : {data.web_id}
                            </Typography>
                            <Typography>
                                SKU : {data.inventory.sku}
                            </Typography>
                            <Typography>
                                UPC : {data.inventory.upc}
                            </Typography>
                        </Box>
                        <Divider orientation={"vertical"} flexItem/>
                        <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 3}}>
                            <Typography>
                                Category : <br/>{data.category.name}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Brand : <br/>{data.inventory.brand.name}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Type : <br/>{data.inventory.product_type.name}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Stock / Sold : <br/>{data.inventory.stock.units} / {data.inventory.stock.units_sold}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Weight(kg) : <br/>{data.inventory.weight}kg
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Retail Price : <br/>${data.inventory.retail_price}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Store Price : <br/>${data.inventory.store_price}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography>
                                Sale Price : <br/>${data.inventory.sale_price}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminProducts