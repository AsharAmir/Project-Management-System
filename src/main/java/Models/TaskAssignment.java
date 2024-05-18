package Models;
import jakarta.persistence.*;

@Entity
@Table(name = "Task_Assignment")
public class TaskAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_assignment_id")
    private int taskAssignmentId;

    @Column(name = "task_id")
    private int taskId;

    @Column(name = "member_id")
    private int memberId;

    // Constructors, getters, and setters
    TaskAssignment() {
    }

    public TaskAssignment(int taskId, int memberId) {
        this.taskId = taskId;
        this.memberId = memberId;
    }

    public int getTaskAssignmentId() {
        return taskAssignmentId;
    }

    public void setTaskAssignmentId(int taskAssignmentId) {
        this.taskAssignmentId = taskAssignmentId;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }


}
