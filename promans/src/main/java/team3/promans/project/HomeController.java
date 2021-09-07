package team3.promans.project;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Authentication;
import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.AccessHistory;
import team3.promans.beans.CpMemberBean;


@Controller
public class HomeController {
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	Authentication auth;
	
	private ModelAndView mav;
	
	@RequestMapping(value = "/", method = {RequestMethod.GET,RequestMethod.POST})
	public String rootCtl() {
		
		
		return "logInPage";
	}
	
	@PostMapping("accessInfo")
	public ModelAndView logInCtl(@ModelAttribute AccessHistory ah) {
		
		System.out.println("homecontroller!!!!");
		mav = auth.logInCtl(ah);
		return mav;
	}
	
	@GetMapping("test")
	public void test(@ModelAttribute CpMemberBean cm) {
		auth.test(cm);
	}
	
	@GetMapping("SignUp")
	public String test2() {
		return "test";
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
}
