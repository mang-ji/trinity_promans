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
import team3.promans.interfaces.AuthInterface;

@Service
public class Authentication implements AuthInterface {

	@Autowired
	Encryption enc;

	@Autowired
	ProjectUtils pu;

	@Autowired
	SqlSessionTemplate sql;

	ModelAndView mav;



	public ModelAndView rootCtl() {
		mav = new ModelAndView();
		try {
			String session = (String)pu.getAttribute("userid");

			if(session != null) {
				mav.setViewName("mainPage");
			}else {
				mav.setViewName("logInPage");
			}

		} catch (Exception e) {e.printStackTrace();}

		return mav;

	}


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
					pu.setAttribute("mail", enc.aesDecode(this.getUserInfo(ah).getMail(), ah.getUserid()));

					mav.setViewName("mainPage");

				} catch (Exception e) {e.printStackTrace();}
			}
		}else {

			mav.setViewName("redirect:/");
			mav.addObject("message", "아이디와 비밀번호를 다시 확인해주세요.");
		}

		return mav;

	}

	public ModelAndView logOutCtl(AccessHistory ah) {
		mav = new ModelAndView();
		String session = "";
		int method = this.getMethod(ah);
		try {
			session = (String)pu.getAttribute("userid");
		} catch (Exception e1) {e1.printStackTrace();}

		try {
			if(session != null) {
				if(method>0) {
					ah.setMethod("-" + method);
					if(this.convertBoolean(this.logOutAh(ah))) {
						pu.removeAttribute("userid");
						pu.removeAttribute("uname");
						pu.removeAttribute("cpcode");
						pu.removeAttribute("prcode");
						pu.removeAttribute("pscode");
						pu.removeAttribute("uphone");
						pu.removeAttribute("tecode");
						pu.removeAttribute("wcode");
						pu.removeAttribute("utype");
						mav.setViewName("redirect:/");
						mav.addObject("message", "로그아웃에 성공하셨습니다!");

					}else {
						pu.removeAttribute("userid");
						pu.removeAttribute("uname");
						pu.removeAttribute("cpcode");
						pu.removeAttribute("prcode");
						pu.removeAttribute("pscode");
						pu.removeAttribute("uphone");
						pu.removeAttribute("tecode");
						pu.removeAttribute("wcode");
						pu.removeAttribute("utype");
						mav.setViewName("redirect:/");
						mav.addObject("message", "다시 시도해주세요.");				

					}
				}
			}else {
				mav.setViewName("redirect:/");
				mav.addObject("message", "이미 로그아웃 되어있습니다.");	
			}
		} catch (Exception e) {e.printStackTrace();}

		return mav;
	}


	public String SignUp(CpMemberBean cm) {
		
		try {
			cm.setUphone(enc.aesEncode(cm.getUphone(), cm.getUserid()));
			cm.setMail(enc.aesEncode(cm.getMail(), cm.getUserid()));
			cm.setAcode(enc.encode(cm.getAcode()));
			cm.setUname(enc.aesEncode(cm.getUname(), cm.getUserid()));

			this.insCpMember(cm);

		} catch (Exception e) {e.printStackTrace();}
		
		if(cm.getSeperate() != null) {
			return "mainPage";
		}
		
		return "memberManage";
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



	public int getMethod(AccessHistory ah) {
		return sql.selectOne("getMethod", ah);
	}



	@Override
	public int logOutAh(AccessHistory ah) {
		return sql.insert("logOutAh", ah);
	}
	
	public ModelAndView registerCompany(CpMemberBean cmb) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("insCompany");
		/* cpcode 생성 & 총관리자 정보 암호화 */
		try {
			cmb.setCpcode(this.getCpMax(cmb));
			cmb.setAcode(enc.encode(cmb.getAcode()));
			cmb.setUname(enc.aesEncode(cmb.getUname(), cmb.getUserid()));
			cmb.setUphone(enc.aesEncode(cmb.getUphone(), cmb.getUserid()));
			cmb.setMail(enc.aesEncode(cmb.getMail(), cmb.getUserid()));
		} catch (Exception e) {e.printStackTrace();}

		if(this.convertBoolean(sql.insert("registerCompany",cmb))) {
			if(this.convertBoolean(sql.insert("insertCpMember",cmb))) {
				mav.addObject("msg","회사 등록이 완료되었습니다.");
				mav.setViewName("logInPage");
			}
		}
		return mav;
	}
	
	public String getCpMax(CpMemberBean cmb) {
		int max = sql.selectOne("getCpMax", cmb);
		String cpMax="";
			if(max<10) {
				cpMax = "CP0" + (max+1); 
			}else {
				cpMax = "CP" + (max+1);
			}
		return cpMax;
	}



}
