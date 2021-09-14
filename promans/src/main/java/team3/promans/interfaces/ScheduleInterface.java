package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;

import team3.promans.beans.ScheduleDetailBean;

@Component
public interface ScheduleInterface {

	public int writeSchedule(ScheduleDetailBean sdb);
	public int writeDiary(ScheduleDetailBean sdb);
	//public int reqSchedule(ScheduleDetailBean sdb);
	public int reqPass(ScheduleDetailBean sdb);
	public void scheFeedback(List<ScheduleDetailBean> sdb);
	public void insSD(ScheduleDetailBean sdb);
	public void insSM(ScheduleDetailBean sdb);
}
