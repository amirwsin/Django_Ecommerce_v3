import {Grid} from "@mui/material";
import * as React from "react";
import CategoryItem, {CategoryItemSkeleton} from "./CategoryItem";


const CategoryMenuList = ({data, isLoading}) => {

    return (
        <Grid container justifyContent={"center"} spacing={2}>
            {!isLoading ?
                data?.results.map((item) => (
                    <Grid key={item.id} item xs={6} sm={2} md={1}>
                        <CategoryItem key={item.id} data={item}/>
                    </Grid>
                )) : <>
                    <Grid item xs={6} sm={2} md={1}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={2} md={1}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={2} md={1}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={2} md={1}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={2} md={1}><CategoryItemSkeleton/></Grid>
                    <Grid item xs={6} sm={2} md={1}><CategoryItemSkeleton/></Grid>
                </>}
        </Grid>
    )
}
export default CategoryMenuList