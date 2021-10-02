package team3.promans.beans;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class Notice_CalendarBean {
	private String cpcode;
	private String prcode;
	private String uname;
	private String writer;
	private String title;
	private String contents;
	private String sdate;
	private String ldate;
	private String fcode;
	private MultipartFile file;
	private String filepath;
	private String fname;
	private String locate;
	private String wdcode;
	private String nocode;
	

}
