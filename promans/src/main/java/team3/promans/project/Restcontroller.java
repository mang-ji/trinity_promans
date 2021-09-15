package team3.promans.project;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Authentication;
import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.AccessHistory;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.services.ScheduleManagement;
import team3.promans.services.SelectInfo;
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
	
	@Autowired
	ProjectManagement pm;
	
	ModelAndView mav;

	@GetMapping("/idCheck")
	public boolean idCheck(@ModelAttribute AccessHistory ah) {
		return auth.idCheck(ah);
	}
	
	
	@PostMapping("/GetMySchedule")
	public List<ScheduleDetailBean> getMySchedule(@RequestBody List<ScheduleDetailBean> sdb){
		return si.getMySchedule(sdb.get(0));
	}
	
	//업무디테일작성
	@PostMapping("/WriteSchedule")
	public String writeSchedule(@RequestBody List<ScheduleDetailBean> sdb) {
		//sm.writeSchedule(sdb.get(0))
		System.out.println("글작성 첫번째에러다");
		return sm.writeSchedule(sdb.get(0));
	}
	
	//업무일지작성
	@PostMapping("/WriteDiary")
	public String writeDiary(@RequestBody WorkDiaryBean wdb) {
		return sm.writeDiary(wdb);
	}
	
	
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
	public List<Notice_CalendarBean> getCalendars(@RequestBody List<Notice_CalendarBean> ncb) {
		System.out.println(ncb.get(0).getCpcode()+" : controller");
		return si.getCalendar(ncb.get(0));
	}
	
	@PostMapping("/addTeamMember")
	public void addTeamMember() {
		
	}
	
	/* 공지사항 리스트 조회 */
	@PostMapping("/getNotice")
	public List<Notice_CalendarBean> getNoticeList(@RequestBody List<Notice_CalendarBean> nc) {
		return si.getNoticeList(nc.get(0));
	}
	
	/* 공지사항 디테일 조회 */
	@PostMapping("/getNoticeDetail")
	public List<Notice_CalendarBean> getNoticeDetail(@RequestBody List<Notice_CalendarBean> nc) {
		return si.getNoticeDetail(nc.get(0));
		
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
	@PostMapping("/GetSDInfo")
	public List<ScheduleDetailBean> getSDInfo(@RequestBody List<ScheduleDetailBean> sdb){
	
		return si.getSDInfo(sdb.get(0));
		
	}
	
	@PostMapping("GetScheDetail")
	public List<ScheduleDetailBean> getScheDetail(@RequestBody List<ScheduleDetailBean> sdb){
		
		return si.getScheDetail(sdb.get(0));

	}
	
	@PostMapping("/ReqForCompletion")
	public List<ScheduleDetailBean> reqForCompletion(@RequestBody List<ScheduleDetailBean> sdb){
		return si.reqForCompletion(sdb.get(0));
	}
	

	@PostMapping("/selectManager")
	public List<ProjectStepBean> selectManager(@RequestBody List<ProjectStepBean> psb){
		
		return si.selectManager(psb.get(0));
	}
	
	
	
	@PostMapping("/MakeStep")
	public Map<String,String> makeStep(@RequestBody List<ProjectStepBean> psb) {
		
		return pm.makeStep(psb.get(0));
	}

	
	@PostMapping("/ScheFeedback")
	public Map<String, String> scheFeedback(@RequestBody List<ScheduleDetailBean> sdb){
		Map<String, String> map = new HashMap<>();
		map.put("message", "업데이트");
		
		sm.scheFeedback(sdb);
		
		return map;
		
	}
	@PostMapping("/SelectStepReq")
	public List<ProjectStepBean> selectStepReq(@RequestBody List<ProjectStepBean> psb) {
		return si.selectStepReq(psb.get(0));
	}


	@PostMapping("addJob")
	public List<ScheduleDetailBean> addJob(@RequestBody List<ProjectStepBean> psb) {
		return tm.addJob(psb.get(0));

	}
	
	@PostMapping("insSchedule")
	public boolean insSchedule(@RequestBody List<ScheduleBean> sb) {
		return tm.insSchedule(sb.get(0));
	}
	
	@PostMapping("requestComplete")
	public boolean requestComplete(@RequestBody List<ProjectStepBean> psb){
		
		return tm.requestComplete(psb.get(0));
	}
	
	@PostMapping("getComplete")
	public List<ScheduleBean> getComplete(@RequestBody List<ScheduleBean> sb){
		return tm.getComplete(sb.get(0));
	}
	
	@PostMapping("getCompleteList")
	public List<ProjectStepBean> getCompleteList(@RequestBody List<ProjectStepBean> psb){
		return si.getCompleteList(psb.get(0));
		
	}
		
	@PostMapping("/ReqPass")
	public int reqPass(@RequestBody List<ScheduleDetailBean> sdb){
	
		return sm.reqPass(sdb.get(0));
	}

	@PostMapping("/InsSD")
	public  Map<String, String> InsSD(@RequestBody List<ScheduleDetailBean> sdb) {
		Map<String, String> map = new HashMap<>();
		map.put("message", "업무가 추가되었습니다.");
		
		sm.insSD(sdb.get(0));
		
		return map;
	}
	@PostMapping("/SelectProjectMember")
	public List<ProjectMemberBean> selectProjectMember(@RequestBody List<ProjectMemberBean> pmb){
		return si.selectProjectMember(pmb.get(0));
	}
	@PostMapping("/InsProjectMember")
	public Map<String,String> insProjectMember(@RequestBody List<ProjectMemberBean> pmb){
		return pm.insProjectMember(pmb.get(0));
	}
	
	@PostMapping("/InsProjectFeedback")
	public Map<String,String> InsProjectFeedback(@RequestBody List<ScheduleDetailBean> sdb) {
		return pm.insProjectFeedback(sdb.get(0));
	}
	@PostMapping("ReqProjectAccept")
	public Map<String,String> reqProjectAccept(List<ProjectBean> pb) {
		return pm.reqProjectAccept(pb.get(0));

	}

}
