package team3.promans.project;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;


@Controller
public class HomeController {
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	private ModelAndView mav;
	
	@RequestMapping(value = "/", method = {RequestMethod.GET,RequestMethod.POST})
	public ModelAndView rootCtl() {
		mav = new ModelAndView();
		
		return mav;
	}
	
}
