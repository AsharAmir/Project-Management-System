import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPM from './Components/RegisterPM';
import LoginPM from './Components/LoginPM';
import Dashboard from './Components/Dashboard';
import CreateProject from './Components/CreateProject';
import CreateTask from './Components/CreateTask';
import ProjectDetails from './Components/ProjectDetails';
import TaskDetails from './Components/TaskDetails';
import AssignMember from './Components/AssignMember';
import ScrumBoard from "./Components/ScrumBoard";
import SprintPlanning from "./Components/SprintPlanning";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Dashboard" />} />
                <Route path="/RegisterPM" element={<RegisterPM />} />
                <Route path="/LoginPM" element={<LoginPM />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/CreateProject" element={<CreateProject />} />
                <Route path="/CreateTask" element={<CreateTask />} />
                <Route path="/ProjectDetails/:projectId" element={<ProjectDetails />} />
                <Route path="/TaskDetails" element={<TaskDetails />} />
                <Route path="/AssignMember/:taskId" element={<AssignMember />} />
                <Route path="/ScrumBoard" element={<ScrumBoard />} />
                <Route path="/SprintPlanning/:projectId" element={<SprintPlanning />} />
            </Routes>
        </Router>
    );
}

export default App;
