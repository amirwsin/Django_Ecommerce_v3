import {Grid} from "@mui/material";
import * as React from "react";
import CategoryItem, {CategoryItemSkeleton} from "./CategoryItem";


const CategoryMenuList = ({data, isLoading}) => {

    return (
        <Grid container justifyContent={"center"} spacing={2}>
            {!isLoading ?
                data?.results.map((item) => (
                    <Grid key={item.id} item xs={6} sm={4} md={3} lg={2}>
                        <CategoryItem key={item.id} data={item}/>
                    </Grid>
                )) : <>
                    <Grid item xs={6} sm={4} md={3} lg={2}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2}><CategoryItemSkeleton/></Grid>
                </>}
        </Grid>
    )
}
export default CategoryMenuList