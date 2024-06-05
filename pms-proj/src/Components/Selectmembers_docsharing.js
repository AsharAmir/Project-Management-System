// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { styled } from '@mui/system';
// import { Container, Typography, FormControl, FormControlLabel, Checkbox, Button, CircularProgress, Box } from '@mui/material';
// import Sidebar from './Sidebar';
// import { createGlobalStyle } from 'styled-components';
//
// const GlobalStyle = createGlobalStyle`
//     /* Hide scrollbar for Chrome, Safari and Opera */
//     ::-webkit-scrollbar {
//         display: none;
//     }
//
//     /* Hide scrollbar for IE, Edge and Firefox */
//     body {
//         -ms-overflow-style: none;  /* IE and Edge */
//         scrollbar-width: none;  /* Firefox */
//     }
// `;
//
// const Root = styled.div`
//     display: flex;
//     background: #232526;  // fallback for old browsers
//     background: -webkit-linear-gradient(to left, #414345, #232526);  // Chrome 10-25, Safari 5.1-6
//     background: linear-gradient(to left, #414345, #232526); // W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+
//     overflow-y: auto;
//     height: 100vh;  // Ensure it takes full height for scrolling
// `;
// const MainContainer = styled(Container)(({ theme }) => ({
//     marginTop: theme.spacing(5),
//     padding: theme.spacing(3),
//     backgroundColor: 'rgba(25,28,36,0.66)',
//     backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
//     backdropFilter: 'blur(15px)',
//     boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
//     borderRadius: '10px',
//     border: '1px solid rgba( 255, 255, 255, 0.18 )',
//     height: '80vh', // Adjust height as needed
//     overflowY: 'auto',
//     // Hide scrollbar for Chrome, Safari and Opera
//     '&::-webkit-scrollbar': {
//         display: 'none',
//     },
//     // Hide scrollbar for IE, Edge and Firefox
//     '-ms-overflow-style': 'none',  // IE and Edge
//     'scrollbar-width': 'none',  // Firefox
//     color: '#fff',
//     '& h4': {
//         fontWeight: 'bold',
//         marginBottom: theme.spacing(5),
//     },
// }));
//
// const SectionBox = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(3),
//     backgroundColor: 'rgba( 255, 255, 255, 0.1 )',
//     marginBottom: theme.spacing(3),
//     backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
//     backdropFilter: 'blur(15px)',
//     boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
//     borderRadius: '10px',
//     border: '1px solid rgba( 255, 255, 255, 0.18 )',
//     '& h6': {
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     '& p': {
//         color: '#fff',
//     },
// }));
//
// const Selectmembers_docsharing = () => {
//     const [members, setMembers] = useState([]);
//     const [selectedMembers, setSelectedMembers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         fetchMembers();
//     }, []);
//
//     const fetchMembers = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('http://localhost:3000/api/members');
//             setMembers(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error(error);
//             setError('Error fetching members');
//             setLoading(false);
//         }
//     };
//
//     const handleCheckboxChange = (memberId) => {
//         setSelectedMembers((prevSelected) =>
//             prevSelected.includes(memberId)
//                 ? prevSelected.filter((id) => id !== memberId)
//                 : [...prevSelected, memberId]
//         );
//     };
//
//     const handleShareWithRecipients = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post('http://localhost:3000/api/documents/shareWithRecipients', {
//                 memberIds: selectedMembers,
//             });
//             console.log('Response:', response.data);
//             setLoading(false);
//             navigate('/documents/shared');
//         } catch (error) {
//             console.error(error);
//             setError('Error sharing with recipients');
//             setLoading(false);
//         }
//     };
//
//     return (
//         <>
//             <GlobalStyle />
//             <Root>
//                 <Sidebar />
//                 <MainContainer>
//                     <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
//                         Choose Recipients for sharing the document
//                     </Typography>
//                     {loading ? (
//                         <CircularProgress style={{ color: '#fff' }} />
//                     ) : (
//                         <>
//                             {error && <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>}
//                             <FormControl component="fieldset">
//                                 {members.map((member) => (
//                                     <FormControlLabel
//                                         key={member.memberId}
//                                         control={
//                                             <Checkbox
//                                                 checked={selectedMembers.includes(member.memberId)}
//                                                 onChange={() => handleCheckboxChange(member.memberId)}
//                                                 name={member.memberName}
//                                             />
//                                         }
//                                         label={member.memberName}
//                                     />
//                                 ))}
//                             </FormControl>
//                             <Button variant="contained" color="primary" onClick={handleShareWithRecipients} style={{ marginTop: '20px' }}>
//                                 Share with Recipients
//                             </Button>
//                         </>
//                     )}
//                 </MainContainer>
//             </Root>
//         </>
//     );
// };
//
// export default Selectmembers_docsharing;
