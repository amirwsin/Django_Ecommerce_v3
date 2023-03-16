import {Box, Collapse, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";

const SideBarMenu = () => {
    const [open,setOpen] = useState(false)

    const handleClick = () => {
      setOpen(prevState => !open)
    }

    return (
        <Box className={"sidebar-menu"}>
            <Typography className={"logo-text"} component={Link} to={"/"} sx={{textAlign: "center"}}>
                Logo
            </Typography>
            <List sx={{width: '100%'}}
                  component="nav"
                  aria-labelledby="sidebar-menu-list">
                <ListItemButton component={Link} to={"/"}>
                    <ListItemText primary={"Home"}/>
                </ListItemButton>
                <ListItemButton  onClick={handleClick}>
                    <ListItemText primary={"Category"}/>
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="cloth"/>
                        </ListItemButton>
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