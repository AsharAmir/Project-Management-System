import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import {
    Container,
    Box,
    Typography,
    Select,
    MenuItem,
    LinearProgress,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Grid,
    Divider,
    Button
} from '@mui/material';
import Sidebar from './Sidebar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        display: none;
    }

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

const SprintCard = styled(Card)(({ theme }) => ({
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

const AddSprintButton = styled(Button)(({ theme }) => ({
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

const SprintsDisplay = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [sprints, setSprints] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            fetchSprints(selectedProject);
        }
    }, [selectedProject]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/projects/fetchAll');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching projects');
            setLoading(false);
        }
    };

    const fetchSprints = async (projectId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/sprints/GetByProject/${projectId}`);
            console.log(response.data);
            setSprints(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching sprints');
            setLoading(false);
        }
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        setSprints([]);
    };

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <Content>
                    <ContentContainer>
                        <Typography variant="h4" gutterBottom>
                            Sprints Display
                        </Typography>

                        {loading && <LinearProgress />}

                        {error && <Typography color="error">{error}</Typography>}

                        <Box mb={2}>
                            <Select
                                fullWidth
                                value={selectedProject}
                                onChange={handleProjectChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select a Project
                                </MenuItem>
                                {projects.map((project) => (
                                    <MenuItem key={project.projectId} value={project.projectId}>
                                        {project.projectName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        {sprints.length > 0 && (
                            <Box mt={2} width="100%">
                                <Grid container spacing={3} direction="column">
                                    {sprints.map((sprint) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={sprint.sprintId}>
                                            <SprintCard>
                                                <CardContent>
                                                    <Typography variant="h6" gutterBottom>
                                                        {sprint.sprintName}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Start Date: {new Date(sprint.startDate).toLocaleDateString()}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        End Date: {new Date(sprint.endDate).toLocaleDateString()}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                                        Sprint Goal: {sprint.sprintGoal}
                                                    </Typography>
                                                    {sprint.tasks && sprint.tasks.length > 0 ? (
                                                        <List>
                                                            {sprint.tasks.map((task) => (
                                                                <ListItem key={task.taskId}>
                                                                    <ListItemText
                                                                        primary={task.taskName}
                                                                        secondary={`Priority: ${task.priority} | Status: ${task.status}`}
                                                                    />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    ) : (
                                                        <Typography variant="body2" color="textSecondary">
                                                            No tasks in this sprint.
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </SprintCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </ContentContainer>
                </Content>
            </Root>
        </>
    );
};

export default SprintsDisplay;
