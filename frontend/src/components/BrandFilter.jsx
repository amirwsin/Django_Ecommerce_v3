import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Checkbox, ListItemButton, ListItemText} from "@mui/material";

const BrandFilter = ({data, filters, setFilters}) => {
    const [check, setCheck] = useState(false)
    const {category} = useParams()

    const handleChange = () => {
        setCheck(prevState => !prevState)
        let readyFilters = filters
        if (check) {
            readyFilters.brand = readyFilters.brand.filter(item => item !== data.name)
            setFilters(readyFilters)
        } else {
            readyFilters.brand = [...readyFilters.brand, data.name]
            setFilters(readyFilters)

        }

    }
    useEffect(() => {
        setCheck(false)
    }, [category])

    return (
        <ListItemButton sx={{pl: 4}} onClick={handleChange}>
            <ListItemText primary={data.name}/>
            <Checkbox
                checked={check}
                inputProps={{'aria-label': 'controlled'}}
            />
        </ListItemButton>
    )
}

export default BrandFilter