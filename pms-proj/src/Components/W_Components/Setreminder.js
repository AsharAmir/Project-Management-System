import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import { Container, Typography, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Sidebar from '../Sidebar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        display: none;
    }
    body {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;

const Root = styled('div')({
    display: 'flex',
    background: '#232526',
    background: '-webkit-linear-gradient(to left, #414345, #232526)',
    background: 'linear-gradient(to left, #414345, #232526)',
    overflowY: 'auto',
    height: '100vh',
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
    height: '80vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    color: '#fff',
    '& h4': {
        fontWeight: 'bold',
        marginBottom: theme.spacing(5),
    },
}));

const Setreminder = () => {
    const [reminder, setReminder] = useState({ title: '', date: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setReminder({ title: '', date: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReminder({ ...reminder, [name]: value });
    };

    const handleSetReminder = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/reminders', reminder);
            console.log('Response:', response.data);
            setLoading(false);
            handleClose();
            navigate('/reminders');
        } catch (error) {
            console.error(error);
            setError('Error setting reminder');
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
                        Set a Reminder
                    </Typography>
                    {loading ? (
                        <CircularProgress style={{ color: '#fff' }} />
                    ) : (
                        <>
                            {error && <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>}
                            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginBottom: '20px' }}>
                                Set Reminder
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Set New Reminder</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please fill in the details of the new reminder.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Reminder Title"
                                        name="title"
                                        fullWidth
                                        value={reminder.title}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Reminder Date and Time"
                                        type="datetime-local"
                                        name="date"
                                        fullWidth
                                        value={reminder.date}
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
                                    <Button onClick={handleSetReminder} color="primary">
                                        Set Reminder
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

export default Setreminder;
