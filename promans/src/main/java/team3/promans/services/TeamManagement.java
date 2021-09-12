package team3.promans.services;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;

@Service
public class TeamManagement implements team3.promans.interfaces.TeamInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	SqlSessionTemplate sql;
	

	public void addTeamMember(List<ProjectMemberBean> pm) {
		
		
	}

	public List<ScheduleDetailBean> addJob(ProjectStepBean pmb) {
		List<ScheduleDetailBean> list = sql.selectList("addJob", pmb);
		list.get(0).setPscode(pmb.getPscode());
		return list;
	}
	
	public boolean insSchedule(ScheduleBean sb) {
		int maxSc = this.getMaxSc(sb)+1;
		boolean result = false;
		sb.setSccode((maxSc<10)?"SC0"+maxSc:"SC"+maxSc);
		sb.setScstate("I");sb.setUtype("L");
		if(this.convertBoolean(sql.insert("insSchedule", sb))) {
			if(this.convertBoolean(this.insScheduleMember(sb))) {
				result = true;
			}
		}
		return result;
	}
	
	public boolean requestComplete(ProjectStepBean psb) {
		psb.setStcode("W");
		return this.convertBoolean(sql.update("requestComplete", psb));
	}
	
	public List<ScheduleBean> getComplete(ScheduleBean sb){
		sb.setScstcode("W");
		List<ScheduleBean> list = sql.selectList("getComplete", sb);
		return list;
	}
	
	
	private boolean convertBoolean(int value) {
		return (value>0)?true:false;
	}

	
	@Override
	public int getMaxSc(ScheduleBean psb) {
		return sql.selectOne("getMaxSc", psb);
	}

	@Override
	public int insScheduleMember(ScheduleBean sb) {
		return sql.insert("insScheduleMember", sb);
	}
}
