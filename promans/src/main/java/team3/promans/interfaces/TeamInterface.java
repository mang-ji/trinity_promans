package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.CpMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;

@Component
public interface TeamInterface {
	public List<ScheduleDetailBean> addJob(ProjectStepBean psb);
	public boolean insSchedule(ScheduleBean psb);
	public int getMaxSc(ScheduleBean sb);
	public boolean requestComplete(ProjectStepBean psb);
	public List<ScheduleBean> getComplete(ScheduleBean sb);
	public int insScheduleMember(ScheduleBean sb);
	public boolean getPsUtype(ProjectStepBean psb);
	
}
