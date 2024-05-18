import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { styled } from "@mui/system";
import { Paper } from "@mui/material";

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    background: #232526;  // fallback for old browsers
    background: -webkit-linear-gradient(to left, #414345, #232526);  // Chrome 10-25, Safari 5.1-6
    background: linear-gradient(to left, #414345, #232526); // W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+
    color: #fff;
`;

const Root = styled('div')({
    display: 'flex',
    height: '100vh',
});

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: 'rgba(25,28,36,0.8)',
    marginTop: theme.spacing(4),
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    borderRadius: '15px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    textAlign: 'left',
    'h4': {
        color: '#fff',
    }
}));

const StyledTextField = styled(TextField)({
    marginBottom: '16px',
    '& label': {
        color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
    '& .MuiInputBase-input': {
        color: '#fff',
    },
});

const StyledButton = styled(Button)({
    marginTop: '16px',
    backgroundColor: '#414345',
    '&:hover': {
        backgroundColor: '#0A2744',
    },
});

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
            alert('Project created successfully');
            //clear fields
            setProjectName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                    <FormContainer>
                        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
                            Create Project
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <StyledTextField
                                label="Project Name"
                                variant="outlined"
                                fullWidth
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                            <StyledTextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <StyledTextField
                                label="Start Date"
                                variant="outlined"
                                type="date"
                                fullWidth
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
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <StyledButton type="submit" variant="contained" fullWidth>
                                Create
                            </StyledButton>
                        </form>
                    </FormContainer>
                </Box>
            </Root>
        </>
    );
};

export default CreateProjectForm;
