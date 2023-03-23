import {Box, Divider, Tooltip, Typography} from "@mui/material";
import {Category, Chat, Dashboard, Group, Inventory, Settings, Widgets} from "@mui/icons-material";
import {Link} from "react-router-dom";

const SideBar = () => {
    const handleClick = (e) => {
        const lists = document.getElementsByClassName("sidebar-wrapper-inner-list-item")
        for (let i = 0; i < lists.length; i++) {
            lists[i].classList.remove("active")
        }
        e.currentTarget.classList.toggle("active")
    }

    return (

        <Box id={"sidebar"} className={"sidebar"} sx={{backgroundColor: "background.main"}}>
            <Box className={"sidebar-wrapper"}>
                <Box className={"sidebar-wrapper-inner"}>
                    <ul className={"sidebar-wrapper-inner-list"}>
                        <Link to={"/admin/dashboard"} className={"sidebar-link"}>
                            <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                                <Tooltip title={"Dashboard"} arrow>
                                    <Dashboard/>
                                </Tooltip>
                                <Typography variant={"h6"}>
                                    Dashboard
                                </Typography>

                            </li>
                        </Link>
                        <Link to={"/admin/users"} className={"sidebar-link"}>
                            <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                                <Tooltip title={"users"} arrow>
                                    <Group/>
                                </Tooltip>
                                <Typography variant={"h6"}>
                                    Users
                                </Typography>
                            </li>
                        </Link>
                        <Link to={"/admin/products"} className={"sidebar-link"}>
                            <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                                <Tooltip title={"Products"} arrow>
                                    <Inventory/>
                                </Tooltip>
                                <Typography variant={"h6"}>
                                    Products
                                </Typography>
                            </li>
                        </Link>
                        <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                            <Tooltip title={"Categories"} arrow>
                                <Category/>
                            </Tooltip>
                            <Typography variant={"h6"}>
                                Categories
                            </Typography>
                        </li>
                        <Divider variant={"fullWidth"}/>
                        <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                            <Tooltip title={"Settings"} arrow>
                                <Settings/>
                            </Tooltip>
                            <Typography variant={"h6"}>
                                Settings
                            </Typography>
                        </li>
                        <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                            <Tooltip title={"Widgets"} arrow>
                                <Widgets/>
                            </Tooltip>
                            <Typography variant={"h6"}>
                                Widgets
                            </Typography>
                        </li>
                        <li className={"sidebar-wrapper-inner-list-item"} onClick={handleClick}>
                            <Tooltip title={"Chat"} arrow>
                                <Chat/>
                            </Tooltip>
                            <Typography variant={"h6"}>
                                Chat
                            </Typography>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Box>
    )
}

export default SideBar