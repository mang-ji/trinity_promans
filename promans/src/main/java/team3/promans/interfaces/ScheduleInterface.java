package team3.promans.interfaces;

import org.springframework.stereotype.Component;

import team3.promans.beans.ScheduleDetailBean;

@Component
public interface ScheduleInterface {

	public int writeSchedule(ScheduleDetailBean sdb);
	public int writeDiary(ScheduleDetailBean sdb);
	//public int reqSchedule(ScheduleDetailBean sdb);
}
