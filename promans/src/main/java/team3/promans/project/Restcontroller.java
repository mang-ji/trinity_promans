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
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.services.ScheduleManagement;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.services.ProjectManagement;
import team3.promans.services.TeamManagement;

import team3.promans.beans.Notice_CalendarBean;

import team3.promans.beans.ProjectBean;

import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.services.ProjectManagement;
import team3.promans.services.TeamManagement;


@RestController
@RequestMapping("rest")
public class Restcontroller {
	
	@Autowired
	Authentication auth;
	
	@Autowired
	SelectInfo si;
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;

	@Autowired 
	TeamManagement tm;
	
	@Autowired
	ScheduleManagement sm;

	@GetMapping("/idCheck")
	public boolean idCheck(@ModelAttribute AccessHistory ah) {
		return auth.idCheck(ah);
	}
	
	
	@PostMapping("/GetMySchedule")
	public List<ScheduleDetailBean> getMySchedule(@RequestBody List<ScheduleDetailBean> sdb) throws Exception{
		return si.getMySchedule(sdb.get(0));
	}
	
	
	@PostMapping("/WriteSchedule")
	public int writeSchedule(@ModelAttribute ScheduleDetailBean sdb) {
		
		return sm.writeSchedule(sdb);
	}
	
	/*업무 일지 작성*/
	@PostMapping("/WriteDiary")
	public int writeDiary(@ModelAttribute WorkDiaryBean wdb) {
		return sm.writeDiary(wdb);
	}
	
	/*업무 일지 조회*/
	@PostMapping("/GetDiary")
	public List<WorkDiaryBean> getDiary(@RequestBody List<WorkDiaryBean> wdb){
		return si.getDiary(wdb.get(0));
	}
	
	/*업무 완료요청(일반멤버)
	@PostMapping("/ReqSchedule")
	public int reqSchedule(@ModelAttribute ScheduleDetailBean sdb) {
		return sm.reqSchedule(sdb);
	}*/
		
	@PostMapping("getCalendar")
	public void getCalendar() {
	}
	
	@PostMapping("/addTeamMember")
	public void addTeamMember() {
		
	}
	

	@PostMapping("/getNotice")
	public List<Notice_CalendarBean> getNoticeList(@RequestBody List<Notice_CalendarBean> nc) {
		return si.getNoticeList(nc.get(0));
	}
	

	

	@PostMapping("/GetProject")
	public List<ProjectBean> getProject(@RequestBody List<ProjectMemberBean> pmb) {
		
		return si.getProject(pmb.get(0));
	}
	
	@PostMapping("/GetProjectStep")
	public List<ProjectStepBean> getProjectStep(@RequestBody List<ProjectMemberBean> pmb){
		
		return si.getProjectStep(pmb.get(0)); 
	}
	
	@PostMapping("/GetSchedule")
	public List<ScheduleBean> getSchedule(@RequestBody List<ProjectStepBean> psb){
		
		return si.selectSchedule(psb.get(0)) ;
	}
	
	@PostMapping("/GetScheDetail")
	public List<ScheduleDetailBean> getScheDetail(@RequestBody List<ScheduleDetailBean> sdb){
		
		return si.getScheDetail(sdb.get(0));
	}

}
