function getCpMembers(jsonData){
	let cpMemberList = document.getElementById("cpMemberList");
	
	cpMemberList.innerHTML += "<span class='spans'>사원명</span><span class='phonespan'>휴대전화</span><span class='mailspan'>이메일</span><span class='idspan'>아이디</span>";
	for(i=0; i<jsonData.length;i++){
		cpMemberList.innerHTML += "<div id='box'><input type='checkbox' id=\"userid\" value=\""+jsonData[i].userid+"\" >"+jsonData[i].userid+"</><div id=\"uname\">"+jsonData[i].uname+"</div><div id=\"uphone\">"+jsonData[i].uphone+"</div><div id=\"mail\">"+jsonData[i].mail+ "</div></div>";
	}
}

