import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import { Container, Typography, TextField, Button, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Sidebar from './Sidebar';
import { createGlobalStyle } from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

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
    overflow-y: hidden;
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

const CalendarContainer = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgba( 255, 255, 255, 0.1 )',
    marginTop: theme.spacing(3),
    height: '60vh',
    borderRadius: '10px',
    overflowY: 'auto',
    '& .rbc-calendar': {
        backgroundColor: 'rgba( 255, 255, 255, 0.1 )',
        borderRadius: '10px',
        '& .rbc-event': {
            backgroundColor: '#1976d2',
            color: '#fff',
        },
    },
}));

const Createcalender = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/events');
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching events');
            setLoading(false);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewEvent({ title: '', start: '', end: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddEvent = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/events', newEvent);
            setEvents([...events, response.data]);
            setLoading(false);
            handleClose();
        } catch (error) {
            console.error(error);
            setError('Error adding event');
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
                        Create Calender
                    </Typography>
                    {loading ? (
                        <CircularProgress style={{ color: '#fff' }} />
                    ) : (
                        <>
                            {error && <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>}
                            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginBottom: '20px' }}>
                                Add Event
                            </Button>
                            <CalendarContainer>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </CalendarContainer>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Add New Event</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please fill in the details of the new event.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Event Title"
                                        name="title"
                                        fullWidth
                                        value={newEvent.title}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Start Date and Time"
                                        type="datetime-local"
                                        name="start"
                                        fullWidth
                                        value={newEvent.start}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="End Date and Time"
                                        type="datetime-local"
                                        name="end"
                                        fullWidth
                                        value={newEvent.end}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddEvent} color="primary">
                                        Add Event
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </MainContainer>
            </Root>
        </>
    );
};

export default Createcalender;
