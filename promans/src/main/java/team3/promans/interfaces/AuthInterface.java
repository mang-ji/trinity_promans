package team3.promans.interfaces;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.AccessHistory;
import team3.promans.beans.CpMemberBean;
import team3.promans.beans.ScheduleBean;

@Component
public interface AuthInterface {
	public boolean idCheck(AccessHistory ah);
	public String getPass(AccessHistory ah);
	public CpMemberBean getUserInfo(AccessHistory ah);
	public boolean insAccessHistory(AccessHistory ah);
	public int insCpMember(CpMemberBean cm);
	public int getMethod(AccessHistory ah);
	public int logOutAh(AccessHistory ah);
	
	public String getCpMax(CpMemberBean cmb);
	public ModelAndView registerCompany(CpMemberBean cmb);
}
