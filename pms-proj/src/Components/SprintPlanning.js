import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Root = styled('div')({
    display: 'flex',
});

const MainContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: 'rgba(25,28,36,0.66)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const TaskList = styled(Box)(({ theme }) => ({
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
}));

const SprintPlanning = ({ projectId }) => {

    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [sprintName, setSprintName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sprintGoal, setSprintGoal] = useState('');
    const [error, setError] = useState(null);
    const [sprintProgress, setSprintProgress] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tasks/GetByProject/${projectId}`);
                setTasks(response.data);
            } catch (error) {
                setError('Error fetching tasks');
            }
        };

        fetchTasks();
    }, [projectId]);

    useEffect(() => {
        const totalTasks = selectedTasks.length;
        if (totalTasks === 0) {
            setSprintProgress(0);
        } else {
            const completedTasks = selectedTasks.filter(taskId => {
                const task = tasks.find(task => task.taskId === taskId);
                return task && task.status === 'Done';

            }).length;
            setSprintProgress((completedTasks / totalTasks) * 100);
        }
    }, [selectedTasks, tasks]);

    const handleTaskSelection = (taskId) => {
        setSelectedTasks(prev =>
            prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
        );
    };

    const navigate = useNavigate();

    const handleStartSprint = async () => {
        try {
            if(!sprintName || !startDate || !endDate || !sprintGoal) {
                alert('Please fill in all fields');
                return;
            }
            if(selectedTasks.length === 0) {
                alert('Please select at least one task');
                return;
            }
            if(new Date(startDate) > new Date(endDate)) {
                alert('End date must be after start date');
                return;
            }
            const response = await axios.post(`http://localhost:3000/api/sprints/createSprint`, {
                projectId,
                sprintName,
                startDate,
                endDate,
                sprintGoal,
            });

            const sprintId = response.data;
            console.log('sprintId:', sprintId)
            console.log('selectedTasks:', selectedTasks);
            await axios.post(`http://localhost:3000/api/sprints/addTasksToSprint/${sprintId}`, { taskIds: selectedTasks });

            alert('Sprint created and tasks added successfully!');
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error starting sprint:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Root>
            <MainContainer>
                <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
                    Sprint Planning
                </Typography>
                <TextField
                    label="Sprint Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={sprintName}
                    onChange={(e) => setSprintName(e.target.value)}
                />
                <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <TextField
                    label="Sprint Goal"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={sprintGoal}
                    onChange={(e) => setSprintGoal(e.target.value)}
                />
                <TaskList>
                    <Typography variant="h6" style={{ color: '#fff' }}>
                        Tasks
                    </Typography>
                    {tasks.map((task) => (
                        <FormControlLabel
                            key={task.taskId}
                            control={
                                <Checkbox
                                    checked={selectedTasks.includes(task.taskId)}
                                    onChange={() => handleTaskSelection(task.taskId)}
                                    color="primary"
                                />
                            }
                            label={task.taskName}
                            style={{ color: '#fff'  }}
                        />
                    ))}
                </TaskList>
                <Typography variant="h6" style={{ color: '#fff', marginTop: '20px' }}>
                    Sprint Progress
                </Typography>
                <LinearProgress color={"success"} variant="determinate" value={sprintProgress} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartSprint}
                    style={{ marginTop: '20px' }}
                >
                    Start Sprint
                </Button>
            </MainContainer>
        </Root>
    );
};

export default SprintPlanning;