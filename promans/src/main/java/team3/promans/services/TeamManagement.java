package team3.promans.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ProjectMemberBean;

@Service
public class TeamManagement implements team3.promans.interfaces.TeamInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;

	public void addTeamMember(List<ProjectMemberBean> pm) {
		
		System.out.println("서비스  연결 완료 ");
		System.out.println(pm.get(0) + " ::  확인용 ");
		
	}


}
