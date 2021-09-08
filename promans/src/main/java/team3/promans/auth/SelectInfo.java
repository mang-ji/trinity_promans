package team3.promans.auth;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.beans.Notice_CalendarBean;

@Service
public class SelectInfo implements team3.promans.interfaces.SelectInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	SqlSessionTemplate sql;
	
	public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean ncb){
		List<Notice_CalendarBean> list = sql.selectList("getCalendar", ncb);
		return list;
	}
	
}
