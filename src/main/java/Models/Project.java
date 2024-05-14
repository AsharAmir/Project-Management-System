package Models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private int projectId;
    @Column(name = "project_name")
    private String projectName;
    @Column(name = "description")
    private String projectDescription;
    @Column(name = "start_date")
    private String startDate;
    @Column(name = "end_date")
    private String endDate;
    //private List<String> tasks;

    public Project() {
    }

    public Project(int projectId, String projectName, String description, String startDate, String endDate, List<String> tasks) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDescription = description;
        this.startDate = startDate;
        this.endDate = endDate;
        //this.tasks = tasks;

    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getDescription() {
        return projectDescription;
    }

    public void setDescription(String description) {
        this.projectDescription = description;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

//    public List<String> getTasks() {
//        return tasks;
//    }
//
//    public void setTasks(List<String> tasks) {
//        this.tasks = tasks;
//    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projectId=" + projectId +
                "projectName='" + projectName + '\'' +
                ", description='" + projectDescription + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                //", tasks=" + tasks +
                '}';
    }
}
