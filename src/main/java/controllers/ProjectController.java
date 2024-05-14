package controllers;
import Models.Project;
import Repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController{
    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/createProject")
    public ResponseEntity<String> createProject(@RequestBody Project project) {
        projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.CREATED).body("Project created successfully");
    }

    @GetMapping("/fetchAll")
    public ResponseEntity<Iterable<Project>> fetchAllProjects() {
        Iterable<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/fetchProject/{id}")
    public ResponseEntity<Project> fetchProject(@PathVariable int id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(project);
    }
}
