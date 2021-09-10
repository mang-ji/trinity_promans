package team3.promans.auth;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;

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






	public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb){
		System.out.println(sdb.getCpcode() + " : " + sdb.getPrcode() + " : " + sdb.getPscode() + " : " + sdb.getUserid());
		List<ScheduleDetailBean> myScheduleList = sql.selectList("getMySchedule", sdb);
		
		System.out.println(myScheduleList);
		return myScheduleList;
	}

	public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb){
		List<WorkDiaryBean> DiaryList = sql.selectList("getDiary", wdb);
		return DiaryList;
	}

	
	public List<Notice_CalendarBean> getNoticeList(Notice_CalendarBean nc) {
		List<Notice_CalendarBean> noticeList;
		noticeList = sql.selectList("getNoticeList", nc);
		return noticeList;

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
	public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean nc) {
		// TODO Auto-generated method stub
		return null;
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

	@Override
	public List<ProjectStepBean> selectStep(ProjectStepBean psb) {
		// TODO Auto-generated method stub
		return null;
	}
}



