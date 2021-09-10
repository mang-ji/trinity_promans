package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;


import team3.promans.beans.WorkDiaryBean;
import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;

@Component
public interface SelectInterface {
	  public List<ProjectBean> getProject(ProjectMemberBean pmb); 
	  public List<ProjectStepBean> getProjectStep(ProjectMemberBean pmb); 
	  public List<ScheduleBean> selectSchedule(ProjectStepBean psb); 
	  public List<ScheduleDetailBean> getScheDetail(ScheduleDetailBean sdb);
	  public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb);
	  public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb);
}
