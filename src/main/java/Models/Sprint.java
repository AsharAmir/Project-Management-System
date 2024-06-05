package Models;

import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sprintId;

    @Column(name = "project_id", nullable = false)
    private int projectId;

    @Column(name = "sprint_name", nullable = false)
    private String sprintName;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "sprint_goal")
    private String sprintGoal;

//    @ManyToOne
//    @JoinColumn(name = "project_id", nullable = false)
//    private Project project;
//
//    @ManyToMany
//    @JoinTable(
//            name = "sprint_tasks",
//            joinColumns = @JoinColumn(name = "sprint_id"),
//            inverseJoinColumns = @JoinColumn(name = "task_id")
//    )
//    private List<Task> tasks;

    // Getters and setters

    Sprint() {
    }


    public Sprint(String sprintName, Date startDate, Date endDate, int projectID) {
        this.sprintName = sprintName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.projectId = projectID;
    }


    public int getSprintId() {
        return sprintId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public void setSprintId(int sprintId) {
        this.sprintId = sprintId;
    }

    public String getSprintName() {
        return sprintName;
    }

    public void setSprintName(String sprintName) {
        this.sprintName = sprintName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getSprintGoal() {
        return sprintGoal;
    }

    public void setSprintGoal(String sprintGoal) {
        this.sprintGoal = sprintGoal;
    }

}
