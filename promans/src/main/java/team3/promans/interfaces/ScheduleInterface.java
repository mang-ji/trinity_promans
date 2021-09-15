package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ScheduleDetailBean;

@Component
public interface ScheduleInterface {

	public String writeSchedule(ScheduleDetailBean sdb);
	public String writeDiary(ScheduleDetailBean sdb);
	//public int reqSchedule(ScheduleDetailBean sdb);
	public int reqPass(ScheduleDetailBean sdb);
	public void scheFeedback(List<ScheduleDetailBean> sdb);
	public void insSD(ScheduleDetailBean sdb);
	public void insSM(ScheduleDetailBean sdb);
}
