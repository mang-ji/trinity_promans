package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;

@Component
public interface ScheduleInterface {

	public String writeSchedule(ScheduleDetailBean sdb);
	public ModelAndView writeDiary(ScheduleDetailBean sdb);
	public boolean reqSchedule(List<ScheduleDetailBean> sdb);
	public int reqPass(ScheduleDetailBean sdb);
	public void scheFeedback(List<ScheduleDetailBean> sdb);
	public void insSD(ScheduleDetailBean sdb);
	public void insSM(ScheduleDetailBean sdb);
	public int maxScCode(ScheduleDetailBean sdb);
	public int maxdiary(WorkDiaryBean wdb);
	public ModelAndView reqWork(ScheduleDetailBean sdb);
	public List<ScheduleDetailBean> FirstInsSdBool(ScheduleDetailBean sdb);
	public String getSdUtype(ScheduleDetailBean sdb);
}
