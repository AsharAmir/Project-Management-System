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
import SprintsDisplay from "./Components/SprintsDisplay";
import Createcalender from "./Components/Createcalender";
import Createmeeting from "./Components/Createmeeting";
import Schedulemeeting from "./Components/Schedulemeeting";
import Selectmembers_docsharing from "./Components/Selectmembers_docsharing";
import selectmembers_reminders from "./Components/Selectmembers_reminders";
import setreminder from "./Components/Setreminder";
import Sharedoc from "./Components/Sharedoc";
import Sharemeeting from "./Components/Sharemeeting";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/LoginPM" />} />
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
                <Route path="/SprintsDisplay" element={<SprintsDisplay />} />
                <Route path="/Createcalender" element={<Createcalender />} />
                <Route path="/Createmeeting" element={<Createmeeting />} />
                <Route path="/Schedulemeeting" element={<Schedulemeeting />} />
                <Route path="/Selectmembers_docsharing" element={<Selectmembers_docsharing />} />
                <Route path="/selectmembers_reminders" element={<selectmembers_reminders />} />
                <Route path="/setreminder" element={<setreminder />} />
                <Route path="/Sharedoc" element={<Sharedoc />} />
                <Route path="/Sharemeeting" element={<Sharemeeting />} />
            </Routes>
        </Router>
    );
}

export default App;
