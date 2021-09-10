function getProject1 (jsonData){
	
	let list = "";
	let getProject = document.getElementById("getProject");
	list += "<div> 프로젝트명    생성날짜   공개여부</div><br>";
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\">"+ jsonData[i].prname +"   "+ jsonData[i].prdate +"   "+ jsonData[i].propen + "</div>";	
	list += "<input type='button' value='편집' onClick=\"sendProjectInfo(\'"+ jsonData[i].prcode +"\')\"/>";
	}
	list += "<div id='createBtn'></div>";
	
	getProject.innerHTML = list;

}


function sendProjectInfo(prcode){
	let createBtn = document.getElementById("createBtn");
	let data = "";
	data += "<input type='button' value='완료 승인' onClick=\"acceptComplete(\'"+prcode+"\')\"><br>";
	data += "<input type='button' value='스텝 생성' onClick=\"makeProjectStep(\'"+prcode+"\')\"><br>";
	
	createBtn.innerHTML = data;
}

function acceptComplete(prcode1){
	let cpcode1 = document.getElementsByName("cpcode")[0];
	let clientData = [{cpcode:cpcode1.value, prcode:prcode1}];
	let modalBox = document.getElementById("modal_box");
	
	
	postAjax("rest/SelectWaitingStep", JSON.stringify(clientData),"getWaitingProStep",2);
}

function getWaitingProStep(jsonData){
	
	let myplace = document.getElementsByClassName("modal_box")[0];
	/* 팝업창 띄우기 */
	let list = "";
		list += "<div> "+ jsonData[0].psname +" "+jsonData[0].username+"  "+jsonData[0].stname +"</div>";
	
		myplace.innerHTML = list;
	
}

function makeProjectStep(prcode){
	
}