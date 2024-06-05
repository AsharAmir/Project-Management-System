import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import { Container, Typography, FormControl, FormControlLabel, Checkbox, Button, CircularProgress, Box } from '@mui/material';
import Sidebar from '../Sidebar';
import { createGlobalStyle } from 'styled-components';

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

const Root = styled('div')({
    display: 'flex',
    background: '#232526',
    background: '-webkit-linear-gradient(to left, #414345, #232526)',
    background: 'linear-gradient(to left, #414345, #232526)',
    overflowY: 'auto',
    height: '100vh',  // Ensure it takes full height for scrolling
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

const Sharemeeting = () => {
    const { meetingId } = useParams();
    const [projectId, setProjectId] = useState(null);
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeetingDetails();
    }, [meetingId]);

    useEffect(() => {
        if (projectId) {
            fetchMembers();
        }
    }, [projectId]);

    const fetchMeetingDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/meetings/GetByMeetingID/${meetingId}`);
            setProjectId(response.data.projectID);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching meeting details');
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/member/fetchByProject/${projectId}`);
            setMembers(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching members');
            setLoading(false);
        }
    };

    const handleCheckboxChange = (memberId) => {
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(memberId)
                ? prevSelected.filter((id) => id !== memberId)
                : [...prevSelected, memberId]
        );
    };

    const handleShare = async () => {
        try {
            console.log("Meeting ID:", meetingId);
            console.log("Selected Members:", selectedMembers);

            const memberIds = [];
            for (const memberId of selectedMembers) {
                const response = await axios.get(`http://localhost:3000/api/member/getMember/${memberId}`);
                memberIds.push(response.data.memberId);
            }

            const responses = await Promise.all(
                memberIds.map(async (memberId) => {
                    const response = await axios.post(`http://localhost:3000/api/shareMeeting/add`, {
                        meetingId,
                        memberId,
                    });
                    console.log("Response:", response.data);
                    setSelectedMembers([]);
                    return response;
                })
            );
        } catch (error) {
            console.error(error);
            setError('Error sharing meeting');
        }
    };

    return (
        <>
            <GlobalStyle />
            <Root>
                <Sidebar />
                <MainContainer>
                    <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
                        Share the Mleting {meetingId}, Project {projectId}
                    </Typography>
                    {loading ? (
                        <CircularProgress style={{ color: '#fff' }} />
                    ) : (
                        <>
                            {error && <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>}
                            <FormControl component="fieldset">
                                {members.map((member) => (
                                    <FormControlLabel
                                        key={member.memberId}
                                        control={
                                            <Checkbox
                                                checked={selectedMembers.includes(member.memberId)}
                                                onChange={() => handleCheckboxChange(member.memberId)}
                                                name={member.memberName}
                                            />
                                        }
                                        label={member.memberName}
                                    />
                                ))}
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={handleShare} style={{ marginTop: '20px' }}>
                                Share Meeting
                            </Button>
                        </>
                    )}
                </MainContainer>
            </Root>
        </>
    );
};

export default Sharemeeting;
