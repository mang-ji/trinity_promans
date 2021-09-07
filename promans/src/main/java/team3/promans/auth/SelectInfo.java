package team3.promans.auth;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;

@Service
public class SelectInfo implements team3.promans.interfaces.SelectInterface{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	SqlSession sql;

	public List<ProjectBean> getProject(ProjectMemberBean pmb) {
	
		return  sql.selectList("getProject", pmb);
	}

	public List<ProjectStepBean> getProjectStep(ProjectMemberBean pmb) {
		
		return sql.selectList("getProjectStep", pmb);
	}

	public List<ScheduleBean> selectSchedule(ProjectStepBean psb) {

		return sql.selectList("selectSchedule", psb);
	}

	public List<ScheduleDetailBean> getScheDetail(ScheduleDetailBean sdb) {
		List<ScheduleDetailBean> getSD = sql.selectList("getScheDetail", sdb);
		
		for(int i=0; i< getSD.size(); i++) {
			
			try {
				getSD.get(i).setUsername(enc.aesDecode(getSD.get(i).getUsername(), getSD.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();} 
		}
		return getSD;
	}
}
	
	

