package team3.promans.beans;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MailBean {
	private String to;
	private String from;
	private String contents;
	private String filepath;
	private MultipartFile file;
	private String fname;
}
