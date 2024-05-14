//
//
//import Models.projectManager;
//import Repositories.ProjectManagerRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin as per your React app's URL
//@RestController
//@RequestMapping("/api/projectManagers")
//public class testController {
//
//    // Logger instance for this class
//    //private static final Logger logger = LoggerFactory.getLogger(ProjectManagerController.class);
//
//    @Autowired
//    private ProjectManagerRepository projectManagerRepository;
//
//    @PostMapping("/register")
//    public ResponseEntity<projectManager> registerProjectManager(@RequestBody projectManager projectManager) {
//        //logger.info("Received request to register project manager: {}", projectManager);
//
//        try {
//            projectManager newProjectManager = projectManagerRepository.save(projectManager);
//            //logger.info("Project manager registered successfully: {}", newProjectManager);
//            return new ResponseEntity<>(newProjectManager, HttpStatus.CREATED);
//        } catch (Exception e) {
//            //logger.error("Error registering project manager: ", e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    // Other endpoint methods can be added here for handling different operations
//}
