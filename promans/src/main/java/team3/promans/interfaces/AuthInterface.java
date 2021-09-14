package team3.promans.interfaces;

import org.springframework.stereotype.Component;

import team3.promans.beans.AccessHistory;
import team3.promans.beans.CpMemberBean;

@Component
public interface AuthInterface {
	public boolean idCheck(AccessHistory ah);
	public String getPass(AccessHistory ah);
	public CpMemberBean getUserInfo(AccessHistory ah);
	public boolean insAccessHistory(AccessHistory ah);
	public int insCpMember(CpMemberBean cm);
	public int getMethod(AccessHistory ah);
	public int logOutAh(AccessHistory ah);
	
}
