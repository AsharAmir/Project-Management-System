import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';
import axios from 'axios';

const CreateProjectForm = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (startDate > endDate) {
            alert("Start date cannot be after end date");
            return;
        }
        if (projectName === '' || description === '' || startDate === '' || endDate === '') {
            alert("Please fill in all fields");
            return;
        }

        const projectData = {
            projectName,
            description,
            startDate,
            endDate,
        };

        try {
            const response = await axios.post('/api/projects/createProject', projectData);
            console.log('Project created:', response.data);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, padding: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Create Project
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Project Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
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
                    <TextField
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
                    <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default CreateProjectForm;
