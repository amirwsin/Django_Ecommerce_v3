import {Avatar, AvatarGroup, Box, Chip, Container, Divider, Grid, IconButton, Tooltip, Typography} from "@mui/material";
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
import {useMutation, useQuery} from "@tanstack/react-query";
import {GetAllProducts, ProductDelete} from "../../features/api/cmsApi";
import {Link} from "react-router-dom";
import {useState} from "react";


const AdminProducts = () => {

    const [selectProduct, setSelectProduct] = useState(null)

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: () => GetAllProducts()
    })


    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
        {field: "web_id", headerName: "WEB ID", align: "left", headerAlign: "left"},
        {field: "name", headerName: "NAME", flex: 2},
        {
            field: "category", headerName: "CATEGORY", flex: 1, renderCell: ({row: {category}}) => {
                return category.name
            }
        },
        {
            field: "price", headerName: "Price", headerAlign: "left",
            align: "left", flex: 1, renderCell: ({row: {inventory}}) => {
                return `$${inventory?.sale_price}`
            }
        },
        {
            field: "is_active",
            headerName: "VISIBlE",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({row: {is_active}}) => {
                return (
                    is_active ? <Chip variant={"filled"} color={"success"} label={"VISIBlE"}/> :
                        <Chip variant={"outlined"} color={"error"} label={"INVISIBLE"}/>
                )
            },
        },
        {
            field: "create_at", headerName: "DATE CREATE", flex: 2, renderCell: ({row: {create_at}}) => {
                let date = new Date(create_at)
                return `${date.toLocaleString('default', {weekday: "long"})}, ${date.toLocaleString('default', {
                    month: "long",
                })} ${date.getDay()}, ${date.getFullYear()}`
            }
        },
        {
            field: "update_at", headerName: "DATE UPDATE", flex: 2, renderCell: ({row: {update_at}}) => {
                let date = new Date(update_at)
                return `${date.toLocaleString('default', {weekday: "long"})}, ${date.toLocaleString('default', {
                    month: "long",
                })} ${date.getDay()}, ${date.getFullYear()}`
            }
        },
        {
            field: " ", headerName: "ACTION", flex: 2, renderCell: (param) => {
                return (<Box>
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
                        <Tooltip arrow title={"Delete Product"}>
                            <IconButton color={"error"} onClick={() => handleDelete(param.row.id)}>
                                <Delete fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
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
    const productDeleteMutation = useMutation({
        mutationFn: (data) => ProductDelete(data)
    })

    const handleDelete = (id) => {
        productDeleteMutation.mutate(id)
    }


    return (
        <Container maxWidth={"xll"} sx={{
            paddingY: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "scroll"
        }}>
            {selectProduct && <Detail data={selectProduct} setSelectProduct={setSelectProduct}/>}
            <Box className={"card"} sx={{
                padding: 0,
                marginX: 0,
                marginY: 2,
                minHeight: "600px",
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "action.main",
                },
                "& .MuiDataGrid-columnHeader:last-child": {
                    minWidth: {xs: "150px !important"}
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "action.main"
                },
                "& .MuiButtonBase-root": {
                    color: "text.main"
                },
                "& .MuiDataGrid-cell:last-child": {
                    minWidth: {xs: "10rem !important",md:"17rem !important"}
                }
            }}>
                <DataGrid paginationMode="server" checkboxSelection
                          rows={productsQuery.data ? productsQuery.data.results : mockData} columns={columns}
                          components={{Toolbar: GridToolbar}} loading={productsQuery.isLoading}/>
            </Box>
        </Container>
    )
}

export const Detail = ({data, setSelectProduct}) => {
    return (
        <Box className={"card"} sx={{padding: 2}}>
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
                    <div dangerouslySetInnerHTML={{
                        __html: data?.description ? data.description.substring(0, 250) + "..." :
                            "Loading . . . "
                    }}/>
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
                            <Typography variant={"subtitle1"} component={"p"}>
                                Category : <br/>{data.category.name}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Brand : <br/>{data.inventory.brand.name}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Type : <br/>{data.inventory.product_type.name}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Stock / Sold : <br/>{data.inventory.stock.units} / {data.inventory.stock.units_sold}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Weight(kg) : <br/>{data.inventory.weight}kg
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Retail Price : <br/>${data.inventory.retail_price}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Store Price : <br/>${data.inventory.store_price}
                            </Typography>
                            <Divider orientation={"vertical"} flexItem/>
                            <Typography variant={"subtitle1"} component={"p"}>
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