package team3.promans.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ScheduleBean;
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


//업무일지작성
public Map<String,String> writeDiary(WorkDiaryBean wdb) {
	Map<String,String> map = new HashMap<>();
	int max = this.maxdiary(wdb) + 1;
	wdb.setWdcode(max < 10 ? "WD0" +max:"WD"+max);

	if(this.convertBoolean(sql.insert("writeDiary", wdb))) {
		map.put("message", "완료되었다!");
	}else {
		map.put("message", "안되");
	}
	return map;

}

//업무 디테일 완료요청(일반멤버)
public boolean reqSchedule(List<ScheduleDetailBean> sdb) {
	boolean result = false;
	for(int i = 0; i<sdb.size(); i++) {
		try {
			sdb.get(i).setUserid((String) pu.getAttribute("userid"));
		} catch (Exception e) {e.printStackTrace();}

		if(this.convertBoolean(sql.update("reqSchedule", sdb.get(i)))) {
			result=true;
		}else {
			result=false;
		}
	}
	return result;
}

	public int reqPass(ScheduleDetailBean sdb) {
	
		return sql.update("reqPass", sdb);
		
	}

	public void scheFeedback(List<ScheduleDetailBean> sdb) {
	    sdb.get(0).setSdcontent(sdb.get(1).getSdcontent());
		sql.insert("scheFeedback", sdb.get(0));
		this.updateScheFeedback(sdb);
		
		
	}
	
	public void updateScheFeedback (List<ScheduleDetailBean> sdb) {
	
		sql.update("updateScheFeedback",sdb.get(0));
	}


	public void insSD(ScheduleDetailBean sdb) {
		int max = this.maxScCode(sdb)+1;
		
		sdb.setSdcode((max<10)?"SD0"+max:"SD"+max);
		sql.insert("insSD", sdb);
		this.insSM(sdb);	
	}
	
	public void insSM(ScheduleDetailBean sdb) {
		sql.insert("insSM", sdb);
	}
	
	
	
	private boolean convertBoolean(int value) {
		return (value>0)?true:false;
	}
	
	public int maxScCode(ScheduleDetailBean sdb) {
		return sql.selectOne("maxScCode", sdb);
	}

	@Override
	public ModelAndView writeDiary(ScheduleDetailBean sdb) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String writeSchedule(ScheduleDetailBean sdb) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int maxdiary(WorkDiaryBean wdb) {
		
		return sql.selectOne("maxdiary", wdb);
	}


	public ModelAndView reqWork(ScheduleDetailBean sdb) {
	 mav = new ModelAndView();
	 System.out.println(sdb);
		if(sql.update("reqWork", sdb) ==1) {
			mav.setViewName("adminSchedule");
		}else {
			
			mav.setViewName("adminSchedule");
		}
		
		
	 return  mav;
		
	}

	public Map<String, String> reqSc(ScheduleBean sb) {
		Map<String,String> map = new HashMap<>();
		
		
		if(this.convertBoolean(sql.update("reqSc", sb))) {
		map.put("message", "업무 승인 요청이 완료 되었습니다.");
		}
		
		
		return map;
	}
}