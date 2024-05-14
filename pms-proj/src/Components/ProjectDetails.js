import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Paper, Typography, Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import axios from 'axios';
import {useParams} from "react-router-dom";

const Root = styled('div')({
    display: 'flex',
    background: '#232526',  // fallback for old browsers
    background: '-webkit-linear-gradient(to left, #414345, #232526)',  // Chrome 10-25, Safari 5.1-6
    background: 'linear-gradient(to left, #414345, #232526)', // W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+
});

const MainContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: 'rgba(25,28,36,0.66)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
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
    h6: {
        fontWeight: 'bold',
        color: '#fff',
    },
    p: {
        color: '#fff',
    },
}));

const GetProjectByID = () => {
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const { projectId } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/projects/fetchProject/${projectId}`);
                setProject(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching project details');
            }
        };

        fetchProject();
    }, [projectId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <Root>
            <Sidebar />
            <MainContainer>
                <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
                    Project Details
                </Typography>
                <SectionBox>
                    <Typography variant="h6">Project Name</Typography>
                    <Typography variant="body1">{project.projectName}</Typography>
                </SectionBox>
                <SectionBox>
                    <Typography variant="h6">Description</Typography>
                    <Typography variant="body1">{project.description}</Typography>
                </SectionBox>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <SectionBox>
                            <Typography variant="h6">Start Date</Typography>
                            <Typography variant="body1">{project.startDate}</Typography>
                        </SectionBox>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SectionBox>
                            <Typography variant="h6">End Date</Typography>
                            <Typography variant="body1">{project.endDate}</Typography>
                        </SectionBox>
                    </Grid>
                </Grid>
                <SectionBox>
                    <Typography variant="h6">Members</Typography>
                    {project.members && project.members.length > 0 ? (
                        project.members.map((member) => (
                            <Typography key={member.id} variant="body2">
                                {member.name}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body2">No members found</Typography>
                    )}
                </SectionBox>
                <SectionBox>
                    <Typography variant="h6">Tasks</Typography>
                    {project.tasks && project.tasks.length > 0 ? (
                        project.tasks.map((task) => (
                            <Typography key={task.id} variant="body2">
                                {task.name}: {task.description}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body2">No tasks found</Typography>
                    )}
                </SectionBox>
            </MainContainer>
        </Root>
    );
};

export default GetProjectByID;
