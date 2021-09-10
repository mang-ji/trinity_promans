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
	let utype = document.getElementsByName("utype")[0].value;
	for(i=0; i<jsonData.length; i++){
		
	list += "<div onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\">"+ jsonData[i].psname + jsonData[i].stname + "</div><br>";	
	}
	if(utype == "L" || utype == "A"){
		
		list += "<input type=\"button\" id=\"setBtn\" value=\"편집\" style=\"display:block\"onClick=\"setButton()\"><div id=\"changeBtn\"></div>";
		list += "<input type=\"button\" id=\"setBtn2\" value=\"완료 요청\" style=\"display:none;\" onClick=\"completeRequest(\'"+jsonData[0].pscode+"\')\">";
		list += "<input type=\"button\" id=\"setBtn3\" value=\"추가\" style=\"display:none;\" onClick=\"addJobMember(\'"+jsonData[0].pscode+"\')\">";
		
	}
	
	selectStep.innerHTML = list;

}

function setButton(){
	let setBtn = document.getElementById("setBtn");
	let changeBtn = document.getElementById("changeBtn");
	let setBtn2 = document.getElementById("setBtn2");
	let setBtn3 = document.getElementById("setBtn3");

	setBtn.style.display = "none";
	setBtn2.style.display = "block";
	setBtn3.style.display = "block";
	changeBtn.innerHTML = 
	"<input type=\"button\" name=\"closeButton\" value=\"닫기\" onClick=\"setButton2()\">";
}
function setButton2(){
	let closeButton = document.getElementsByName("closeButton")[0];
	let setBtn = document.getElementById("setBtn");
	let changeBtn = document.getElementById("changeBtn");
	let setBtn2 = document.getElementById("setBtn2");
	let setBtn3 = document.getElementById("setBtn3");
	
	setBtn.style.display = "block";
	closeButton.remove();
	setBtn2.style.display = "none";
	setBtn3.style.display = "none";
	
}


function addJobMember(pscodes){
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	
	let data = [{prcode:prcodes.value,cpcode:cpcodes.value,pscode:pscodes}];
	
	postAjax("rest/addJob",JSON.stringify(data),"afterJobMember",2);
}

function afterJobMember(data){
	let html = "";
	let selectStep = document.getElementById("selectStep");
	let css = "";
	let headCss = document.createElement("style");
	
	for(i=0; i<data.length; i++){
	html +=
	"<div onClick=\"insJobMember(\'"+ data[i].pscode +"\',\'"
	+data[i].userid+"\')\" style=\"border:1px solid #bbbbbb; width:1000px;\"><input type=\"radio\" id=\"radio"+i+"\" name=\"radio\"><label for=\"radio"+i+"\">"
	+ data[i].username +"<div style=\"width:100px; float:left;\">"
	+ data[i].userid +"</label></div></div>";
	
	css += "input[id=\"radio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
	css += "input[id=\"radio"+i+"\"]:checked \+ label{background-color:#bbbbbb}";
	css += "input[id=\"radio"+i+"\"]{display:none}";

	}
	
	headCss.innerHTML = css;
	document.head.append(headCss);
	selectStep.innerHTML = html;
}

function insJobMember(pscodes){
	
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
	let utype = document.getElementsByName("utype")[0].value;
	
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

