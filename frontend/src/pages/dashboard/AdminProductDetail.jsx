import {
    Box,
    Container, Typography,
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {GetProductById} from "../../features/api/cmsApi";
import ProductMain from "../../components/dashboard/ProductMain";
import ProductMediaCard from "../../components/dashboard/ProductMediaCard";
import ProductMediaCardAdd from "../../components/dashboard/ProductMediaCardAdd";
import ProductInventory from "../../components/dashboard/ProductInventory";
import ProductStock from "../../components/dashboard/ProductStock";

const AdminProductDetail = () => {
    const {id} = useParams()

    const productQuery = useQuery({
        queryKey: ["products", id],
        queryFn: () => GetProductById(id)
    })

    return (
        <Container maxWidth={"xll"} sx={{
            paddingY: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "scroll"
        }}>
            <Box className={"card"}>
                <Typography variant={"h3"}>Media Section</Typography>
                <Typography variant={"caption"}>maximum media : 5</Typography>
                <hr/>
                {!productQuery.isLoading &&
                <ProductMedia data={productQuery.data?.inventory?.media} id={productQuery.data?.inventory?.id}/>}
            </Box>
            <Box className={"card"}>
                <Typography variant={"h3"}>Main Section</Typography>
                <hr/>
                {!productQuery.isLoading && <ProductMain data={productQuery.data}/>}
            </Box>
            <Box className={"card"}>
                <Typography variant={"h3"}>Inventory Section</Typography>
                <hr/>
                {!productQuery.isLoading && <ProductInventory data={productQuery.data}/>}
            </Box>
            <Box className={"card"}>
                <Typography variant={"h3"}>Units/Stock Section</Typography>
                <hr/>
                {!productQuery.isLoading && <ProductStock data={productQuery.data}/>}
            </Box>
        </Container>
    )
}

export const ProductMedia = ({data, id}) => {
    return (
        <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2}}>
            {data?.map(media => <ProductMediaCard key={media.id} data={media}/>)}
            {data?.length < 5 && <ProductMediaCardAdd id={id} productId={id}/>}
        </Box>
    )
}


export default AdminProductDetail