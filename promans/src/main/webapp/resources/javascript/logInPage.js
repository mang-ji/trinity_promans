	let publicIP;

function sendUserId(){
	let uCode = document.getElementsByName("userid")[0];
	let next = document.getElementsByName("next")[0];
	
	if(uCode.value == ""){
		uCode.classList.toggle("wrongBox");
		alert("아이디를 입력해주세요!");
		uCode.value = "";
		uCode.focus();
		return;
	}
	getAjax("rest/idCheck","userid="+uCode.value,"idCheck");
	
}

function idCheck(data){

	let uCode = document.getElementsByName("userid")[0];
	let aCode = document.getElementsByName("acode")[0];
	let id= document.getElementById("id");
	
	let next = document.getElementsByName("next")[0];
	let button2 = document.getElementById("button2");
	let pass = document.getElementById("pass");
	
	let text = document.getElementById("text");
	let nonId = document.getElementById("nonId");
	
	if(data == true){
	uCode.style.display = "none";
	aCode.style.display = "block";
	next.style.display = "none";
	button2.style.display = "block";
	text.style.display = "none";
	id.style.display = "none";
	pass.style.display = "block";
	nonId.innerText="";
	uCode.style.border = "1px solid #51FFA6";
	
	aCode.focus();
		
	}else if(data == false){
		uCode.style.border = "1px solid #FF4646";
		nonId.innerText = "아이디가 없거나, 탈퇴한 회원입니다.";
	}
	
}

function EntersendUserId(){
	let uCode = document.getElementsByName("userid")[0];

	if(uCode.value == ""){
		uCode.classList.toggle("wrongBox");
		alert("아이디를 입력해주세요!");
		uCode.value = "";
		uCode.focus();
		return;
	}
	
	if(window.event.keyCode == 13){
	getAjax("rest/idCheck","userid="+uCode.value,"idCheck");
	
	}
	
}
	
	function sendUserInfo(){
	
	const uCode = document.getElementsByName("userid")[0];
	const aCode = document.getElementsByName("acode")[0];
	const method = makeInput("hidden", "method", 1);
	const pubIp = makeInput("hidden", "publicip", publicIP);
	const priIp = makeInput("hidden", "privateip", location.host);
	let button2 = document.getElementById("button2");
	
	
	let form = makeForm("accessInfo","post");
	
	form.appendChild(uCode);
	form.appendChild(aCode);
	form.appendChild(method);
	form.appendChild(pubIp);
	form.appendChild(priIp);
	
	document.body.appendChild(form);
	
	form.submit();
	
}

function EntersendUserInfo(){
	
	const uCode = document.getElementsByName("userid")[0];
	const aCode = document.getElementsByName("acode")[0];
	const method = makeInput("hidden", "method", 1);
	const pubIp = makeInput("hidden", "publicip", publicIP);
	const priIp = makeInput("hidden", "privateip", location.host);
	
	if(window.event.keyCode == 13){
	
	let form = makeForm("accessInfo","post");
	
	form.appendChild(uCode);
	form.appendChild(aCode);
	form.appendChild(method);
	form.appendChild(pubIp);
	form.appendChild(priIp);

	
	document.body.appendChild(form);
	
	form.submit();
	}
}

function makeForm(action,method,name=null){
	let form = document.createElement("form");
	
	if(name!=null){form.setAttribute("name",name);}
	form.setAttribute("action",action);
	form.setAttribute("method",method);
	
	
	return form;
}


function makeInput(type,name,value){
	let input = document.createElement("input");
	
	input.setAttribute("type",type);
	input.setAttribute("name",name);
	input.setAttribute("value",value);

	return input;
}

function getAjax(jobCode,clientData,fn){
	
	let ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function(){
	if(ajax.readyState==4 && ajax.status==200){
		
		window[fn](JSON.parse(ajax.responseText));
		
	}
}
	if(clientData != ""){
		jobCode += "?" + clientData;
	}
	
	ajax.open("GET", jobCode);
	ajax.send();
}


function postAjax(jobCode,clientData,fn){
	let ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function(){
		
		if(ajax.readyState==4 && ajax.status==200){
			let jsonData = ajax.responseText;
			
			window[fn](JSON.parse(jsonData));
		}
	}
	
	ajax.open("POST",jobCode);
	ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
	ajax.send(clientData);
	
}



function setPublicIP(data){
	publicIP = data.ip;
	
}