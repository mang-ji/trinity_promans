package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleDetailBean;

@Component
public interface ProjectInterface {

	public List<ProjectStepBean> updateStep(List<ProjectStepBean> psb);
	public ModelAndView reqComplete(ScheduleDetailBean sdb);
	public int updateComplete(ScheduleDetailBean sdb);
}
