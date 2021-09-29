package team3.promans.project;


import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import team3.promans.auth.Authentication;
import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.AccessHistory;
import team3.promans.beans.CloudBean;
import team3.promans.beans.CpMemberBean;
import team3.promans.beans.MailBean;
import team3.promans.beans.Notice_CalendarBean;
import team3.promans.beans.ProjectBean;
import team3.promans.beans.ProjectMemberBean;
import team3.promans.beans.ProjectStepBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.services.FileManagement;
import team3.promans.beans.WorkDiaryBean;
import team3.promans.services.ProjectManagement;
import team3.promans.services.ScheduleManagement;
import team3.promans.services.SelectInfo;
import team3.promans.services.TeamManagement;


@Controller
public class HomeController {

	@Autowired
	Encryption enc;

	@Autowired
	ProjectUtils pu;

	@Autowired
	Authentication auth;

	@Autowired
	ProjectManagement pm;

	@Autowired
	SelectInfo si;
	
	@Autowired
	FileManagement fm;
	
	@Autowired
	ScheduleManagement sm;
	
	@Autowired
	TeamManagement tm;


	private ModelAndView mav;

	@RequestMapping(value = "/", method = {RequestMethod.GET,RequestMethod.POST})
	public ModelAndView rootCtl() {
		mav = auth.rootCtl();

		return mav;
	}

	@PostMapping("accessInfo")
	public ModelAndView logInCtl(@ModelAttribute AccessHistory ah) {
		mav = auth.logInCtl(ah);
		return mav;
	}
	
	@PostMapping("logOut")
	public ModelAndView logOut(@ModelAttribute AccessHistory ah) {
		mav = auth.logOutCtl(ah);
		return mav;
	}

	@PostMapping("SignUp")
	public String SignUp(@ModelAttribute CpMemberBean cm) {
		return auth.SignUp(cm);
	}
	@GetMapping("InsCompany")
	public String insCompany() {
		return "insCompany";
	}
	@GetMapping("noticeForm")
	public String noticeForm() {
		return "noticePage";
	}
	@GetMapping("projectForm")
	public String projectForm() {
		return "adminProject";
	}
	@GetMapping("calendarForm")
	public String calendarForm() {
		return "calendar";
	}
	@GetMapping("mailForm")
	public String mailForm() {
		return "sendMailPage";
	}
	@GetMapping("cloudForm")
	public String cloudForm() {
		return "cloudPage";
	}
	@GetMapping("memberForm")
	public String memberForm() {
		return "memberManage";
	}
	@GetMapping("myPageForm")
	public String myPageForm() {
		return "myPage";
	}
	@GetMapping("mainPageForm")
	public String mainPageForm() {
		return "mainPage";
	}
	@GetMapping("scheduleForm")
	public String scheduleForm() {
		return "adminSchedule";
	}
	
	@GetMapping("findPassForm")
	public String findPassForm() {
		return "findPass";
	}
	
	@GetMapping("myScheduleForm")
	public String myScheduleForm(ScheduleDetailBean sdb) {

		return "mySchedule";
	}
	
