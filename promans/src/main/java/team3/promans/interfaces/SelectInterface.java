package team3.promans.interfaces;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.CpMemberBean;
import team3.promans.beans.FeedbackBean;
import team3.promans.beans.GraphDataBean;
import team3.promans.beans.Notice_CalendarBean;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;

@Component
public interface SelectInterface {

	  public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean nc);
	  public List<ProjectBean> getProject(ProjectMemberBean pmb); 
	  public List<ProjectStepBean> getProjectStep(ProjectMemberBean pmb); 
	  public List<ScheduleBean> selectSchedule(ScheduleDetailBean sdb); 
	  public List<ScheduleDetailBean> getScheDetail(ScheduleDetailBean sdb);
	  public ModelAndView insNotice(Notice_CalendarBean nc);
	  public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb);
	  public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb);
	  public List<ScheduleDetailBean> getSDInfo(ScheduleDetailBean sdb);
	  public List<ScheduleDetailBean> reqForCompletion(ScheduleDetailBean sdb);
	  public List<ProjectStepBean> getCompleteList(ProjectStepBean psb);
	  public List<ProjectStepBean> selectStepReq(ProjectStepBean psb);
	  public List<ProjectStepBean> selectManager(ProjectStepBean psb);
	  public List<ProjectMemberBean> selectProjectMember(ProjectMemberBean pmb);
	  public List<ProjectMemberBean> selectScheduleMember(ProjectMemberBean pmb);
	  public ModelAndView noticeDelete(Notice_CalendarBean nc);
	  public int getMaxNocode(Notice_CalendarBean nc);
	  public List<Notice_CalendarBean> getNoticeDetail(Notice_CalendarBean nc);
	  public List<GraphDataBean> getDataGraph(List<ProjectBean> pb);
	  public List<CpMemberBean> getCpMembers(CpMemberBean cmb);
	  public ModelAndView goAdminProject(ProjectMemberBean pmb);
	  public List<WorkDiaryBean> GetDiaryDetail(WorkDiaryBean wdb);
	  public boolean deleteDiary(List<WorkDiaryBean> wdb);
	  public GraphDataBean getSDGraph(ScheduleBean sb);
	  public GraphDataBean getStepGraph(ScheduleBean sb);
	  public List<ScheduleDetailBean> getWork(ScheduleDetailBean sdb);
	  public List<Notice_CalendarBean> notpop(Notice_CalendarBean ncb);
	  public List<ProjectBean> selectProjectReq(ProjectBean pb);
	  public List<ProjectBean> selectProjectMakeReq(ProjectBean pb);
	  public List<ProjectStepBean> getScCompleteList(ScheduleBean psb);
	  public List<FeedbackBean> getPrftList(ProjectBean pb);
	  public List<FeedbackBean> getPsftList(ProjectBean pb);
	  public List<FeedbackBean> getScftList(ScheduleDetailBean sdb);
	  public List<FeedbackBean> getSdftList(ScheduleDetailBean sdb);
	  public List<FeedbackBean> getMyfeedback(ScheduleDetailBean sdb);
	  public List<CpMemberBean> getSearchWord(CpMemberBean cmb);
	  public List<ProjectBean> getCompleteProject(ProjectBean pb);
}
