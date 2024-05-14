import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPM from './Components/RegisterPM';
import LoginPM from './Components/LoginPM';
import Dashboard from './Components/Dashboard'; // Make sure the path is correct
import CreateProject from './Components/CreateProject'; // Adding createProject route
import CreateTask from './Components/CreateTask'; // Adding createTask route
import ProjectDetails from './Components/ProjectDetails'; // Adding ProjectDetails route

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/RegisterPM" element={<RegisterPM />} />
                <Route path="/LoginPM" element={<LoginPM />} />
                <Route path="/Dashboard" element={<Dashboard />} />  // Adding Dashboard route
                <Route path="/CreateProject" element={<CreateProject />} />  // Adding createProject route
                {/*<Route path="/CreateProjectForm" element={<CreateProjectForm />} />  // Adding createProjectForm route*/}
                <Route path="/CreateTask" element={<CreateTask />} />  // Adding createTask route
                <Route path="/ProjectDetails/:projectId" element={<ProjectDetails />} />  // Adding ProjectDetails route
            </Routes>
        </Router>
    );
}

export default App;
