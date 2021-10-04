function findAddr(){
	new daum.Postcode({
	oncomplete: function(data){
		console.log(data);
		
		var roadAddr = data.roadAddress;
		var jibunAddr = data.jibunAddress;
		
		document.getElementById("member_post").value = data.zonecode;
		if(roadAddr !== ""){
			document.getElementsByName("cplocate")[0].value = roadAddr;
			
		}else if(jibunAddr !== ""){
			document.getElementsByName("member_addr")[0].value = jibunAddr;
		}
		
		
	}
	}).open();
}

function insCompany(){
	let cpname = document.getElementsByName("cpname")[0];
	let ceo = document.getElementsByName("ceo")[0];
	/*let post = document.getElementById("member_post");*/
	let addr = document.getElementsByName("cplocate")[0];
	/*let detail = document.getElementsByName("detail_addr")[0];*/
	let userid = document.getElementsByName("userid")[0];
	let uname = document.getElementsByName("uname")[0];
	let acode = document.getElementsByName("acode")[0];
	let tecode = document.getElementsByName("tecode")[0];
	let wcode = document.getElementsByName("wcode")[0];
	let utype = document.getElementsByName("utype")[0];
	let uphone = document.getElementsByName("uphone")[0];
	let mail = document.getElementsByName("mail")[0];
	
	let f = document.createElement("form");
	f.action = "RegisterCompany";
	f.method = "post";

	f.appendChild(cpname);
	f.appendChild(ceo);
	f.appendChild(addr);
	f.appendChild(userid);
	f.appendChild(acode);
	f.appendChild(tecode);
	f.appendChild(wcode);
	f.appendChild(utype);
	f.appendChild(uphone);
	f.appendChild(mail);
	
	document.body.appendChild(f);
	f.submit();
	}