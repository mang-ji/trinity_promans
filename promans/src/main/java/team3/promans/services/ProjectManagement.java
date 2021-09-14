package team3.promans.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleDetailBean;

@Service
public class ProjectManagement implements team3.promans.interfaces.ProjectInterface {
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired 
	SqlSession sqlSession;
	
	ModelAndView mav;
	
	public ProjectManagement() {}

	


	/* 대기중인 프로젝트 스텝의 승인을 완료 시켜주는 부분 */
	public List<ProjectStepBean> updateStep(List<ProjectStepBean> psb) {

		sqlSession.update("updateStep", psb);
		return null;
	}
	
	
	public ModelAndView reqComplete(ScheduleDetailBean sdb) {
		mav = new ModelAndView();
		sdb.setUtype("L");
		System.out.println(sdb);
		//S=완료  I=피드백(진행)
//		if(sdb.getSddstate() == "S") {
//			if(this.convertBoolean(this.updateComplete(sdb))) {
//				mav.addObject("message", "완료 요청을 승인하였습니다.");
//			}
//		}else {
//			//업무 테이블 UPDATE
//			if(this.convertBoolean(this.updateComplete(sdb))) {
//				sdb.setSddstate("1");
//				//피드백 테이블 INSERT
//				if(this.convertBoolean(sqlSession.insert("reqComplete", sdb))) {
//					mav.addObject("message", "피드백을 전송하였습니다.");
//				}
//			}
//		}
//		mav.setViewName("adminProject");
		return mav;
	}


	@Override
	public int updateComplete(ScheduleDetailBean sdb) {
		return sqlSession.update("updateComplete", sdb);
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


	/* 스텝에 멤버추가시 이미 존재하는 회원은 거르고 스텝 테이블에 인서트 하는 부분 */
	public Map<String,String> insProjectMember(ProjectMemberBean pmb) {
		Map<String,String> map = new HashMap<String, String>();
		int i = sqlSession.selectOne("checkUserid",pmb);

		if(this.convertData(i)) {
			map.put("message", "멤버가 이미 존재합니다.");
		}else {
			sqlSession.insert("insProjectMember", pmb);
			map.put("message", "멤버 추가 완료하였습니다.");
		}

		return map;
		
	}
	
/* 피드백 테이블에 프로젝트*/
	public Map<String,String> insProjectFeedback(ScheduleDetailBean sdb) {
		Map<String,String> map = new HashMap<String, String>();
		map.put("message", "피드백에 실패하였습니다.");
		if(this.convertData(sqlSession.insert("insProjectFeedback", sdb))) {
			if(this.convertData(sqlSession.update("updateProjectStep",sdb))) {
				map.put("message", "피드백이 완료되었습니다.");
			}
		}
		return map;
	}
	
	public boolean convertData(int value) {
		return value>0? true:false;
	}

}
