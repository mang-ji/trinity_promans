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
import team3.promans.auth.SelectInfo;
import team3.promans.beans.AccessHistory;
import team3.promans.beans.Notice_CalendarBean;
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
	
	@Autowired
	SelectInfo si;

	@GetMapping("/idCheck")
	public boolean idCheck(@ModelAttribute AccessHistory ah) {
		return auth.idCheck(ah);
	}
	
	@PostMapping("getCalendar")
	public List<Notice_CalendarBean> getCalendars(@RequestBody List<Notice_CalendarBean> ncb) {
		System.out.println(ncb.get(0).getCpcode()+" : controller");
		return si.getCalendar(ncb.get(0));
	}
	
	@PostMapping("/addTeamMember")
	public void addTeamMember() {
	}
	
}
