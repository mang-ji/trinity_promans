function getProject1 (jsonData){
	let list = "";
	let getProject = document.getElementById("getProject");
	for(i=0; i<jsonData.length; i++){
		
	list += "<div onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\">"+ jsonData[i].prname + jsonData[i].prdate + jsonData[i].propen + "</div><br>";	

	}
	
	getProject.innerHTML = list;

}

function goAdminProject(prcode){
     let f = document.createElement("form");
     let input = document.createElement("input");

          input.type = "hidden";
          input.value = prcode;
          input.name = "prcode";

       alert(input.value);

     f.appendChild(input);

     document.body.appendChild(f);

     f.action= "goAdminProjectForm";
     f.method= "POST";
	
	f.submit();
	
}

/*function getProjectStep(cpcode, prcode){
	
	
	let userid1 = document.getElementsByName("userid")[0];
	let jsonData = [{cpcode:cpcode, prcode:prcode, userid:userid1.value}];
	
	let clientData = JSON.stringify(jsonData);
	
	postAjax("rest/GetProjectStep", clientData, "selectProject", 2);
	
}*/

function selectProject(jsonData){
	let list = "";
	let selectStep = document.getElementById("selectStep");
	alert(jsonData);
	for(i=0; i<jsonData.length; i++){
		
	list += "<div onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\">"+ jsonData[i].psname + jsonData[i].stname + "</div><br>";	
	}
	
	selectStep.innerHTML = list;

}

function getSchedule(pscode){
	
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode, userid:userid.value}];
	let clientData = JSON.stringify(jsonData);
	
	postAjax("rest/GetSchedule", clientData, "selectSchedule",2);
	
}

function selectSchedule(jsonData){
	let list = "";
	let selectStep = document.getElementById("selectStep");
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div  onClick = \"getScheDetail(\'"+jsonData[i].sccode+"\',\'"+jsonData[i].pscode+"\')\">"+ jsonData[i].scname + jsonData[i].scstate + "</div><br>";	
	}
	
	selectStep.innerHTML = list;
	
}

function getScheDetail(sccode, pscode){
	
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode, sccode:sccode, userid:userid.value}];
	
	let clientData =JSON.stringify(jsonData);
	
	postAjax("rest/GetScheDetail", clientData, "selectScheDetail", 2); 
	
	
}

function selectScheDetail(jsonData){
	
	let list = "";
	let selectStep = document.getElementById("selectStep");
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div>"+ jsonData[i].sdname + jsonData[i].sdcontent + jsonData[i].sddstate + jsonData[i].sddate + jsonData[i].username+"</div><br>";	
	}
	
	selectStep.innerHTML = list;
	
}

