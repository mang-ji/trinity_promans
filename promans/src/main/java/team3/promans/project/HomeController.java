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
import team3.promans.beans.CpMemberBean;
import team3.promans.beans.Notice_CalendarBean;
import team3.promans.beans.ScheduleDetailBean;
import team3.promans.services.ProjectManagement;
import team3.promans.services.ScheduleManagement;
import team3.promans.services.SelectInfo;


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
	ScheduleManagement sm;


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
		System.out.println(cm);
		return auth.SignUp(cm);
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
	
	@GetMapping("myScheduleForm")
	public String myScheduleForm(ScheduleDetailBean sdb) {
		return "mySchedule";
	}

	@GetMapping("myDiaryForm")
	public String myDiaryForm() {
		return "myDiary";
	}

	@PostMapping("goAdminProjectForm")
	public String goAdminProjectForm(@RequestParam("prcode") String prcode ) {

		try {
			pu.setAttribute("prcode", prcode);

		} catch (Exception e) {e.printStackTrace();}

		return "adminProject";
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
			pu.setAttribute("pscode", sdb.getPscode());
			pu.setAttribute("sccode", sdb.getSccode());

		} catch (Exception e) {e.printStackTrace();}

		return "adminSchedule";


	}
	
	/* 공지사항 삭제 */
	@GetMapping("noticeDelete")
	public boolean noticeDelete(@ModelAttribute Notice_CalendarBean list) {
		String[] list2 = list.getNocode().split(",");
		List<Notice_CalendarBean> nc = new ArrayList<Notice_CalendarBean>();
		List<String> list3 = new ArrayList<String>();

		for(int i=0; i<list2.length; i++) {
			list3.add(list2[i]);
			nc.add(list);
			nc.get(i).setNocode(list3.get(i));
		}
		return si.noticeDelete(list);
	}


	@PostMapping("reqComplete")
	public ModelAndView reqComplete(@ModelAttribute ScheduleDetailBean sdb) {
		mav = pm.reqComplete(sdb);
		return mav;
	}
}

