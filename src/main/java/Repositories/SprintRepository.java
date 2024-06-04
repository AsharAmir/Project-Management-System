package Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import Models.Sprint;

import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    // You can define custom query methods here if needed
    @Query(value = "SELECT s.sprint_id, s.sprint_name, s.start_date, s.end_date, s.sprint_goal, st.task_id, t.task_name, t.priority, t.status " +
            "FROM sprints s " +
            "LEFT JOIN sprint_tasks st ON s.sprint_id = st.sprint_id " +
            "LEFT JOIN task t ON st.task_id = t.task_id " +
            "WHERE s.project_id = :projectId", nativeQuery = true)
    List<Object[]> getSprintsWithTasksByProjectId(@Param("projectId") int projectId);
}