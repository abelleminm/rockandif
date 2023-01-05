import React from "react";
import "./HeaderMenu.css";
import MenuItem from "@mui/material/MenuItem";
import { Fab } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useNavigate } from 'react-router-dom';
import ScriptTag from 'react-script-tag';
import script1 from "../scripts/gravity/script1";
import script2 from "../scripts/gravity/script2.js";
import box2djs from "../scripts/gravity/box2djs";

function HeaderMenu() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [gravityScripts, setGravity] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const easterEgg = () =>{
        setGravity(<> <ScriptTag>{script1}</ScriptTag>
        <ScriptTag>{box2djs}</ScriptTag>
        <ScriptTag>{script2}</ScriptTag></>);
        handleClose();
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
                <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/french-groups")}>French groups</MenuItem>
                <MenuItem onClick={() => navigate("/moroccan-groups")}>Moroccan groups</MenuItem>
                {/* <MenuItem onClick={easterEgg}>Help</MenuItem> */}

            </Menu>
            {gravityScripts}
        </div>
    );
}

export default HeaderMenu;
