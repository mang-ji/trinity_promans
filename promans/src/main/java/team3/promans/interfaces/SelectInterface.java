package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;
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
	  public List<ScheduleBean> selectSchedule(ProjectStepBean psb); 
	  public List<ScheduleDetailBean> getScheDetail(ScheduleDetailBean sdb);
	  public List<ScheduleDetailBean> getSDInfo(ScheduleDetailBean sdb);
	  public List<ScheduleDetailBean> reqForCompletion(ScheduleDetailBean sdb);
}
