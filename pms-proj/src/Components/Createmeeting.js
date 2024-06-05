import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from '@mui/system/styled';
import { Container, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import Sidebar from './Sidebar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    body {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
`;

const Root = styled('div')`
    display: flex;
    background: #232526;  // fallback for old browsers
    background: -webkit-linear-gradient(to left, #414345, #232526);  // Chrome 10-25, Safari 5.1-6
    background: linear-gradient(to left, #414345, #232526); // W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+
    overflow-y: auto;
    height: 100vh;  // Ensure it takes full height for scrolling
`;
const MainContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: 'rgba(25,28,36,0.66)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    height: '80vh', // Adjust height as needed
    overflowY: 'auto',
    // Hide scrollbar for Chrome, Safari and Opera
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    // Hide scrollbar for IE, Edge and Firefox
    '-ms-overflow-style': 'none',  // IE and Edge
    'scrollbar-width': 'none',  // Firefox
    color: '#fff',
    '& h4': {
        fontWeight: 'bold',
        marginBottom: theme.spacing(5),
    },
}));

const SectionBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'rgba( 255, 255, 255, 0.1 )',
    marginBottom: theme.spacing(3),
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    '& h6': {
        fontWeight: 'bold',
        color: '#fff',
    },
    '& p': {
        color: '#fff',
    },
}));

const Createmeeting = () => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [projectId, setProjectId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/meetings/create', {
                title: meetingTitle,
                description: meetingDescription,
                projectId,
            });
            console.log('Response:', response.data);
            setLoading(false);
            navigate(`/meetings/${response.data.meetingId}`);
        } catch (error) {
            console.error(error);
            setError('Error creating meeting');
            setLoading(false);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <MainContainer>
                    <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
                        Create a New Meeting
                    </Typography>
                    {loading ? (
                        <CircularProgress style={{ color: '#fff' }} />
                    ) : (
                        <>
                            {error && <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>}
                            <TextField
                                label="Meeting Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={meetingTitle}
                                onChange={(e) => setMeetingTitle(e.target.value)}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <TextField
                                label="Meeting Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={meetingDescription}
                                onChange={(e) => setMeetingDescription(e.target.value)}
                                multiline
                                rows={4}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <TextField
                                label="Project ID"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginTop: '20px' }}>
                                Create Meeting
                            </Button>
                        </>
                    )}
                </MainContainer>
            </Root>
        </>
    );
};

export default Createmeeting;
