import {Chip} from "@mui/material";

const ProductAttribute = ({value, keyValue, handleVariant, variants}) => {
    const handleClick = () => {
        handleVariant(keyValue, value)
    }
    return (
        <Chip color={"primary"} sx={{minWidth: 50}} data-key={keyValue}
              variant={variants[keyValue] === value ? "filled" : "outlined"} label={value}
              onClick={handleClick}/>
    )
}

export default ProductAttribute