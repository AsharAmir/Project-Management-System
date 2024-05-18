package Repositories;
import Models.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Models.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Iterable<Member> findByProjectId(int projectId);
}