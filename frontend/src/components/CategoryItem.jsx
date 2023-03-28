import {Box, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";

export const CategoryItemSkeleton = () => {
    return (
        <Box sx={{position: "relative", display: "grid", justifyContent: "center", alignItems: "center", gap: 2}}>
            <Skeleton variant={"circular"} width={84} height={84} animation="wave"/>
            <Skeleton variant={"rectangular"} animation="wave"/>
        </Box>
    )
}

const CategoryItem = ({data, props}) => {
    return (
        <Box sx={{
            position: "relative",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            "&:hover": {
                borderColor:"grey !important"
            }
        }} {...props}>
            <Link to={`/products/${data.slug}/`}>
                <img src={data.image} alt={data.name} loading={"lazy"} className={"category-item-image"}/>
            </Link>
            <Typography component={Link} to={`/products/${data.slug}/`} className={"category-item-link"}
                        align={"center"}>
                {data.name}
            </Typography>
        </Box>
    )
}

export default CategoryItem