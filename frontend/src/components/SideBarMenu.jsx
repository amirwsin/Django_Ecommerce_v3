import {Box, Collapse, Divider, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";

const SideBarMenu = ({data, isLoading}) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(prevState => !open)
    }

    return (
        <Box className={"sidebar-menu"}>
            <Typography className={"logo-text"} component={Link} textAlign={"center"} display={"block"} to={"/"}>
                Flower Shop
            </Typography>
            <Divider variant={"middle"}/>
            <List sx={{width: '100%'}}
                  component="nav"
                  aria-labelledby="sidebar-menu-list">
                <ListItemButton component={Link} to={"/"}>
                    <ListItemText primary={"Home"}/>
                </ListItemButton>
                <ListItemButton component={Link} to={"/products"}>
                    <ListItemText primary={"Flowers"}/>
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={"Categories"}/>
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {!isLoading && data.results?.map(item => <ListItemButton sx={{pl: 3}} component={Link}
                                                                                to={`/products/${item.slug}/`}
                                                                                 key={item.id}><ListItemText
                            primary={item.name}/></ListItemButton>)}
                    </List>
                </Collapse>
                <ListItemButton component={Link} to={"/"}>
                    <ListItemText primary={"About us"}/>
                </ListItemButton>
            </List>
        </Box>
    )
}
export default SideBarMenu