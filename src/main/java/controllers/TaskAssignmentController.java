package controllers;
import Models.TaskAssignment;
import Repositories.TaskAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assignMember")
public class TaskAssignmentController {

    private final TaskAssignmentRepository taskAssignmentRepository;

    @Autowired
    public TaskAssignmentController(TaskAssignmentRepository taskAssignmentRepository) {
        this.taskAssignmentRepository = taskAssignmentRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> assignMemberToTask(@RequestBody TaskAssignment taskAssignment) {
        taskAssignmentRepository.save(taskAssignment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Member assigned to task successfully");
    }

}
