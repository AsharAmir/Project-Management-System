package controllers;
import Models.Member;
import Repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/addMember")
    public ResponseEntity<String> createMember(@RequestBody Member member) {
        System.out.println("Received Member Object: " + member.toString());
        memberRepository.save(member);
        return ResponseEntity.status(HttpStatus.CREATED).body("Member created successfully");
    }

    @PostMapping("/fetchAll")
    public ResponseEntity<Iterable<Member>> fetchAllMembers() {
        Iterable<Member> members = memberRepository.findAll();
        return ResponseEntity.ok(members);
    }

    @GetMapping("/fetchByProject/{id}")
    public ResponseEntity<Iterable<Member>> fetchMembersByProject(@PathVariable int id) {
        Iterable<Member> members = memberRepository.findByProjectId(id);
        return ResponseEntity.ok(members);
    }

    @GetMapping("/getMember/{id}")
    public ResponseEntity<Member> getMember(@PathVariable int id) {
        Member member = memberRepository.findById(id).orElse(null);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(member);
    }

//    @GetMapping("/getMembersExcept/{ids}")
//    public ResponseEntity<Iterable<Member>> getMembersExcept(@PathVariable String ids) {
//        String[] idArray = ids.split(",");
//        Iterable<Member> members = memberRepository.findMembersExceptIds(idArray);
//        return ResponseEntity.ok(members);
//    }

    @GetMapping("/getUnassignedMembersByProject/{id}")
    public ResponseEntity<Iterable<Member>> getUnassignedMembersByProject(@PathVariable int id) {
        Iterable<Member> members = memberRepository.findUnassignedMembersByProject(id);
        return ResponseEntity.ok(members);
    }


    @GetMapping("/getMembersByProject/{id}")
    public ResponseEntity<Iterable<Member>> getMembersByProject(@PathVariable int id) {
        Iterable<Member> members = memberRepository.findByProjectId(id);
        return ResponseEntity.ok(members);
    }




}
