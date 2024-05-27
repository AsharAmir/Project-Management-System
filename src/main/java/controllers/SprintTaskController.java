package controllers;
import Repositories.SprintTaskRepository;
import Models.SprintTasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Models.Sprint;

import java.util.List;


@RestController
@RequestMapping("/api/sprints")
public class SprintTaskController {

        @Autowired
        private SprintTaskRepository sprintTaskRepository;

    @PostMapping("/addTasksToSprint/{sprintId}")
    public ResponseEntity<String> addTasksToSprint(@RequestBody List<Integer> taskIds, @PathVariable int sprintId) {
        try {
            for (Integer taskId : taskIds) {
                SprintTasks sprintTask = new SprintTasks(sprintId, taskId);
                sprintTaskRepository.save(sprintTask);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("Tasks added to sprint successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding tasks to sprint");
        }
    }
}
