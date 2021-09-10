package team3.promans.services;

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

}
