import React, {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import ReportIcon from '@mui/icons-material/Report';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import BallotIcon from '@mui/icons-material/Ballot';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';

import {Navigate, useLocation} from 'react-router-dom';
const Sidebar = () => {
    const [redirect, setRedirect] = useState(null);
    const location = useLocation();

    const handleNavigation = (path) => {
        if (location.pathname === path) {
            return;
        }
        setRedirect(path);
    };
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/Dashboard'},
        { text: 'Task Explorer', icon: <TaskIcon />, path: '/TaskDetails'},
        { text: 'Scrum', icon: <SplitscreenIcon />, path: '/ScrumBoard'},
        { text: 'Sprints', icon: <BallotIcon />, path: '/SprintsDisplay'},
        {text : 'Calender', icon: <EventAvailableIcon />, path: '/Createcalender'},
        { text: 'Meetings', icon: <GroupsIcon />, path: '/Schedulemeeting'},
        { text: 'Documents', icon: <FolderIcon />, path: '/Sharedoc'},
        { text: 'Logout', icon: <LogoutIcon /> , path: '/LoginPM'},

    ];

    return (
        <Box
            sx={{
                width: 250,
                backgroundColor: '#191C24',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Set min-height to fill the screen
                paddingLeft: '2vh',
                paddingRight: '2vh',
                paddingTop: '5vh',
                paddingBottom: '5vh',
                position: 'sticky', // Sticky position to remain visible when scrolling
                top: 0, // Stick to the top
            }}
        >
            <div
                className="logo"
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 50,
                    marginTop: 50,
                    textAlign: 'center',
                }}
            >
                Project Management System
            </div>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={{
                                borderRadius: '5px',
                                marginBottom: '10px',
                                '&:hover': {
                                    backgroundColor: '#0A2744',
                                },
                                border: '1px solid #095BAD', // Add border
                                color: '#fff', // Text color
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background color
                            }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <ListItemIcon sx={{ color: '#fff' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
