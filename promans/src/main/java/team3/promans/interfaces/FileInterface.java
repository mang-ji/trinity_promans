package team3.promans.interfaces;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.CloudBean;

@Component
public interface FileInterface {
	public ModelAndView insFile(CloudBean cb);
	public int getMaxFcode(CloudBean cb);
	public List<CloudBean> getFileList(CloudBean cb);
	public boolean insBookMark(CloudBean cb);
	public List<CloudBean> noneMarkList(CloudBean cb);
	public boolean deleteMark(CloudBean cb);
	public boolean deleteFiles(List<CloudBean> cb);
}
