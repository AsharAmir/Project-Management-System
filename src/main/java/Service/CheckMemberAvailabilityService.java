package Service;

import Models.TaskAssignment;
import Repositories.TaskAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckMemberAvailabilityService {

    private final TaskAssignmentRepository taskAssignmentRepository;

    @Autowired
    public CheckMemberAvailabilityService(TaskAssignmentRepository taskAssignmentRepository) {
        this.taskAssignmentRepository = taskAssignmentRepository;
    }

    public boolean isMemberAvailable(int memberId) {
        List<TaskAssignment> assignments = taskAssignmentRepository.findByMemberId(memberId);
        return assignments.isEmpty();
    }

    public List<TaskAssignment> getTasksForMember(int memberId) {
        return taskAssignmentRepository.findByMemberId(memberId);
    }
}
