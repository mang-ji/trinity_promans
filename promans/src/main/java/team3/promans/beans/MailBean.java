package team3.promans.beans;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MailBean {
	private String title;
	private String to;
	private String from;
	private String mcontents;
	private String filepath;
	private MultipartFile file;
	private String fname;
}
