package team3.promans.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team3.promans.auth.Authentication;
import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.AccessHistory;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.services.ProjectManagement;
import team3.promans.services.TeamManagement;

@RestController
@RequestMapping("rest")
public class Restcontroller {
	
	@Autowired
	Authentication auth;
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;

	@Autowired 
	TeamManagement tm;

	@GetMapping("/idCheck")
	public boolean idCheck(@ModelAttribute AccessHistory ah) {
		System.out.println("idcheck!!!!! ");
		return auth.idCheck(ah);
	}
	
	@PostMapping("getCalendar")
	public void getCalendar() {
		System.out.println("test");
	}
	
	@PostMapping("/addTeamMember")
	public void addTeamMember() {
		System.out.println("연결 연결 !!!!!!1");
	}
	
}
