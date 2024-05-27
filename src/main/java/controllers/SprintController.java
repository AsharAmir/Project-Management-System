package controllers;
import Repositories.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Models.Sprint;


@RestController
@RequestMapping("/api/sprints")
public class SprintController {

    @Autowired
    private SprintRepository sprintRepository;

    @PostMapping("/createSprint")
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) {
        try {
            Sprint savedSprint = sprintRepository.save(sprint);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSprint);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
