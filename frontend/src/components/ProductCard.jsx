import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, Button, IconButton, Skeleton, Tooltip} from "@mui/material";
import {AddShoppingCart, Favorite, FavoriteBorder, Grade, Recommend} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


export const ProductCardSkeleton = () => {
    return (
        <Card sx={{maxWidth: 250}} className={"product-card"}>
            <Box sx={{overflow: "hidden"}}>
                <Skeleton variant={"rectangular"} width={250} height={160} animation="wave"/>
                {/*<Typography component={"span"} className={"product-card-discount"}>10%</Typography>*/}
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Skeleton variant={"rectangular"} width={"40%"} animation="wave"/>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Skeleton variant={"rectangular"} height={50} animation="wave"/>
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Skeleton variant={"circular"} width={40} height={40} animation="wave"/>
                </IconButton>
                <IconButton>
                    <Skeleton variant={"circular"} width={40} height={40} animation="wave"/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

const ProductCard = (data) => {

    const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY87Gp2WH3PkTHQ7ZlBx_1QGp6rUMw0iJpiQ&usqp=CAU"

    const {user} = useSelector(state => state.authReducer)

    const readyData = user !== "undefined" ? JSON.parse(user) : false

    const filterMedia = (item) => {
        let result;
        if (item) {
            result = item.find(item => {
                return item.is_feature === true
            })
        }
        return result
    }

    const handleWishList = () => {
        let result
        const wishList = readyData?.wishList
        result = wishList?.find(item => {
            return item.product === data.data.id
        })
        return result
    }


    const inventory = data.data.inventory
    const media = filterMedia(inventory.media)
    const is_wished = handleWishList()


    return (
        <Card sx={{minWidth: 250, maxWidth: 250}} className={"product-card"}>
            <CardContent >
                <Link to={`/product/${data?.data.slug}`} style={{textDecoration: "none"}}>
                    <Typography className={"product-card-title"} textAlign={"center"} variant="h6" component={"h2"}
                    >
                        {data?.data.name}
                    </Typography>
                </Link>
            </CardContent>
            <Box sx={{overflow: "hidden"}}>
                <Link to={`/products/${data?.data.web_id}/${data?.data.slug}/`}>
                    <CardMedia
                        sx={{height: 220}}
                        component="img"
                        className={"product-card-image"}
                        alt={media != null ? media.alt_text : "image product"}
                        image={media?.image} loading={"lazy"}
                    />
                </Link>
            </Box>
            <CardActions
                sx={{alignSelf: "end", display: "flex", justifyContent: "center", alignItems: "center", marginTop: 1}}>
                <Button variant={"contained"} color={"primary"} sx={{
                    padding: 0.6,
                    minWidth: "60%",
                    textAlign: "center",
                    fontWeight: 600,
                    color: "primary.contrast"
                }}>${data?.data?.inventory?.sale_price}</Button>
            </CardActions>
        </Card>
    )
}
export default ProductCard