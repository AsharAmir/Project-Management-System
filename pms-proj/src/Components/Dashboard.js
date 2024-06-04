import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom'; // Import Navigate
import Sidebar from './Sidebar';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const Root = styled('div')`
    display: flex;
    background: #232526;  // fallback for old browsers
    background: -webkit-linear-gradient(to left, #414345, #232526);  // Chrome 10-25, Safari 5.1-6
    background: linear-gradient(to left, #414345, #232526); // W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+
    overflow-y: hidden;
`;

const Content = styled('div')({
    flexGrow: 1,
    padding: '20px',
});

const ContentContainer = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'rgba(25,28,36,0.66)',
    marginTop: theme.spacing(3),
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(7.5px)',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.18 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    'h4': {
        color: '#fff',
    },
}));

const GreetingContainer = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'rgba(25,28,36,0.66)',
    marginLeft: 'auto', // Align to the right
    textAlign: 'right',
    backdropFilter: 'blur(7.5px)',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.18 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    'h5': {
        color: '#fff',
    },
    'p': {
        color: '#fff',
    }
}));

const ProjectCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '10px',
    backgroundColor: 'rgba( 255, 255, 255, 0.3 )',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.18 )',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        backgroundColor: '#0A2744',
        transform: 'scale(1.009)'
    },
    'h6': {
        fontWeight: 'bold',
        fontFamily: 'Garamond',
        color: '#fff',
    },
    'p': {
        fontSize: '1.2rem',
        fontFamily: 'Garamond',
        color: '#fff',
    }
}));

const AddProjectButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    borderRadius: '5px',
    marginBottom: '10px',
    '&:hover': {
        backgroundColor: '#0A2744',
    },
    border: '1px solid #095BAD',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

const GreetingBox = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <GreetingContainer>
            <Typography variant="h5">Hello there, Proj Manager!</Typography>
            <Typography variant="body1">{time.toLocaleTimeString()}</Typography>
        </GreetingContainer>
    );
};

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/projects/fetchAll')
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleAddProject = () => {
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/createProject" />;
    }

    const handleProjectClick = (projectId) => {
        navigate(`/ProjectDetails/${projectId}`);
    };

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <Content>
                    <GreetingBox />
                    <ContentContainer>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom>
                                    Projects
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {projects.map((project, index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                            <ProjectCard onClick={() => handleProjectClick(project.projectId)}>
                                                <CardContent>
                                                    <Typography variant="h6">Project: {project.projectName}</Typography>
                                                    <Typography variant="body2">{project.description}</Typography>
                                                </CardContent>
                                            </ProjectCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <AddProjectButton variant="contained" color="primary" onClick={handleAddProject}>
                                    Add Project
                                </AddProjectButton>
                            </Grid>
                        </Grid>
                    </ContentContainer>
                </Content>
            </Root>
        </>
    );
};

export default Dashboard;
