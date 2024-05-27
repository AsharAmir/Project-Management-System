//package Service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//import Repositories.TaskAssignmentRepository;
//import Repositories.MemberRepository;
//import Models.Member;
//
//@Service
//public class CheckMemberAvailability {
//
//    @Autowired
//    private TaskAssignmentRepository taskAssignmentRepository;
//    private MemberRepository memberRepository;
//
//    public List<Member> findAvailableMembersForTask(int taskId) {
//        // Assuming there's a method in taskMemberRepository that finds members not assigned to a specific task
//        List<Integer> assignedMemberIds = taskAssignmentRepository.findAssignedMemberIdsForTask(taskId);
//        // Assuming there's a method in memberRepository that finds members except those with given IDs
//        return memberRepository.findMembersExceptIds(assignedMemberIds);
//    }
//}
