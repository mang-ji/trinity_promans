package team3.promans.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SelectInfo implements team3.promans.interfaces.SelectInfo{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
}
