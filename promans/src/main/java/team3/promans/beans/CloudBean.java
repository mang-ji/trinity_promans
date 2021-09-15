package team3.promans.beans;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CloudBean {
	private String cpcode;
	private String prcode;
	private String pscode;
	private String sccode;
	private String ftitle;
	private String fdate;
	private String fwriter;
	private String fopen;
	private String userid;
	private String fcode;
	private String fname;
	private String filepath;
	private List<MultipartFile> file;
}
