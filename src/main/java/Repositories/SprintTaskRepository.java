package Repositories;

import Models.SprintTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintTaskRepository extends JpaRepository<SprintTasks, Integer> {


}