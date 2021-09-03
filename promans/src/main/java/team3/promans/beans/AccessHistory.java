package team3.promans.beans;

import lombok.Data;

@Data
public class AccessHistory {
	private String cpcode;
	private String userid;
	private String publicip;
	private String privateip;
	private String method;
	private String acode;
	private String utype;
	
}