	@GetMapping("/resetForm")
	public String resetForm(@RequestParam("userid") String userid) {
		
		try {
			pu.setAttribute("userid", userid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "resetPass";
	}
	
	
	@PostMapping("writeSchedule")
	public String writeSchedule(ScheduleDetailBean sdb) {
		return sm.writeSchedule(sdb);
	}

	@GetMapping("myDiaryForm")
	public String myDiaryForm(WorkDiaryBean wdb) {

		return "myDiary";
	}
	
	@GetMapping("allAdminManage")
	public String allAdminManage() {
		return "allAdminManage";
	}
	
	@PostMapping("writeDiary")
	public ModelAndView writeDiary(WorkDiaryBean wdb) {
		mav = sm.writeDiary(wdb);
		return mav;
	}

	@PostMapping("goAdminProjectForm")
	public ModelAndView goAdminProjectForm(@RequestParam("prcode") String prcode ) {
		ProjectMemberBean pmb = new ProjectMemberBean();
		try {
			pu.setAttribute("prcode", prcode);
		} catch (Exception e) {e.printStackTrace();}
		
		return si.goAdminProject(pmb);
	}


	/* 공지사항 추가*/
	@PostMapping("insNotice")
	public ModelAndView insNotice(@ModelAttribute Notice_CalendarBean nc) {
		mav = si.insNotice(nc);
		return mav;
	}

	@PostMapping("GoAdminScheduleForm")
	public String goAdminScheduleForm(@ModelAttribute ScheduleDetailBean sdb) {
		try {
			pu.setAttribute("sccode", sdb.getSccode());
		} catch (Exception e) {e.printStackTrace();}

		return "adminSchedule";
	}
	
	/* 공지사항 삭제 */
	@PostMapping("noticeDelete")
	public ModelAndView noticeDelete(@ModelAttribute Notice_CalendarBean list) {
		return si.noticeDelete(list);
	}


	@PostMapping("reqComplete")
	public ModelAndView reqComplete(@ModelAttribute ScheduleDetailBean sdb) {
		mav = pm.reqComplete(sdb);
		return mav;
	}
	
	@PostMapping("insFile")
	public ModelAndView insFile(@ModelAttribute CloudBean cb) {
		mav =  fm.insFile(cb);
		return mav;
	}
	
	@PostMapping("RegisterCompany")
	public ModelAndView registerCompany(@ModelAttribute CpMemberBean cmb) {
		mav = auth.registerCompany(cmb);
		return mav;
	}
	
	@PostMapping("CreateProject")
	public ModelAndView createProject(@ModelAttribute ProjectBean pb) {
		return pm.createProject(pb);
	}
	
	@PostMapping("/submitMail")
	public ModelAndView submitMail(@ModelAttribute MailBean mb) {
		mav = fm.submitMail(mb);
		return mav;
	}
	
	@PostMapping("downLoadFile")
	public void downLoadFile(@ModelAttribute CloudBean cb, HttpServletResponse res,HttpServletRequest req) {
		String saveDir = 
				//req.getSession().getServletContext().getRealPath("C:/Users/back/Desktop/Repo/trinity_promans/promans/src/main/webapp/resources/images");
				"C:/Users/back/Desktop/Repo/trinity_promans/promans/src/main/webapp/resources/images";
		String fileName = cb.getFname();
		
		File file = new File(saveDir+"/"+fileName);
		
		FileInputStream fis = null;
		BufferedInputStream bis = null;
		ServletOutputStream sos = null;
		try {
			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			sos = res.getOutputStream();

			String reFileName = "";
			System.out.println(fileName);
			System.out.println(saveDir+"/"+fileName);
			/*
			reFileName = URLEncoder.encode(fileName,"UTF-8");
			reFileName = reFileName.replaceAll("\\+", "%20");*/
			
			reFileName = new String(fileName.getBytes("utf-8"), "ISO-8859-1");

			res.setContentType("application/octet-stream;charset=utf-8");
			res.addHeader("Content-Disposition", "attachment;filename=\""+reFileName+"\"");
			res.setContentLength((int) file.length());

			int read = 0;
			while((read=bis.read()) != -1) {
				sos.write(read);
			}
			

		} catch (Exception e) {e.printStackTrace();
		}finally {
			try {
				sos.close();
				bis.close();

			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	
	@PostMapping("/findPass")
	public ModelAndView findPass(@ModelAttribute CpMemberBean cmb) {
		mav = tm.findPass(cmb);
		return mav;  
}
	

	@PostMapping("/resetPass")
	public ModelAndView resetPass(@ModelAttribute CpMemberBean cmb) {
		mav = tm.resetPass(cmb);
		return mav;  
	}
	
	@PostMapping("/MakeStep")
	public ModelAndView makeStep(@ModelAttribute ProjectStepBean psb) {
		return pm.makeStep(psb);
	}
}

