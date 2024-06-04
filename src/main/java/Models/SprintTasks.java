package Models;


import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import jakarta.persistence.*;


@Entity
@Table(name = "sprint_tasks")
public class SprintTasks {


    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sprintId;

    @Id
    @Column(name = "task_id", nullable = false)
    private int task_id;


    public SprintTasks() {
    }

    public SprintTasks(int sprintId, int task_id) {
        this.sprintId = sprintId;
        this.task_id = task_id;
    }


    //getter and setters
    public int getSprintId() {
        return sprintId;
    }

    public int getTask_id() {
        return task_id;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public void setSprintId(int sprintId) {
        this.sprintId = sprintId;
    }

}
