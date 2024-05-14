package controllers;
import Models.Task;
import Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

//    @PostMapping("/addTask")
//    public ResponseEntity<String> createTask(@RequestBody Task task) {
////        taskRepository.save(task);
////        return ResponseEntity.status(HttpStatus.CREATED).body("Task created successfully");
//        System.out.println("Received Task Object: " + task.toString());
//
//        if (task.getProjectID() == 0) {
//            System.out.println("Project ID is missing");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Project ID is missing");
//        }
//        taskRepository.save(task);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Task created successfully");
//    }
@PostMapping("/addTask")
public ResponseEntity<String> createTask(@RequestBody Task task) {
    System.out.println("Received Task Object: " + task.toString());

    // Check if projectID is missing or 0
    if (task.getProjectID() == 0) {
        System.out.println("Project ID is missing or invalid");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Project ID is missing or invalid");
    }

    // Check if other required fields are missing or null
    if (task.getTaskName() == null || task.getDescription() == null || task.getPriority() == null ||
            task.getStartDate() == null || task.getEndDate() == null) {
        System.out.println("One or more required fields are missing or null");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("One or more required fields are missing or null");
    }

    // Save the task
    taskRepository.save(task);
    return ResponseEntity.status(HttpStatus.CREATED).body("Task created successfully");
}


    @GetMapping("/fetchAll")
    public ResponseEntity<Iterable<Task>> fetchAllTasks() {
        Iterable<Task> tasks = taskRepository.findAll();
        return ResponseEntity.ok(tasks);
    }
}
