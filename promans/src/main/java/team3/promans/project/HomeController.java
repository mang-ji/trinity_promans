package team3.promans.project;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
import team3.promans.beans.Notice_CalendarBean;
import team3.promans.beans.ProjectMemberBean;
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
	
	@GetMapping("myScheduleForm")
	public String myScheduleForm(ScheduleDetailBean sdb) {

		return "mySchedule";
	}
	@PostMapping("writeSchedule")
	public String writeSchedule(ScheduleDetailBean sdb) {
		return sm.writeSchedule(sdb);
	}

	@GetMapping("myDiaryForm")
	public String myDiaryForm(WorkDiaryBean wdb) {

		return "myDiary";
	}
	@PostMapping("writeDiary")
	public ModelAndView writeDiary(WorkDiaryBean wdb) {
		System.out.println("일지좀써라");
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
			System.out.println(sdb.getSccode() + " : " + pu.getAttribute("sccode"));
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
	
	@GetMapping("TestYuna")
	public String testYuna() {
		return "testyuna";
	}
}

