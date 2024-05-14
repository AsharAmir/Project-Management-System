package controllers;

import Models.ProjectManager;
import Repositories.ProjectManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projectManagers")
public class ProjectManagerController {

    @Autowired
    private ProjectManagerRepository projectManagerRepository;

    @PostMapping("/register")
    public ResponseEntity<ProjectManager> registerProjectManager(@RequestBody ProjectManager projectManager) {
        try {
            ProjectManager savedManager = projectManagerRepository.save(projectManager);
            return ResponseEntity.ok(savedManager);
        } catch (Exception e) {
            // Log the error
            e.printStackTrace();
            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginProjectManager(@RequestBody ProjectManager projectManager){
        ProjectManager currentPM = projectManagerRepository.findByEmail(projectManager.getEmail());

        if(currentPM != null && currentPM.getPassword().equals(projectManager.getPassword())){
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
        }
    }
}
