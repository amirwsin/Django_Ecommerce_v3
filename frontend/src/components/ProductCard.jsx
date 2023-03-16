import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, IconButton, Skeleton} from "@mui/material";
import {AddShoppingCart, Favorite} from "@mui/icons-material";
import {Link} from "react-router-dom";


export const ProductCardSkeleton = () => {
    return (
        <Card sx={{maxWidth: 250}} className={"product-card"}>
            <Box sx={{overflow: "hidden"}}>
                <Skeleton variant={"rectangular"} width={250} height={160} animation="wave"/>
                <Typography component={"span"} className={"product-card-discount"}>10%</Typography>
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

    const filterMedia = (item) => {
        let result;
        if (item) {
            result = item.find(item => {
                return item.is_feature === true
            })
        }
        return result
    }



    const inventory = data.data.inventory
    const media = filterMedia(inventory.media)


    return (
        <Card sx={{minWidth: 250, maxWidth: 250}} className={"product-card"}>
            <Box sx={{overflow: "hidden"}}>
                <Link to={`/product/${data?.data.slug}`}>
                    <CardMedia
                        sx={{height: 160}}
                        component="img"
                        className={"product-card-image"}
                        alt={media != null ? media.alt_text : "image product"}
                        image={media?.image}
                    />
                </Link>
                <Typography component={"span"} className={"product-card-discount"}>10%</Typography>
            </Box>
            <CardContent>
                <Typography className={"product-card-title"} variant="h6" component={Link}
                            to={`/product/${data?.data.slug}`}>
                    {data?.data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" marginTop={2}>
                    {data.data.description.length > 30 ? data.data.description.substring(0, 30) + " . . . " : data.data.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default ProductCard