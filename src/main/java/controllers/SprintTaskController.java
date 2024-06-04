package controllers;
import Repositories.SprintTaskRepository;
import Repositories.SprintRepository;
import Models.SprintTasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Models.Sprint;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/sprints")
public class SprintTaskController {

        @Autowired
        private SprintTaskRepository sprintTaskRepository;

        @Autowired
        private SprintRepository sprintRepository;

    @PostMapping("/addTasksToSprint/{sprintId}")
    public ResponseEntity<String> addTasksToSprint(@RequestBody List<Integer> taskIds, @PathVariable int sprintId) {
        try {
            Optional<Sprint> sprintOptional = sprintRepository.findById(sprintId);
            if (!sprintOptional.isPresent()) {
                throw new RuntimeException("Sprint with id " + sprintId + " does not exist");
            }
            for (Integer taskId : taskIds) {
                System.out.print("trying to save sprint task" + sprintId + " " + taskId);
                SprintTasks sprintTask = new SprintTasks(sprintId, taskId);
                System.out.println("in my loop");
                sprintTaskRepository.save(sprintTask);
                System.out.println("out my loop");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("Tasks added to sprint successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding tasks to sprint");
        }
    }
}
