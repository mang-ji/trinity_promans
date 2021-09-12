package team3.promans.services;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
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


	private boolean convertBoolean(int value) {
		return (value>0)?true:false;
	}

	@Override
	public int updateComplete(ScheduleDetailBean sdb) {
		return sqlSession.update("updateComplete", sdb);
	}
	

	
	
}
