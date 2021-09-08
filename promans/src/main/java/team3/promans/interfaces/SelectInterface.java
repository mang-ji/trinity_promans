package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;

import team3.promans.beans.Notice_CalendarBean;

@Component
public interface SelectInterface {
	public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean nc);
}
