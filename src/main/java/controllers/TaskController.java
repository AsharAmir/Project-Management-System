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

    @GetMapping("/GetByProject/{id}")
    public ResponseEntity<Iterable<Task>> fetchTasksByProject(@PathVariable int id) {
        Iterable<Task> tasks = taskRepository.findByProjectID(id);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/MarkAsDone/{id}")
    public ResponseEntity<String> markTaskAsDone(@PathVariable int id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
        task.setStatus("Done");
        taskRepository.save(task);
        return ResponseEntity.ok("Task marked as done");
    }

    @GetMapping("/GetByTaskID/{id}")
    public ResponseEntity<Task> fetchTaskByID(@PathVariable int id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(task);
    }
}
