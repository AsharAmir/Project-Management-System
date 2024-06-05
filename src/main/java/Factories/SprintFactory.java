package Factories;

import Models.Sprint;

import java.util.Date;

public interface SprintFactory {
    Sprint createSprint(String sprintName, Date startDate, Date endDate, int projectID);
}