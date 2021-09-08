package team3.promans.auth;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.beans.Notice_CalendarBean;

@Service
public class SelectInfo implements team3.promans.interfaces.SelectInterface{
	
	@Autowired
	SqlSessionTemplate sql;
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;

	public List<Notice_CalendarBean> getNoticeList(Notice_CalendarBean nc) {
		List<Notice_CalendarBean> noticeList;
		noticeList = sql.selectList("getNoticeList", nc);
		return noticeList;
	}
}
