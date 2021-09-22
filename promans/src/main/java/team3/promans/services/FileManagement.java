package team3.promans.services;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.auth.Encryption;
import team3.promans.auth.ProjectUtils;
import team3.promans.beans.CloudBean;

@Service
public class FileManagement implements team3.promans.interfaces.FileInterface{
	@Autowired
	Encryption enc;
	
	@Autowired
	ProjectUtils pu;
	
	@Autowired
	SqlSessionTemplate sql;
	
	ModelAndView mav;

	public ModelAndView insFile(CloudBean cb) {
		mav = new ModelAndView();
		int maxFcode;
		
		for(int i=0; i<cb.getFile().size(); i++) {
			
			maxFcode = this.getMaxFcode(cb);
			
			cb.setFname(cb.getFile().get(i).getOriginalFilename());
			cb.setFilepath("resouces/images/"+cb.getFname());
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
	
}
