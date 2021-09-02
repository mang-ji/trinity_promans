package team3.promans.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;

@RestController
@RequestMapping("rest")
public class Restcontroller {
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	
}
