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
import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
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
	
	public ModelAndView makeStep(ProjectStepBean psb) {
		mav = new ModelAndView();
		
		psb.setPscode(this.stepMax(psb));
	
			/* ps관리자를 Ps테이블에 넣어줌 */
			if(this.convertData(sqlSession.insert("insStep", psb))){
				/* + 추가작업) 총관리자 userid 를 다시 셀렉해서 */
				psb.setPscode(psb.getPscode() + "-A");
				psb.setUserid(sqlSession.selectOne("selectAllManagerUserid", psb));
				/* 총관리자를 ps테이블에 먼저 넣어줌 */
				if(this.convertData(sqlSession.insert("insAllManagerToPs",psb))) {
					mav.setViewName("redirect:/");
					mav.setViewName("adminProject");
					mav.addObject("message", "스텝 생성이 완료되었습니다.");
				}
			}else {
				mav.setViewName("adminProject");
				mav.addObject("message","해당 스텝이 이미 존재합니다.");}
		
		
		
		return mav;
	}

	public String stepMax(ProjectStepBean psb) {
		/* pscode 생성 어케하쥐 */
		int psMax = sqlSession.selectOne("selectStepMax",psb);
		String stringMax ="";
		if((psMax+1)<10) {
			stringMax = "PS0" + (psMax+1);
		}else {
			stringMax = "PS" +(psMax+1);
		}
		return stringMax;
	}

	/* 스텝에 멤버추가시 이미 존재하는 회원은 거르고 스텝 테이블에 인서트 하는 부분 */
	public Map<String,String> insProjectMember(ProjectMemberBean pmb) {
		Map<String,String> map = new HashMap<String, String>();
		String[] userid = pmb.getUserid().split(",");
		int check;
		
		for(int i=0;i<userid.length;i++) {
			pmb.setUserid(userid[i]);
			check = sqlSession.selectOne("checkUserid",pmb);
			if(this.convertData(check)) {
				map.put("message", "멤버가 이미 존재합니다.");
			}else {
				sqlSession.insert("insProjectMember", pmb);
				map.put("message", "멤버 추가 완료하였습니다.");
			}
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




	/* 프로젝트가 총괄한테 프로젝트 완료요청하는 부분 (필요는 없지만 일단 써놓는거임용) */
	public Map<String, String> reqProjectAccept(ProjectBean pb) {
		Map<String,String> map = new HashMap<>();
		/* 스텝의  완료 요청 상태 카운트 가져오기 */
		int completeCount = sqlSession.selectOne("selectProStepCompleteCount",pb); // cp,pr code 
		/* 스텝의 갯수 가져오기 */
		int allCount = sqlSession.selectOne("selectProStepCount",pb);
		if(completeCount==allCount) {
			if(this.convertData(sqlSession.update("reqProjectAccept", pb))) {
				map.put("message", "프로젝트 완료 요청을 전송하였습니다.");
			} 
		}else {map.put("message", "완료 처리되지 않은 프로젝트 스텝이 존재하여 완료 요청이 불가합니다.");}
		
		return map;
	}


	public Map<String,String> deleteProjectMember(ProjectMemberBean pmb) {
		Map<String,String> map = new HashMap<>();
		if(this.convertData(sqlSession.delete("deleteProjectMember", pmb))) {
			map.put("message", "팀원 삭제가 완료되었습니다. ");
		}
		return map;
	}


	public ModelAndView createProject(ProjectBean pb) {
		ModelAndView mav = new ModelAndView();
		String userid = "";
		String cpcode = "";
	
		try {
			userid = (String)pu.getAttribute("userid");
			cpcode = (String)pu.getAttribute("cpcode");

			pb.setCpcode(cpcode);
			pb.setUserid(userid);
			

			int max = this.getProMax(pb) + 1;

			pb.setPrcode(max<10? "PR0"+max:"PR"+max);

			if(pu.getAttribute("utype").equals("A")){
				pb.setPrstate("I");
				pb.setPrutype("L");
				if(this.convertData(sqlSession.insert("createProject", pb))){
					if(this.convertData(sqlSession.insert("insertPmTable",pb))) {
						mav.setViewName("redirect:/");
					}
				}else {
					mav.setViewName("redirect:/");
					mav.addObject("message","프로젝트 생성에 실패했습니다.");
				}
			}else {
				pb.setPrstate("Y");
				pb.setPrutype("Y");
				if(this.convertData(sqlSession.insert("createProject", pb))){
					if(this.convertData(sqlSession.insert("insertPmTable",pb))) {
						mav.setViewName("redirect:/");
					}
				}else {
					mav.setViewName("redirect:/");
					mav.addObject("message","프로젝트 생성에 실패했습니다.");
				}
			}
		} catch (Exception e) {e.printStackTrace();}

		return mav;
	}

	@Override
	public int getProMax(ProjectBean pb) {
		return sqlSession.selectOne("selectProMax",pb);
	}

	public Map<String,String> updateProjectAccept(ProjectBean pb) {
		Map<String,String> map = new HashMap<>();
		map.put("message", "승인에 실패하셨습니다.");
		if(this.convertData(sqlSession.update("updateProjectAccept", pb))) {
		
			map.put("message", " 승인이 완료되었습니다. ");
		}
		return map;
	}




	public Map<String, String> rejectProject(ProjectBean pb) {
		Map<String,String> map = new HashMap<>();
		map.put("message", "피드백에 실패하였습니다.");
		if(this.convertData(sqlSession.insert("rejectProject",pb))) { /*피드백테이블에 인서트 */
			if(this.convertData(sqlSession.update("updateFeedBack",pb))) {
				map.put("message", "피드백을 완료하였습니다.");
			}
		}
		return map;
	}


	public Map<String, String> acceptMakeProject(ProjectBean pb) {
		Map<String,String> map = new HashMap<>();
		map.put("message", " 승인 실패하였습니다.");
		/* 프로젝트 보류 > 진행으로 업데이트 */
		if(this.convertData(sqlSession.update("acceptMakeProject", pb))) {
			/* 프로젝트 멤버 테이블에서 보류상태인 관리자를 리더로 업데이트 */
			if(this.convertData(sqlSession.update("updateLeader",pb))) {
				/* 총괄 프로젝트멤버테이블에 넣으려고 userid 설정하는 부분 */
				try {
					pb.setUserid((String)pu.getAttribute("userid"));
				} catch (Exception e) {e.printStackTrace();}
				/* 총관리자도 프로젝트 멤버에 넣어줌 (추가작업임) */
				if(this.convertData(sqlSession.insert("insertAllManagerToPm", pb))) {
					map.put("message", "승인을 완료하였습니다.");
					
				}
			}
		}
		return map;
	}




	public Map<String, String> insProjectStepAccept(ProjectStepBean psb) {
		Map<String,String> map = new HashMap<>();
		map.put("message", "프로젝트 스텝 승인에 실패하였습니다.");
		/* 먼저 리더인 사람의 프로젝트 스텝을 업데이트 해주고 */
		if(this.convertData(sqlSession.update("updateProjectStepAccept",psb))){
			psb.setUserid(sqlSession.selectOne("selectAllManagerUserid",psb));
			psb.setPscode(psb.getPscode() + "-A");
			if(this.convertData(sqlSession.update("updateProjectStepAccept",psb))) {
				map.put("message", "프로젝트 스텝 승인을 완료하였습니다.");
			}
		}
		return map;
	}




	public boolean scSendFeed(ScheduleDetailBean sdb) {
		boolean result = false;
		//bean --> cp cr ps sc id con
		sdb.setSddstate("1");
		if(convertData(sqlSession.insert("scSendFeed",sdb))) {
			if(this.scSendFeedUpdate(sdb)) {
				result = true;
			}
		}
		return result;
	}

	@Override
	public boolean scSendFeedUpdate(ScheduleDetailBean sdb) {
		return this.convertData(sqlSession.update("scSendFeedUpdate",sdb));
	}




	public boolean CompleteConfirm(ScheduleBean sb) {
		boolean result = false;
		
		if(convertData(sqlSession.update("CompleteConfirm",sb))) {
			result = true;
		}
		
		return result;
	}




	
}
