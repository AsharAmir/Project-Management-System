package Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Models.Sprint;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    // You can define custom query methods here if needed
}