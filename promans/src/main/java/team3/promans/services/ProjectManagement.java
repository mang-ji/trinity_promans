package team3.promans.services;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ProjectStepBean;

@Service
public class ProjectManagement implements team3.promans.interfaces.ProjectInterface {
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired 
	SqlSession sqlSession;
	
	public ProjectManagement() {}

	


	/* 대기중인 프로젝트 스텝의 승인을 완료 시켜주는 부분 */
	public List<ProjectStepBean> updateStep(List<ProjectStepBean> psb) {

		sqlSession.update("updateStep", psb);
		return null;
	}

	

	
	
}
