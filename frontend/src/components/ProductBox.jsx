import {Box} from "@mui/material";
import ProductCard, {ProductCardSkeleton} from "./ProductCard";


const ProductBox = ({data,isLoading}) => {
    return (
        <Box className={"product-box"}>
            {
                !isLoading ? data?.results?.map((item) => (<ProductCard key={item.id} data={item}/>)) :
                    <>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                </>
            }

        </Box>
    )
}

export default ProductBox