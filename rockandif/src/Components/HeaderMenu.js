import React from "react";
import "./HeaderMenu.css";
import MenuItem from "@mui/material/MenuItem";
import { Fab} from "@mui/material";
import Menu from "@mui/material/Menu";
import { Link } from 'react-router-dom';

function HeaderMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Fab id="boutonMenu" aria-label="add"
            onClick={handleClick}>
                Menu
            </Fab>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'boutonMenu',
                }}
            >
                <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/french-groups">French groups</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/moroccan-groups">Maroccan groups</Link></MenuItem>
                <MenuItem onClick={handleClose}>HELP (easter egg)</MenuItem>
            </Menu>
        </div>
    );
}

export default HeaderMenu;
