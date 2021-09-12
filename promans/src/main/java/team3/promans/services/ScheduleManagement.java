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
		//세션
		try {
			sdb.setCpcode((String)pu.getAttribute("cpcode"));
			sdb.setUserid((String)pu.getAttribute("userid"));
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		sdb.setPrcode("PR04");
		sdb.setPscode("PS01");
		sdb.setSccode("SC03");
		sdb.setSdcode("SD01");
		//유저작성 
		System.out.println(sdb.getSdname());
		System.out.println(sdb.getSdcontent());
		String result = "0";
		try {
			pu.setAttribute("sdcontent", sdb.getSdcontent());
			pu.setAttribute("sdname", sdb.getSdname());
		} catch (Exception e) {
			e.printStackTrace();
		}		
		
		if(sql.insert("writeSchedule", sdb)==1) {
			result = "1";
		}
		
		return Integer.parseInt(result);
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
