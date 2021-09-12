package team3.promans.services;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


	public int writeSchedule(ScheduleDetailBean sdb) {
		try {
			pu.setAttribute("sdcontent", sdb.getSdcontent());
			pu.setAttribute("sdname", sdb.getSdname());
			pu.setAttribute("sddate", sdb.getSddstate());
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return sql.insert("writeSchedule", sdb);
	}
	

	public int writeDiary(WorkDiaryBean wdb) {
	
		return sql.insert("writeDiary", wdb);
	}


/*업무 디테일 완료요청(일반멤버)
	public int reqSchedule(ScheduleDetailBean sdb) {
		
		return sql.update("reqSchedule", sdb);
	}*/

	@Override
	public int writeDiary(ScheduleDetailBean sdb) {
		return 0;
	}


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
	
	

}
