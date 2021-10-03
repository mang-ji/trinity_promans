package team3.promans.services;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.Multipart;

import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.CloudBean;
import team3.promans.beans.MailBean;


@Service
public class FileManagement implements team3.promans.interfaces.FileInterface{
	@Autowired
	Encryption enc;

	@Autowired
	ProjectUtils pu;

	@Autowired
	SqlSessionTemplate sql;

	@Autowired
	JavaMailSenderImpl javaMail;

	ModelAndView mav;

	public ModelAndView insFile(CloudBean cb) {
		mav = new ModelAndView();
		int maxFcode;

		for(int i=0; i<cb.getFile().size(); i++) {

			maxFcode = this.getMaxFcode(cb);

			cb.setFname(pu.savingFile(cb.getFile().get(i)));
			cb.setFilepath("resources/images/"+cb.getFname());
			cb.setFcode("FC"+ (maxFcode+1));

			if(this.convert(sql.insert("insFile", cb))) {
				mav.setViewName("redirect:/cloudForm");
				mav.addObject("message", "업로드를 완료하였습니다.");

			}else {
				mav.setViewName("redirect:/projectForm");
				mav.addObject("message", "업로드를 실패했습니다.다시 시도해주세요.");
			}
		}


		return mav;
	}

	private boolean convert(int v) {
		return (v>0)?true:false;
	}


	public int getMaxFcode(CloudBean cb) {
		return sql.selectOne("getMaxFcode", cb);
	}

	public List<CloudBean> getFileList(CloudBean cb) {
		List<CloudBean> list = sql.selectList("getFileList", cb);
		System.out.println(list);
		return list;
	}

	public List<CloudBean> getMarkList(CloudBean cb) {
		List<CloudBean> list = sql.selectList("getMarkList", cb);
		return list;
	}

	public boolean insBookMark(CloudBean cb) {
		return this.convert(sql.insert("insBookMark", cb));
	}

	public List<CloudBean> noneMarkList(CloudBean cb) {
		List<CloudBean> list = sql.selectList("noneMarkList", cb);
		return list;
	}

	public boolean deleteMark(CloudBean cb) {	
		return this.convert(sql.delete("deleteMark", cb));
	}

	public boolean deleteFiles(List<CloudBean> cb) {
		boolean result = false;

		for(int i=0; i<cb.size(); i++) {
			if(this.deleteMark(cb.get(i))) {
				sql.delete("deleteFiles", cb.get(i));
				result=true;
			}else {
				sql.delete("deleteFiles", cb.get(i));
				result=true;
			}
		}
		return result;
	}
	public ModelAndView submitMail(MailBean mb) {
		mav = new ModelAndView();
		MimeMessage mail = javaMail.createMimeMessage();
		MimeMessageHelper helper = null;
		try {
			helper = new MimeMessageHelper(mail,true,"UTF-8");
		} catch (MessagingException e1) {
			e1.printStackTrace();
		}
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("----------------------------------------------<br>");
			sb.append("보내는 사람 : " + (String) pu.getAttribute("mail"));
			sb.append("<br>----------------------------------------------<br>");
			sb.append(mb.getMcontents());
			String contents = sb.toString();
			
			if(!mb.getFile().isEmpty()) {
				String filename = "C:/repo/trinity_promans/promans/src/main/webapp/resources/images/"+pu.savingFile(mb.getFile());
				helper.setFrom("siriwitcher@naver.com");
				helper.setTo(mb.getTo());
				helper.setSubject(mb.getTitle());
				helper.setText(contents,true);
				FileSystemResource fsr = new FileSystemResource(filename);
				helper.addAttachment(mb.getFile().getOriginalFilename(), fsr);

				javaMail.send(mail);
				mav.setViewName("sendMailPage");
				
				return mav;
			}
			
		helper.setFrom("siriwitcher@naver.com");
		helper.setTo(mb.getTo());
		helper.setSubject(mb.getTitle());
		helper.setText(contents,true);
		javaMail.send(mail);
		mav.setViewName("sendMailPage");
		
		} catch (Exception e) {
			e.printStackTrace();
		}					

		return mav;
	}

}
