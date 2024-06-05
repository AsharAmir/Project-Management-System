import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography, Box, Container, MenuItem, FormControl, Select, Button, CircularProgress } from '@mui/material';
import Sidebar from './Sidebar';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const AddTaskButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const TaskManager = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/projects/fetchAll');
            if (response.status !== 200) {
                throw new Error(`Error fetching projects: ${response.statusText}`);
            }
            const data = response.data;
            if (Array.isArray(data)) {
                setProjects(data);
            } else {
                throw new Error('Projects data is not an array');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching projects');
            setLoading(false);
        }
    };

    const DeleteButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
        backgroundColor: 'rgba(155,40,31,0.85)', // Red color
        '&:hover': {
            backgroundColor: 'rgba(189,52,52,0.8)', // Darker red on hover
        },
    }));

    const handleProjectChange = (event) => {
        const projectId = event.target.value;
        setSelectedProject(projectId);
        fetchTasks(projectId);
    };

    const fetchTasks = async (projectId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/tasks/GetByProject/${projectId}`);
            if (response.status !== 200) {
                throw new Error(`Error fetching tasks: ${response.statusText}`);
            }
            let tasks = response.data;
            tasks.sort((a, b) => {
                const priorityOrder = ['high', 'normal', 'low'];
                return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
            });
            setTasks(tasks);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching tasks');
            setLoading(false);
        }
    };


    const deleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/tasks/deleteTask/${taskId}`);
            if (response.status !== 200) {
                throw new Error(`Error deleting task: ${response.statusText}`);
            }
            // If deletion is successful, refetch tasks
            fetchTasks(selectedProject);
        } catch (error) {
            console.error(error);
        }
    };


    const markAsDone = async (taskId) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/tasks/MarkAsDone/${taskId}`);
            if (response.status !== 200) {
                throw new Error(`Error marking task as done: ${response.statusText}`);
            }
            // Refetch tasks after marking as done
            fetchTasks(selectedProject);
        } catch (error) {
            console.error(error);
            setError('Error marking task as done');
        }
    };

    const navigate = useNavigate();
    const addTask = async () => {
        // Navigate to CreateTask page
        navigate('/CreateTask');
    };

    const assignMember = (taskId) => {
        // Navigate to AssignMember page
        navigate(`/assignMember/${taskId}`);
    };

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <MainContainer>
                    <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
                        Task Manager
                    </Typography>
                    {loading ? (
                        <CircularProgress style={{ color: '#fff' }} />
                    ) : (
                        <>
                            <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
                                <Select
                                    value={selectedProject}
                                    onChange={handleProjectChange}
                                    displayEmpty
                                    style={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    <MenuItem value="" disabled>
                                        Select Project
                                    </MenuItem>
                                    {projects.map((project) => (
                                        <MenuItem key={project.projectId} value={project.projectId}>
                                            {project.projectName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error && (
                                <Typography variant="body2" style={{ color: 'red' }}>
                                    {error}
                                </Typography>
                            )}
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <SectionBox key={task.taskId}>
                                        <Typography variant="h6">{task.taskName}</Typography>
                                        <Typography variant="body1">{task.description}</Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="body1">
                                                    Start Date: {new Date(task.startDate).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="body1">
                                                    End Date: {new Date(task.endDate).toLocaleDateString()}
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                        <Typography variant="body1">Priority: {task.priority}</Typography>
                                        <Typography variant="body1">Status: {task.status}</Typography>
                                        <AddTaskButton
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: '1px', backgroundColor: task.status === 'done' ? 'grey' : 'primary' }}
                                            onClick={() => markAsDone(task.taskId)}
                                            disabled={task.status === 'Done'}
                                        >
                                            Mark as Done
                                        </AddTaskButton>
                                        <AddTaskButton
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: '1px', marginLeft: '2px' }}
                                            onClick={() => assignMember(task.taskId)}
                                            disabled={task.status === 'Done'}
                                        >
                                            Assign Member
                                        </AddTaskButton>
                                        <DeleteButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => deleteTask(task.taskId)}
                                            disabled={task.status === 'Done'}
                                        >
                                            Delete Task
                                        </DeleteButton>
                                    </SectionBox>
                                ))
                            ) : (
                                selectedProject && (
                                    <Typography variant="body2" style={{ color: '#fff' }}>
                                        No tasks found for the selected project.
                                    </Typography>
                                )
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px', width: '100%'}}
                                onClick={addTask}
                            >
                                Create New Task
                            </Button>
                        </>
                    )}
                </MainContainer>
            </Root>
        </>
    );
};

export default TaskManager;
