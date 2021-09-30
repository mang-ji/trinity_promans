package team3.promans.services;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.CpMemberBean;
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

	@Autowired
	JavaMailSenderImpl javaMail;
	
	ModelAndView mav;

	public void addTeamMember(List<ProjectMemberBean> pm) {


	}

	public List<ScheduleDetailBean> addJob(ProjectStepBean pmb) {
		List<ScheduleDetailBean> list = sql.selectList("addJob", pmb);

		for(int i=0; i<list.size(); i++) {
			try {
				list.get(i).setUsername(enc.aesDecode(list.get(i).getUsername(), list.get(i).getUserid()));
			} catch (Exception e) {e.printStackTrace();}
		}

		list.get(0).setPscode(pmb.getPscode());
		return list;
	}

	public List<ScheduleDetailBean> firstInsSchedule(ProjectStepBean pmb) {

		boolean result = this.getPsUtype(pmb);
		System.out.println(pmb);
		System.out.println(result);
		List<ScheduleDetailBean> list = new ArrayList<ScheduleDetailBean>(); 
		if(result == true) {
			list = sql.selectList("addJob", pmb);
			for(int i=0; i<list.size(); i++) {
				try {
					list.get(i).setUsername(enc.aesDecode(list.get(i).getUsername(), list.get(i).getUserid()));
				} catch (Exception e) {e.printStackTrace();}
			}
			list.get(0).setPscode(pmb.getPscode());
		}
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
	@Override
	public boolean getPsUtype(ProjectStepBean psb) {
		String result = sql.selectOne("getPsUtype", psb);
		return (result!=null)?true:false;
	}

	public Map<String, String> deleteCpMember(List<CpMemberBean> cmb) {
		Map<String,String> map = new HashMap<String,String>();

		for(int i=0;i<cmb.size();i++) {
			/* 회사 멤버테이블에서 비사원 업데이트 */
			if(this.convertBoolean(sql.update("deleteCpMember",cmb.get(i)))){
				/*  프로젝트 멤버에 포함 되어 있는지 확인하고 */
				if(this.convertBoolean(sql.selectOne("selecttProjectMember", cmb.get(i)))) {
					/* 프로젝트멤버 테이블에서 삭제 ! */
					if(this.convertBoolean(sql.update("deleteProjectMember",cmb.get(i)))) {
						map.put("message",  cmb.get(i).getUserid()+ "님 비사원처리가 완료되었습니다.");
					}
				}else {map.put("message",  cmb.get(i).getUserid()+ "님 비사원처리가 완료되었습니다."); }
			}
		}
		return map;
	}


	public ModelAndView findPass(CpMemberBean cmb) {
		ModelAndView mav = new ModelAndView();

		String encmail = "";
		try {
			String originMail = sql.selectOne("getmail",cmb);
			encmail = enc.aesDecode(originMail, cmb.getUserid());

		} catch (Exception e1) {
			mav.setViewName("redirect:/findPass");
			mav.addObject("message", "아이디 혹은 이메일을 확인해주세요."); 
			return mav;
		}

		if(!encmail.equals(cmb.getMail())) {
			mav.setViewName("findPass");
			mav.addObject("message", "아이디 혹은 이메일을 확인해주세요.");
			return mav;

		}else {
			String subject = "비밀번호 재설정 인증 이메일 입니다.";
			String contents = "<a href=\"http://192.168.1.138/resetForm?userid="+cmb.getUserid()+"\">"+"비밀번호를 재설정 해주세요."+"</a>";
			String from = "siriwitcher@naver.com";
			String to = cmb.getMail();

			MimeMessage mail = javaMail.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mail,"UTF-8");

			try {
				helper.setFrom(from);
				helper.setTo(to);
				helper.setSubject(subject);
				helper.setText(contents,true);
				javaMail.send(mail);
			} catch (MessagingException e) {
				mav.addObject("message", "메일을 보내지 못했습니다.");
				return mav;
			}
		}
		mav.addObject("message", cmb.getMail() + "메일을 보냈습니다.");
		mav.setViewName("logInPage");
		return mav;
	}

	public ModelAndView resetPass(CpMemberBean cmb) {
		mav = new ModelAndView();
		
		try {
			cmb.setAcode(enc.encode(cmb.getAcode()));
			sql.update("findPass", cmb);
		} catch (Exception e) {
			e.printStackTrace();
		}
		mav.setViewName("logInPage");
		
		return mav;
	}
}
