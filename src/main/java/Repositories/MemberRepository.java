package Repositories;
import Models.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Iterable<Member> findByProjectId(int projectId);
    @Query("SELECT m FROM Member m LEFT JOIN TaskAssignment ta ON m.memberId = ta.memberId " +
            "WHERE m.projectId = :projectId AND ta.taskId IS NULL")
    List<Member> findUnassignedMembersByProject(@Param("projectId") Integer projectId);

    @Query("SELECT m FROM Member m JOIN TaskAssignment ta ON m.memberId = ta.memberId WHERE ta.taskId = :taskId")
    List<Member> findByTaskId(@Param("taskId") Integer taskId);

}