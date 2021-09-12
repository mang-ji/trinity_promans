package team3.promans.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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




	public Map<String, String> makeStep(ProjectStepBean psb) {
		Map<String,String> map = new HashMap<>();
		
		/* pscode 생성 어케하쥐 */
		psb.setPscode("PS08");
		
		if(this.convertData(sqlSession.insert("insStep", psb))){
			map.put("message", "스텝 생성이 완료되었습니다.");
		}else {map.put("message","해당 스텝이 이미 존재합니다.");}
		
		return map;
	}

	public boolean convertData(int value) {
		return value>0? true:false;
	}
	
}
