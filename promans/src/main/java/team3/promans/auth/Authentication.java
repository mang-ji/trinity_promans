package team3.promans.auth;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import team3.promans.beans.AccessHistory;
import team3.promans.beans.CpMemberBean;

@Service
public class Authentication implements team3.promans.interfaces.AuthInterface {

	@Autowired
	Encryption enc;

	@Autowired
	ProjectUtils pu;

	@Autowired
	SqlSessionTemplate sql;

	ModelAndView mav;



	public boolean idCheck(AccessHistory ah) {
		return this.convertBoolean(sql.selectOne("idCheck", ah));

	}



	public ModelAndView logInCtl(AccessHistory ah) {
		mav = new ModelAndView();
		
		String encPass = this.getPass(ah);
		
		if(enc.matches(ah.getAcode(),encPass)) {
		 	ah.setCpcode(this.getUserInfo(ah).getCpcode());
			if(this.insAccessHistory(ah)) {
				try {
					pu.setAttribute("userid", this.getUserInfo(ah).getUserid());
					pu.setAttribute("uname", enc.aesDecode(this.getUserInfo(ah).getUname(), ah.getUserid()));
					pu.setAttribute("cpcode", this.getUserInfo(ah).getCpcode());
					pu.setAttribute("uphone", enc.aesDecode(this.getUserInfo(ah).getUphone(), ah.getUserid()));
					pu.setAttribute("tecode", this.getUserInfo(ah).getTecode());
					pu.setAttribute("wcode", this.getUserInfo(ah).getWcode());
					pu.setAttribute("utype", this.getUserInfo(ah).getUtype());
					mav.setViewName("adminProject");

				} catch (Exception e) {e.printStackTrace();}
			}
		}else {
			mav.setViewName("redirect:/");
			mav.addObject("message", "아이디나 비밀번호를 다시 확인해주세요.");
		}

		return mav;
	}


	public void test(CpMemberBean cm) {
		cm.setCpcode("A123456");
		cm.setWcode("1");
		cm.setUtype("A");
		cm.setTecode("I");
		cm.setUphone("01012345678");
		cm.setMail("rltjs@rltjs.com");
		try {
		 	cm.setUphone(enc.aesEncode(cm.getUphone(), cm.getUserid()));
			cm.setMail(enc.aesEncode(cm.getMail(), cm.getUserid()));
			cm.setAcode(enc.encode(cm.getAcode()));
			cm.setUname(enc.aesEncode(cm.getUname(), cm.getUserid()));
			
			this.insCpMember(cm);
			
		} catch (Exception e) {e.printStackTrace();}
	}



	private boolean convertBoolean(int value) {
		return (value>0)?true:false;
	}
	@Override
	public String getPass(AccessHistory ah) {
		return sql.selectOne("getPass", ah);
	}

	@Override
	public CpMemberBean getUserInfo(AccessHistory ah) {
		return sql.selectOne("getUserInfo", ah);
	}

	@Override
	public boolean insAccessHistory(AccessHistory ah) {
		return this.convertBoolean(sql.insert("insAccessHistory", ah));
	}

	@Override
	public int insCpMember(CpMemberBean cm) {
		return sql.insert("insCpMember", cm);
	}
}
