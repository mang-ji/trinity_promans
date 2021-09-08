package team3.promans.auth;

import java.util.List;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;

@Service
public class SelectInfo implements team3.promans.interfaces.SelectInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	SqlSessionTemplate sql;

	ModelAndView mav;
	




/*내 업무 조회*/
public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb) {
	List<ScheduleDetailBean> getMySchedulelist;
	try {
		sdb.setSdtitle((String)pu.getAttribute("sdtitle"));
		sdb.setSdname((String)pu.getAttribute("sdname"));
		sdb.setUserid((String)pu.getAttribute("userid"));
		sdb.setSddate((String)pu.getAttribute("sddate"));
	}catch(Exception e) {
		e.printStackTrace();
	}
	System.out.println(sdb.getUserid()+"확인해");
	getMySchedulelist = sql.selectList("getMySchedule", sdb);
	return getMySchedulelist;
}

/*업무 일지 조회*/
public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb){
	List<WorkDiaryBean> getDiarylist;
	
	getDiarylist = sql.selectList("getDiary", wdb);
	return getDiarylist;
}





}
