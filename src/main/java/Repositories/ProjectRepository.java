package Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

}