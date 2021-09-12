package team3.promans.services;

import java.util.List;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.Notice_CalendarBean;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;


@Service
public class SelectInfo implements team3.promans.interfaces.SelectInterface{

	@Autowired
	SqlSessionTemplate sql;

	@Autowired
	Encryption enc;

	@Autowired
	ProjectUtils pu;


	ModelAndView mav;


	/*
	 * public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean ncb){
	 * List<Notice_CalendarBean> list = sql.selectList("getCalendar", ncb); return
	 * list; }
	 */

	
	public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean ncb){
		List<Notice_CalendarBean> list = sql.selectList("getCalendar", ncb);
		return list;
	}







	public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb){
		System.out.println(sdb.getCpcode() + " : " + sdb.getPrcode() + " : " + sdb.getPscode() + " : " + sdb.getUserid());
		List<ScheduleDetailBean> myScheduleList = sql.selectList("getMySchedule", sdb);
		System.out.println(myScheduleList.get(0).getSdcontent());
		return myScheduleList;
	}

	public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb){
		List<WorkDiaryBean> DiaryList = sql.selectList("getDiary", wdb);
		return DiaryList;
	}


	/* 공지사항 리스트 조회 */

	

	public List<Notice_CalendarBean> getNoticeList(Notice_CalendarBean nc) {
		List<Notice_CalendarBean> noticeList;
		noticeList = sql.selectList("getNoticeList", nc);
		return noticeList;
	}
	
	/* 공지사항 추가*/
	public ModelAndView insNotice(Notice_CalendarBean nc) {
		mav = new ModelAndView();
		nc.setNocode("1212");
		
		if(nc.getFile().isEmpty()) {
			nc.setFilepath("");
		}else {
			nc.setFname(nc.getFile().getOriginalFilename());
			nc.setFilepath("/resources/images/"+pu.savingFile(nc.getFile()));
		}
		
		/*
		 * if(ub.getMpfile().isEmpty()){ ub.setStickerpath("");
		 * 
		 * }else { ub.setStickerpath("/resources/image/"+pu.savingFile(ub.getMpfile()));
		 */
		
		sql.insert("insNotice", nc);
		mav.setViewName("noticePage");
		return mav;
		
	}

	public List<ProjectBean> getProject(ProjectMemberBean pmb) {

		return  sql.selectList("getProject", pmb);
	}

	public List<ProjectStepBean> getProjectStep(ProjectMemberBean pmb) {

		return sql.selectList("getProjectStep", pmb);
	}

	public List<ScheduleBean> selectSchedule(ProjectStepBean psb) {

		return sql.selectList("selectSchedule", psb);
	}

	public List<ScheduleDetailBean> getScheDetail(ScheduleDetailBean sdb) {
		List<ScheduleDetailBean> getSD = sql.selectList("getScheDetail", sdb);

		for(int i=0; i< getSD.size(); i++) {

			try {
				getSD.get(i).setUsername(enc.aesDecode(getSD.get(i).getUsername(), getSD.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();} 
		}
		return getSD;

	}



	@Override
	public List<ScheduleDetailBean> getSDInfo(ScheduleDetailBean sdb) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ScheduleDetailBean> reqForCompletion(ScheduleDetailBean sdb) {
		// TODO Auto-generated method stub
		return null;
	}


	//@Override
	public List<ProjectStepBean> selectStep(ProjectStepBean psb) {
		// TODO Auto-generated method stub
		return null;
	}
	
	/* 승인 대기중인 스텝 리스트 조회 */
	public List<ProjectStepBean> selectStepReq(ProjectStepBean psb) {
		List<ProjectStepBean> list = sql.selectList("selectStepReq", psb);
		for(int i=0; i < list.size(); i++) {
			try {
				System.out.println(list.get(i).getUsername() + " : 복호화 전 ");
				list.get(i).setUsername(enc.aesDecode(list.get(i).getUsername(), list.get(i).getUserid()));
				System.out.println(list.get(i).getUsername() + "  : 복호화 후  ");	
			} catch (Exception e) {e.printStackTrace();}
		}
		return list;
	}

	public List<ProjectStepBean> getCompleteList(ProjectStepBean psb) {
		psb.setUtype("L");
		List<ProjectStepBean> list = sql.selectList("getCompleteList", psb);
		return list;
	}

	/* 프로젝트 멤버 테이블에 있고 유저타입이 일반인 멤버 조회 */
	public List<ProjectStepBean> selectManager(ProjectStepBean psb) {
		List<ProjectStepBean> list = null;
		try {
			psb.setCpcode((String)pu.getAttribute("cpcode"));
			list = sql.selectList("selectManager",psb);
			for(int i=0; i<list.size();i++) {
				list.get(i).setUsername(enc.aesDecode(list.get(i).getUsername(), list.get(i).getUserid()));
			}
		} catch (Exception e) {e.printStackTrace();}
		
		return list;
	}
}


