package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;

import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;

@Component
public interface SelectInterface {
	public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb);
	public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb);
}
