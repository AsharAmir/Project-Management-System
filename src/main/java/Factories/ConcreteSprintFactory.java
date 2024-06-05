package Factories;

import Models.Sprint;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ConcreteSprintFactory implements SprintFactory {
    @Override
    public Sprint createSprint(String sprintName, Date startDate, Date endDate, int projectID) {
        return new Sprint(sprintName, startDate, endDate, projectID);
    }
}