package team3.promans.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;

@Service
public class TeamManagement implements team3.promans.interfaces.TeamManagement{
	
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;


}