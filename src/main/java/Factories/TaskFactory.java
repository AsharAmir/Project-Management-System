package Factories;

import Models.Task;

import java.util.Date;

public interface TaskFactory {
    Task createTask(String taskName, String description, String priority, Date startDate, Date endDate, int projectID);
}