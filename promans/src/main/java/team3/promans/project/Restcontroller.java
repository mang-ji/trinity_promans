package team3.promans.project;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
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
import team3.promans.beans.CloudBean;
import team3.promans.beans.CpMemberBean;
import team3.promans.beans.FeedbackBean;
import team3.promans.beans.GraphDataBean;
import team3.promans.beans.MailBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.services.ScheduleManagement;
import team3.promans.services.SelectInfo;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.services.FileManagement;
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
	
	@Autowired
	FileManagement fm;
	
	@Autowired
	JavaMailSender mailSender;
	
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

		return sm.writeSchedule(sdb.get(0));
	}
	//업무일지작성
	@PostMapping("/WriteDiary")
	public Map<String,String> writeDiary(@RequestBody List<WorkDiaryBean> wdb) {
		return sm.writeDiary(wdb.get(0));

	}
	
	
	@PostMapping("/GetDiary")
	public List<WorkDiaryBean> getDiary(@RequestBody List<WorkDiaryBean> wdb){
		return si.getDiary(wdb.get(0));
	}
	
	@PostMapping("GetDiaryDetail")
	public List<WorkDiaryBean> GetDiaryDetail(@RequestBody List<WorkDiaryBean> wdb) {
		return si.GetDiaryDetail(wdb.get(0));
	}
	
	//업무일지삭제
	@PostMapping("/DeleteDiary")
	public boolean deleteDiary(@RequestBody List<WorkDiaryBean> wdb) {
		return si.deleteDiary(wdb);
	}
	//업무 완료요청(일반멤버)
	@PostMapping("/ReqSchedule")
	public boolean reqSchedule(@RequestBody List<ScheduleDetailBean> sdb) {
		return sm.reqSchedule(sdb);
	}
		
	@PostMapping("getCalendar")
	public List<Notice_CalendarBean> getCalendars(@RequestBody List<Notice_CalendarBean> ncb) {
	
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
	public List<ScheduleBean> getSchedule(@RequestBody List<ScheduleDetailBean> sdb){
		
		return si.selectSchedule(sdb.get(0)) ;
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
	
	@PostMapping("firstInsSchedule")
	public List<ScheduleDetailBean> firstInsSchedule(@RequestBody List<ProjectStepBean> psb) {
		return tm.firstInsSchedule(psb.get(0));

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
	
	@PostMapping("getScCompleteList")
	public List<ProjectStepBean> getScCompleteList(@RequestBody List<ScheduleBean> sb){
		return si.getScCompleteList(sb.get(0));
		
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
	
	@PostMapping("/selectScheduleMember")
	public List<ProjectMemberBean> selectScheduleMember(@RequestBody List<ProjectMemberBean> pmb){
	return si.selectScheduleMember(pmb.get(0));
	}
	
	@PostMapping("/InsProjectMember")
	public Map<String,String> insProjectMember(@RequestBody List<ProjectMemberBean> pmb){
		return pm.insProjectMember(pmb.get(0));
	}
	
	@PostMapping("/InsProjectStepFeedback")
	public Map<String,String> InsProjectFeedback(@RequestBody List<ScheduleDetailBean> sdb) {
		return pm.insProjectFeedback(sdb.get(0));
	}
	
	@PostMapping("/getFileList")
	public List<CloudBean> getFileList(@RequestBody List<CloudBean> cb){
		return fm.getFileList(cb.get(0));
	}

	@PostMapping("getMarkList")
	public List<CloudBean> getMarkList(@RequestBody List<CloudBean> cb){
		return fm.getMarkList(cb.get(0));
	}
	
	@PostMapping("insBookMark")
	public boolean insBookMark(@RequestBody List<CloudBean> cb) {
		return fm.insBookMark(cb.get(0));
	}
	
	
	@PostMapping("ReqProjectAccept")
	public Map<String,String> reqProjectAccept(@RequestBody List<ProjectBean> pb) {
		return pm.reqProjectAccept(pb.get(0));
		
	}

	
	@PostMapping("/GetDataGraph")
	public List<GraphDataBean> getDataGraph(@RequestBody List<ProjectBean> pb) {
	
		return si.getDataGraph(pb);

	}
	
	@PostMapping("/GetSDGraph")
	public GraphDataBean getSDGraph(@RequestBody List<ScheduleBean>sb) {
		
		
		return si.getSDGraph(sb.get(0));
		
	}
	
	@PostMapping("/GetStepGraph")
	public GraphDataBean getStepGraph(@RequestBody List<ScheduleBean>sb) {

		return si.getStepGraph(sb.get(0));
		
	}
	
	
	@PostMapping("/DeleteProjectMember")
	public Map<String,String> deleteProjectMember(@RequestBody List<ProjectMemberBean> pmb) {
		return pm.deleteProjectMember(pmb.get(0));

	}
	
	/* 프로젝트 생성 요청 */
	@PostMapping("/CreateProject")
	public ModelAndView createProject(@RequestBody List<ProjectBean> pb) {
		return pm.createProject(pb.get(0));
	}

	@PostMapping("/GetCpMembers")
	public List<CpMemberBean> getCpMembers(@RequestBody List<CpMemberBean> cmb) {
		return si.getCpMembers(cmb.get(0));
	}
	
	@PostMapping("/GetNot")
	public List<Notice_CalendarBean> getNot(@RequestBody List<Notice_CalendarBean> nc) {
		return si.getNoticeList(nc.get(0));
	}

	@PostMapping("noneMarkList")
	public List<CloudBean> noneMarkList(@RequestBody List<CloudBean> cb){
		return fm.noneMarkList(cb.get(0));
	}
	
	@PostMapping("deleteMark")
	public boolean deleteMark(@RequestBody List<CloudBean> cb) {
		return fm.deleteMark(cb.get(0));
	}
	
	@PostMapping("deleteFiles")
	public boolean deleteFiles(@RequestBody List<CloudBean> cb) {
		return fm.deleteFiles(cb);
		
	}
	

	@PostMapping("/GetWork")
	public List<ScheduleDetailBean> getWork(@RequestBody List<ScheduleDetailBean> sdb) {
		
		return si.getWork(sdb.get(0));
	}

	@PostMapping("/DeleteCpMember")
	public Map<String, String> deleteCpMember(@RequestBody List<CpMemberBean> cmb) {
		return tm.deleteCpMember(cmb);
	}
	@PostMapping("/SelectProjectReq")
	public List<ProjectBean> selectProjectReq(@RequestBody List<ProjectBean> pb) {
		return si.selectProjectReq(pb.get(0));
	}
	@PostMapping("/UpdateProjectAccept")
	public Map<String,String> updateProjectAccept(@RequestBody List<ProjectBean> pb) {
		return pm.updateProjectAccept(pb.get(0));
	}
	@PostMapping("/RejectProjects")
	public Map<String,String> rejectProject(@RequestBody List<ProjectBean> pb){
		return pm.rejectProject(pb.get(0));
	}
	@PostMapping("/SelectProjectMakeReq")
	public List<ProjectBean> selectProjectMakeReq(@RequestBody List<ProjectBean> pb) {
		return si.selectProjectMakeReq(pb.get(0));
	}
	@PostMapping("/AcceptMakeProject")
	public Map<String, String> acceptMakeProject(@RequestBody List<ProjectBean> pb){
		return pm.acceptMakeProject(pb.get(0));
	}
	@PostMapping("/InsProjectStepAccept")
	public Map<String, String> insProjectStepAccept(@RequestBody List<ProjectStepBean> psb) {
		return pm.insProjectStepAccept(psb.get(0));
	}

	@PostMapping("/GetPrftList")
	public List<FeedbackBean> getPrftList(@RequestBody List<ProjectBean> pb) {
		return si.getPrftList(pb.get(0));
	}
	@PostMapping("/GetPsftList")
	public List<FeedbackBean> getPsftList(@RequestBody List<ProjectBean> pb) {
		return si.getPsftList(pb.get(0));
	}
	@PostMapping("/GetScftList")
	public List<FeedbackBean> getScftList(@RequestBody List<ScheduleDetailBean> sdb) {
		return si.getScftList(sdb.get(0));
	}
	@PostMapping("/GetSdftList")
	public List<FeedbackBean> getSdftList(@RequestBody List<ScheduleDetailBean> sdb) {
		return si.getSdftList(sdb.get(0));
	}
	@PostMapping("/GetMyfeedback")
	public List<FeedbackBean> getMyfeedback(@RequestBody List<ScheduleDetailBean> sdb){
		return si.getMyfeedback(sdb.get(0));
	}
//	@PostMapping("/GetProjectFeedback")
//	public List<ScheduleDetailBean> getProjectFeedback(@RequestBody List<ProjectBean> pb) {
//		
//		return si.getProjectFeedback(pb.get(0));
//	}
	
	@PostMapping("scSendFeed")
	public boolean scSendFeed(@RequestBody List<ScheduleDetailBean> sdb) {
		return pm.scSendFeed(sdb.get(0));
	}
	
	@PostMapping("CompleteConfirm")
	public boolean CompleteConfirm(@RequestBody List<ScheduleBean> sb) {
		return pm.CompleteConfirm(sb.get(0));
	} 
	
	@PostMapping("FirstInsSdBool")
	public List<ScheduleDetailBean> FirstInsSdBool(@RequestBody List<ScheduleDetailBean> sdb) {
		return sm.FirstInsSdBool(sdb.get(0));
	}
	@PostMapping("/reqSc")
	public  Map<String, String> reqSc(@RequestBody List<ScheduleBean> sb) {
		
		return sm.reqSc(sb.get(0));
	}

	@PostMapping("/GetSearchWord")
	public List<CpMemberBean> getSearchWord(@RequestBody List<CpMemberBean> cmb) {
		return si.getSearchWord(cmb.get(0));
		}

	@PostMapping("/notpop")
	public  List<Notice_CalendarBean> notpop(@RequestBody List<Notice_CalendarBean>  ncb) {
		return si.notpop(ncb.get(0));
	}
	@PostMapping("/GetCompleteProject")
	public List<ProjectBean> getCompleteProject(@RequestBody List<ProjectBean> pb){
		return si.getCompleteProject(pb.get(0));
	}
}
