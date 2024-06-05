package controllers;
import Factories.SprintFactory;
import Repositories.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Models.Sprint;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/sprints")
public class SprintController {

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private SprintFactory sprintFactory;

    @PostMapping("/createSprint")
    public ResponseEntity<Integer> createSprint(@RequestBody Sprint sprint) {
        try {
            Sprint newSprint = sprintFactory.createSprint(sprint.getSprintName(), sprint.getStartDate(), sprint.getEndDate(), sprint.getProjectId());
            Sprint savedSprint = sprintRepository.save(newSprint);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSprint.getSprintId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/deleteSprint/{sprintId}")
    public ResponseEntity<String> deleteSprint(@PathVariable int sprintId) {
        try {
            sprintRepository.deleteById(sprintId);
            return ResponseEntity.status(HttpStatus.OK).body("Sprint deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting sprint");
        }
    }

    @GetMapping("/GetByProject/{projectId}")
    public ResponseEntity<List<Map<String, Object>>> getSprintsByProjectId(@PathVariable int projectId) {
        try {
            List<Object[]> sprintsData = sprintRepository.getSprintsWithTasksByProjectId(projectId);
            Map<Integer, Map<String, Object>> sprintsMap = new HashMap<>();

            for (Object[] row : sprintsData) {
                int sprintId = (int) row[0];
                if (!sprintsMap.containsKey(sprintId)) {
                    Map<String, Object> sprintDetails = new HashMap<>();
                    sprintDetails.put("sprintId", row[0]);
                    sprintDetails.put("sprintName", row[1]);
                    sprintDetails.put("startDate", row[2]);
                    sprintDetails.put("endDate", row[3]);
                    sprintDetails.put("sprintGoal", row[4]);
                    sprintDetails.put("tasks", new ArrayList<Map<String, Object>>());
                    sprintsMap.put(sprintId, sprintDetails);
                }
                if (row[5] != null) {
                    Map<String, Object> taskDetails = new HashMap<>();
                    taskDetails.put("taskId", row[5]);
                    taskDetails.put("taskName", row[6]);
                    taskDetails.put("priority", row[7]);
                    taskDetails.put("status", row[8]);
                    ((List<Map<String, Object>>) sprintsMap.get(sprintId).get("tasks")).add(taskDetails);
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>(sprintsMap.values()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
