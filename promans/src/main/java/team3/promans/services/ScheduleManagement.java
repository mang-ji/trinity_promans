package team3.promans.services;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;

@Service
public class ScheduleManagement implements team3.promans.interfaces.ScheduleInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;

	@Autowired
	SqlSessionTemplate sql;
	
	ModelAndView mav;


	public String writeSchedule(ScheduleDetailBean sdb) {
		System.out.println(sdb);
		String msg = "";
		System.out.println("작성 여긴오냐?");
		if(this.convertBoolean(sql.insert("writeSchedule", sdb))) {
			msg = "성공";
		}else {
			msg = "실패";
		}

		return msg;
	}
	

	public String writeDiary(WorkDiaryBean wdb) {
		System.out.println("일지작성?");
		sql.insert("writeDiary", wdb);
		return "";
	}


/*업무 디테일 완료요청(일반멤버)
	public int reqSchedule(ScheduleDetailBean sdb) {
		
		return sql.update("reqSchedule", sdb);
	}*/



	public int reqPass(ScheduleDetailBean sdb) {
	
		return sql.update("reqPass", sdb);
		
	}

	public void scheFeedback(List<ScheduleDetailBean> sdb) {
	     sdb.get(0).setSdcontent(sdb.get(1).getSdcontent());
	    System.out.println(sdb.get(0));
		sql.insert("scheFeedback", sdb.get(0));
		this.updateScheFeedback(sdb);
		
		
	}
	
	public void updateScheFeedback (List<ScheduleDetailBean> sdb) {
		System.out.println("피드백 여기 업뎃");
		sql.update("updateScheFeedback",sdb.get(0));
	}



	public void insSD(ScheduleDetailBean sdb) {
		System.out.println(sdb);
		sql.insert("insSD", sdb);
			this.insSM(sdb);	
	}
	
	public void insSM(ScheduleDetailBean sdb) {
		sql.insert("insSM", sdb);
	}
	@Override
	public ModelAndView writeDiary(ScheduleDetailBean sdb) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private boolean convertBoolean(int value) {
		return (value>0)?true:false;
	}

}
