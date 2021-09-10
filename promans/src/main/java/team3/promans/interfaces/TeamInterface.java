package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;

import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleDetailBean;

@Component
public interface TeamInterface {
	public List<ScheduleDetailBean> addJob(ProjectStepBean psb);
}
