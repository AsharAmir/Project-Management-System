import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Button, Typography, Select, MenuItem, TextField, Paper } from '@mui/material';
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
    background: #232526;
    background: -webkit-linear-gradient(to right, #232526, #414345);
    background: linear-gradient(to left, #232526, #414345);
    height: 100vh;
`;

const Content = styled('div')({
    flexGrow: 1,
    padding: '20px',
    color: '#fff',
});

const ContentContainer = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: 'rgba(25,28,36,0.66)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: '#fff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    borderRadius: '5px',
    marginBottom: '10px',
    '&:hover': {
        backgroundColor: '#0A2744',
    },
    border: '1px solid #095BAD',
    color: '#fff',
    backgroundColor: 'rgba(82,211,177,0.07)',
}));

const StyledSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 1)',
    },
    '& .MuiSelect-icon': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiSelect-iconOpen': {
        color: 'rgba(255, 255, 255, 1)',
    },
    color: 'rgba(255, 255, 255, 0.87)',
});

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 1)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(255, 255, 255, 1)',
        },
        color: 'rgba(255, 255, 255, 0.87)',
    },
    '& .MuiInputLabel-outlined': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'rgba(255, 255, 255, 1)',
    },
});

const AddTaskToProject = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/projects/fetchAll');
            if (!response.ok) {
                throw new Error(`Error fetching projects: ${response.statusText}`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Projects data is not an array');
            }
            setProjects(data);
        } catch (error) {
            console.error(error);
            setError('Error fetching projects');
        }
    };

    const handleProjectChange = (event) => {
        setSelectedProject(parseInt(event.target.value, 10));
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!selectedProject || !description || !priority || !startDate || !endDate || !taskName) {
            alert("Please fill in all fields");
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert("Start date cannot be after end date");
            return;
        }

        const taskData = {
            taskName,
            description,
            priority,
            startDate,
            endDate,
            projectID: selectedProject,
            taskStatus: "Pending"
        };

        try {
            const res = await axios.post('http://localhost:3000/api/tasks/addTask', taskData);
            alert('Task added successfully');
            setTaskName('');
            setDescription('');
            setPriority('low');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error(error);
            setError('Error adding task: ' + JSON.stringify(error.response.data));
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <Content>
                    <ContentContainer>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Add Task to Project
                        </Typography>
                        <StyledSelect
                            value={selectedProject}
                            onChange={handleProjectChange}
                            fullWidth
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Project' }}
                        >
                            <MenuItem value="" disabled>
                                Select Project
                            </MenuItem>
                            {projects.map((project) => (
                                <MenuItem key={project.projectId} value={project.projectId}>
                                    {project.projectName}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                        <StyledTextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <StyledTextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <StyledSelect
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            fullWidth
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Priority' }}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="normal">Normal</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </StyledSelect>
                        <StyledTextField
                            label="Start Date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            margin="normal"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <StyledTextField
                            label="End Date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            margin="normal"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <StyledButton onClick={handleAddTask} variant="contained" color="primary">
                            Add Task
                        </StyledButton>
                    </ContentContainer>
                </Content>
            </Root>
        </>
    );
};

export default AddTaskToProject;
