package Factories;
import Models.Task;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ConcreteTaskFactory implements TaskFactory {
    @Override
    public Task createTask(String taskName, String description, String priority, Date startDate, Date endDate, int projectID) {
        return new Task(taskName, description, priority, startDate, endDate, projectID, "Pending");
    }
}