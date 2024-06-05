# Project Management System (PMS)

![Project Management System](https://s10.gifyu.com/images/SYmtP.gif)

## Introduction
This Project Management System (PMS) helps teams efficiently manage projects and tasks. Users can create projects, assign tasks, and track progress through a user-friendly interface.

## Features
- **Project Management**: Create, update, and delete projects.
- **Task Management**: Assign tasks to projects, set priorities, and mark tasks as done.
- **User Management**: Assign members to tasks and projects.
- **Real-time Updates**: View and update the status of tasks and projects in real-time.

## Technologies Used
- **Frontend**: React, Material-UI
- **Backend**: Spring Boot
- **Database**: MySQL
- **Build Tools**: Maven

## Installation
### Prerequisites
- Node.js
- Java 11 or higher
- MySQL

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/AsharAmir/pms-proj.git
    cd pms-proj
    ```

2. Configure MySQL Database:
    - Create a database named `pms`.
    - Update `src/main/resources/application.properties` with your database credentials.


3. Start the frontend server:
    ```bash
    npm start
    ```

4. Build and run the backend:
    ```bash
    cd ../backend
    mvn clean install
    mvn spring-boot:run
    ```

## API Endpoints

### Projects
- `GET /api/projects/fetchAll`: Fetch all projects
- `POST /api/projects/create`: Create a new project
- `PUT /api/projects/update/{projectId}`: Update a project by ID
- `DELETE /api/projects/delete/{projectId}`: Delete a project by ID

### Tasks
- `GET /api/tasks/GetByProject/{projectId}`: Fetch tasks by project ID
- `POST /api/tasks/create`: Create a new task
- `PUT /api/tasks/update/{taskId}`: Update a task by ID
- `DELETE /api/tasks/delete/{taskId}`: Delete a task by ID
- `POST /api/tasks/MarkAsDone/{taskId}`: Mark task as done

### Members
- `GET /api/member/getMembersByProject/{projectId}`: Fetch members by project ID
- `GET /api/member/getMembersByTask/{taskId}`: Fetch members by task ID
- `POST /api/member/assignToProject`: Assign a member to a project
- `POST /api/member/assignToTask`: Assign a member to a task

## Usage
1. Start both frontend and backend servers.
2. Open your browser and navigate to `http://localhost:3000`.
3. Use the interface to create projects, assign tasks, and manage your project workflow.

## Contributing
Feel free to contribute to this project by creating pull requests, submitting issues, or improving the documentation.

## Contact
For any questions or suggestions, please contact Ashar Amir at ashaar.x@outlook.com

---

Enjoy managing your projects with our PMS!
