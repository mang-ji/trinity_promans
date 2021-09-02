package team3.promans.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Authentication implements team3.promans.interfaces.Authentication {
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
}
