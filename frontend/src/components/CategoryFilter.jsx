import {Checkbox, ListItemButton, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const CategoryFilter = ({data, filters, setFilters}) => {
    const [check, setCheck] = useState(false)
    const {category} = useParams()

    const handleChange = () => {
        setCheck(prevState => !prevState)
        let readyFilters = filters
        if (check) {
            readyFilters.category = readyFilters.category.filter(item => item !== data.slug)
            setFilters(readyFilters)
        } else {
            readyFilters.category = [...readyFilters.category, data.slug]
            setFilters(readyFilters)

        }

    }
    useEffect(() => {
        setCheck(category === data.slug ? true : false)
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
export default CategoryFilter