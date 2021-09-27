package team3.promans.services;

import java.util.ArrayList;
import java.util.List;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import oracle.net.aso.p;
import team3.promans.beans.ScheduleBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.CpMemberBean;
import team3.promans.beans.GraphDataBean;
import team3.promans.beans.Notice_CalendarBean;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.print.attribute.standard.PDLOverrideSupported;

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
	SqlSessionTemplate sql;

	@Autowired
	Encryption enc;

	@Autowired
	ProjectUtils pu;


	ModelAndView mav;


	public List<Notice_CalendarBean> getCalendar(Notice_CalendarBean ncb){
		List<Notice_CalendarBean> list = sql.selectList("getCalendar", ncb);
		return list;
	}


	
	public List<ScheduleDetailBean> getMySchedule(ScheduleDetailBean sdb){
		List<ScheduleDetailBean> myScheduleList = sql.selectList("getMySchedule", sdb); 
		System.out.println("업무조회다");
		return myScheduleList;
	}

	public List<WorkDiaryBean> getDiary(WorkDiaryBean wdb){
		List<WorkDiaryBean> getDiaryList = sql.selectList("getDiary", wdb);
		System.out.println("일지 잘뜨네이제");
		System.out.println(getDiaryList);
		return getDiaryList;
	}


	/* 공지사항 리스트 조회 */
	public List<Notice_CalendarBean> getNoticeList(Notice_CalendarBean nc) {
		List<Notice_CalendarBean> noticeList;
		noticeList = sql.selectList("getNoticeList", nc);
		return noticeList;
	}

	/* 공지사항 추가*/
	public ModelAndView insNotice(Notice_CalendarBean nc) {
		mav = new ModelAndView();
		int max = this.getMaxNocode(nc);
			nc.setNocode(max+1+"");

		if(nc.getFile().isEmpty()) {
			nc.setFname("");
			nc.setFilepath("");
		}else {
			nc.setFname(nc.getFile().getOriginalFilename());
			nc.setFilepath("/resources/images/"+pu.savingFile(nc.getFile()));
		}

		sql.insert("insNotice", nc);
		mav.setViewName("noticePage");
		return mav;

	}
	
	/* 공지사항 삭제 */
	public ModelAndView noticeDelete(Notice_CalendarBean list) {
		mav = new ModelAndView();
		String[] list2 = list.getNocode().split(",");
		List<Notice_CalendarBean> nc = new ArrayList<Notice_CalendarBean>();
		List<String> list3 = new ArrayList<String>();
		
		for(int i=0; i<list2.length; i++) {
			list3.add(list2[i]);
			nc.add(list);
			nc.get(i).setNocode(list3.get(i));
			nc.get(i).setCpcode(list.getCpcode());
			if(this.convertBoolean(sql.delete("noticeDelete",nc.get(i)))) {
				mav.setViewName("noticePage");
			}else {
				mav.setViewName("noticePage");
				mav.addObject("message","다시 시도해주세요.");
			}
		}
		
		return mav;
	}


	public List<ProjectBean> getProject(ProjectMemberBean pmb) {

		return  sql.selectList("getProject", pmb);
	}

	public List<ProjectStepBean> getProjectStep(ProjectMemberBean pmb) {
		
		try {
			pmb.setUserid((String)pu.getAttribute("userid"));
		} catch (Exception e) {e.printStackTrace();}
		
		List<ProjectStepBean> list = sql.selectList("getProjectStep", pmb);
		String utype = sql.selectOne("selectUtype",pmb); /*utype 가져오려고 */
		try {
			pu.setAttribute("utype", utype); /* utype 을 아예 세션화 시킴 */
		} catch (Exception e) {e.printStackTrace();} 
		
		return list;
	}

	public List<ScheduleBean> selectSchedule(ProjectStepBean psb) {
		List<ScheduleBean> list = sql.selectList("selectSchedule", psb);
		
		try {
			if(list.size() != 0) {
			pu.setAttribute("pscode", list.get(0).getPscode());
			pu.setAttribute("utype", list.get(0).getUtype());
			
			}
		} catch (Exception e) {e.printStackTrace();}
		return list;
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


	public List<ScheduleDetailBean> getSDInfo(ScheduleDetailBean sdb) {
		try {
			pu.setAttribute("pscode", sdb.getSccode());
			
			
		} catch (Exception e) {e.printStackTrace();}
		
		return  sql.selectList("getSDInfo", sdb);
	}

	public List<ScheduleDetailBean> reqForCompletion(ScheduleDetailBean sdb){
		List<ScheduleDetailBean> req = sql.selectList("reqForCompletion", sdb);

		for(int i=0; i< req.size(); i++) {

			try {
				req.get(i).setUsername(enc.aesDecode(req.get(i).getUsername(), req.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();} 
		}

		return req;
	}

	/* 승인 대기중인 스텝 리스트 조회 */
	public List<ProjectStepBean> selectStepReq(ProjectStepBean psb) {
		List<ProjectStepBean> list = sql.selectList("selectStepReq", psb);
		for(int i=0; i < list.size(); i++) {
			try {
				list.get(i).setUsername(enc.aesDecode(list.get(i).getUsername(), list.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();}
		}
		return list;
	}

	public List<ProjectStepBean> getCompleteList(ProjectStepBean psb) {
		psb.setUtype("L");
		List<ProjectStepBean> list = sql.selectList("getCompleteList", psb);
		return list;
	}

	/* 프로젝트 멤버 테이블에 있고 유저타입이 일반인 멤버 조회 */
	public List<ProjectStepBean> selectManager(ProjectStepBean psb) {
		List<ProjectStepBean> list = null;
		try {
			psb.setCpcode((String)pu.getAttribute("cpcode"));
			list = sql.selectList("selectManager",psb);
			for(int i=0; i<list.size();i++) {
				list.get(i).setUsername(enc.aesDecode(list.get(i).getUsername(), list.get(i).getUserid()));
				
			}
		} catch (Exception e) {e.printStackTrace();}

		 System.out.println(list);
		return list;
	}


	public List<ProjectMemberBean> selectProjectMember(ProjectMemberBean pmb) {
		List<ProjectMemberBean> list = sql.selectList("selectProjectMember", pmb);
		for(int i=0; i<list.size();i++) {
			try {
				list.get(i).setUname(enc.aesDecode(list.get(i).getUname(),list.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();
			}
		}
		return list;
		}

	@Override
	public int getMaxNocode(Notice_CalendarBean nc) {
		
		return sql.selectOne("getMaxNocode", nc);
	}

	public List<Notice_CalendarBean> getNoticeDetail(Notice_CalendarBean nc) {
		return sql.selectList("getNoticeDetail",nc);
	}

	
	private boolean convertBoolean(int value) {
		return value > 0?true:false;
	}


	public List<GraphDataBean> getDataGraph(List<ProjectBean> pb) {
		List<GraphDataBean> gdb = new ArrayList<GraphDataBean>(pb.size());
		
		gdb = sql.selectList("getGraphInfo",pb.get(0));
		for(int i=0; i<pb.size(); i++) {
			gdb.get(i).setStepW(sql.selectOne("getDataGraphPsW", pb.get(i)));
			gdb.get(i).setScheW(sql.selectOne("getDataGraphScW", pb.get(i)));
			gdb.get(i).setSdW(sql.selectOne("getDataGraphSdW", pb.get(i)));
			gdb.get(i).setStepI(sql.selectOne("getDataGraphPsI", pb.get(i)));
			gdb.get(i).setScheI(sql.selectOne("getDataGraphScI", pb.get(i)));
			gdb.get(i).setSdI(sql.selectOne("getDataGraphSdI", pb.get(i)));
			gdb.get(i).setStepC(sql.selectOne("getDataGraphPsC", pb.get(i)));
			gdb.get(i).setScheC(sql.selectOne("getDataGraphScC", pb.get(i)));
			gdb.get(i).setSdC(sql.selectOne("getDataGraphSdC", pb.get(i)));	
		}
		  
		return gdb;
		
	}




	public List<CpMemberBean> getCpMembers(CpMemberBean cmb) {
		List<CpMemberBean> list = sql.selectList("getCpMembers", cmb);
		for(int i=0; i< list.size(); i++) { 
			try { /* 암호화된 cpmember 의 정보를 복호화해서 가져오기 */
				list.get(i).setUname(enc.aesDecode(list.get(i).getUname(), list.get(i).getUserid()));
				list.get(i).setUphone(enc.aesDecode(list.get(i).getUphone(),list.get(i).getUserid()));
				list.get(i).setMail(enc.aesDecode(list.get(i).getMail(), list.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();}
		}
		return list;
	}



	public ModelAndView goAdminProject(ProjectMemberBean pmb) {
		ModelAndView mav = new ModelAndView();
		
		try {
			pmb.setCpcode((String)pu.getAttribute("cpcode"));
			pmb.setPrcode((String)pu.getAttribute("prcode"));
			pmb.setUserid((String)pu.getAttribute("userid"));
			pu.setAttribute("utype", sql.selectOne("goAdminProject", pmb));
			
		} catch (Exception e) {e.printStackTrace();}
		mav.setViewName("adminProject");
		return mav;
	}



	public GraphDataBean getSDGraph(ScheduleBean sb) {
	
    GraphDataBean gdb = new GraphDataBean();
		

		gdb.setSdW(sql.selectOne("getSdW", sb));
		gdb.setSdI(sql.selectOne("getSdI", sb));
		gdb.setSdC(sql.selectOne("getSdC", sb));	
		
		  
		return gdb;
		
		
	}



	public GraphDataBean getStepGraph(ScheduleBean sb) {
		
      GraphDataBean gdb = new GraphDataBean();
	
        if(sb.getPscode() ==null) {
        	System.out.println("요긴 step");
        	
        	gdb.setStepW(sql.selectOne("getStepW", sb));
    		gdb.setStepI(sql.selectOne("getStepI", sb));
    		gdb.setStepC(sql.selectOne("getStepC", sb));
    		
    		
        }else {
        	System.out.println("요긴 schedule");
    		gdb.setPscode(sb.getPscode());
    		gdb.setScheW(sql.selectOne("getScheW", sb));
    		gdb.setScheI(sql.selectOne("getScheI",sb));
    		gdb.setScheC(sql.selectOne("getScheC",sb));
        }
			
			
		return gdb;
	}



	public List<ScheduleDetailBean> getWork(ScheduleDetailBean sdb) {
		
		List<ScheduleDetailBean> SDList1;
		SDList1 = sql.selectList("SDList1", sdb);
		return SDList1;
	}





	
	
}



