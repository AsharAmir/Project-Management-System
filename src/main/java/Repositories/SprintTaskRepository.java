package Repositories;

import Models.Sprint;
import Models.SprintTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintTaskRepository extends JpaRepository<SprintTasks, Integer> {
    // You can define custom query methods here if needed
}