function resetPass(){
	let acode = document.getElementsByName("acode")[0];
	let userid = document.getElementsByName("userid")[0];
	let pw = document.getElementsByName("pw")[0];
	
	
	if(acode.value != pw.value){
		alert("비밀번호가 맞지 않습니다.");
		acode.value = "";
		pw.value = "";
		return;
	}
	
	let f = document.createElement("form");
	
	f.action = "resetPass";
	f.method = "post";
	
	f.appendChild(acode);
	f.appendChild(userid);
	
	document.body.appendChild(f);
	
	f.submit();
	
}
