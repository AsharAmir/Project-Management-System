package Models;
import jakarta.persistence.*;

@Entity
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int memberId;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "email")
    private String email;

    @Column(name = "project_id")
    private int projectId;

    // Constructors, getters, and setters

    public Member() {
    }

    public Member(String memberName, String email, int projectId) {
        this.memberName = memberName;
        this.email = email;
        this.projectId = projectId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getProject() {
        return projectId;
    }

    public void setProject(int project) {
        this.projectId = project;
    }
}
