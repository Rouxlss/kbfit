import { TurnedInNot } from "@mui/icons-material";
import {
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";

export const SideBar = ({ drawerWidth }) => {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {
                        xs: "block",
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Arnoldo Ortíz
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {[
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                    ].map((month) => {
                        return (
                            <ListItem key={month}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={month} />
                                        <ListItemText secondary={'lorem impsum dolor sit amet'} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </Box>
    );
};
