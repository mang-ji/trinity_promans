package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;

import team3.promans.beans.ProjectStepBean;

@Component
public interface ProjectInterface {

	public List<ProjectStepBean> updateStep(List<ProjectStepBean> psb);
}
