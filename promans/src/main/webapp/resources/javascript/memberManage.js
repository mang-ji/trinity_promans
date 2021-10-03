function getCpMembers(jsonData){
	let cpMemberList = document.getElementById("cpMemberList");
	
	cpMemberList.innerHTML += "<div id='title'><span class='spans'>사원명</span><span class='phonespan'>휴대전화</span><span class='mailspan'>이메일</span><span class='idspan'>아이디</span></div>";
	for(i=0; i<jsonData.length;i++){
		cpMemberList.innerHTML += "<div id='box'><input type='checkbox' name=\"userid\" id=\"userid\" value=\""+jsonData[i].userid+"\" >"+jsonData[i].userid+"</><div id=\"uname\">"+jsonData[i].uname+"</div><div id=\"uphone\">"+jsonData[i].uphone+"</div><div id=\"mail\">"+jsonData[i].mail+ "</div></div>";
	}
}

function deleteCpMember(){
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid");
	let jsonData =[];
	
	
	for(i=0; i<userid.length;i++){
		if(userid[i].checked){
			jsonData.push({cpcode:cpcode.value, userid:userid[i].value});
		}
	}
	
	postAjax("rest/DeleteCpMember",JSON.stringify(jsonData),"successDeleteCpMem",2);
	
}

function successDeleteCpMem(jsonData){
	location.href = "memberForm"; // 리다이렉트 할 폼을 써준다! 
	alert(jsonData.message);
}




