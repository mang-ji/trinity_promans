package team3.promans.interfaces;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleDetailBean;

@Component
public interface ProjectInterface {

	public List<ProjectStepBean> updateStep(List<ProjectStepBean> psb);
	public ModelAndView reqComplete(ScheduleDetailBean sdb);
	public int updateComplete(ScheduleDetailBean sdb);
	public Map<String, String> makeStep(ProjectStepBean psb);
	public Map<String,String> insProjectMember(ProjectMemberBean pmb);
	public Map<String, String> insProjectFeedback(ScheduleDetailBean sdb);
	public Map<String,String> deleteProjectMember(ProjectMemberBean pmb);
	public boolean createProject(ProjectBean pb);
	public int Maxprcode();
}
