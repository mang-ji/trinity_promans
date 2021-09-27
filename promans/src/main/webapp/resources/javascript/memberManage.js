function getCpMembers(jsonData){
	let cpMemberList = document.getElementById("cpMemberList");
	let list = "";
	list += "<div>"+jsonData[i].userid+"</div>";
	list += "<div>"+jsonData[i].uname+"</div>";
	list += "<div>"+jsonData[i].uphone+"</div>";
	list += "<div>"+jsonData[i].mail+"</div>";
	
	cpMemberList.innerHTML = list;
	
}

