package team3.promans.services;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleDetailBean;

@Service
public class TeamManagement implements team3.promans.interfaces.TeamInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	SqlSessionTemplate sql;

	public void addTeamMember(List<ProjectMemberBean> pm) {
		
		
	}

	public List<ScheduleDetailBean> addJob(ProjectStepBean pmb) {
		List<ScheduleDetailBean> list = sql.selectList("addJob", pmb);
		list.get(0).setPscode(pmb.getPscode());
		return list;
	}
	
	
}
