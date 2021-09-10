
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
	let edit = "";
	let selectStep = document.getElementById("selectStep");
	let utype = document.getElementsByName("utype")[0].value;
	let ShceduleEdit = document.getElementById("ShceduleEdit");
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div  onClick = \"getScheDetail(\'"+jsonData[i].sccode+"\',\'"+jsonData[i].pscode+"\')\">"+ jsonData[i].scname + jsonData[i].scstate + "</div></label><br>";	
	}
	edit += "<div onClick = 'editSchedule()'>편집</div><div onClick = 'getSDInfo()' name = 'getSDInfo' style = 'display:none'>완료요청</div><div onClick = 'addScheduleDetail()' name = 'addScheduleDetail' style = 'display:none'>추가</div>"
	
	selectStep.innerHTML = list;
	ShceduleEdit.innerHTML = edit;
	
}

function getScheDetail(sccode1, pscode1){
	
    let f = document.createElement("form");
	let pscode = makeInput("hidden","pscode", pscode1); //파라미터 이름과 새로 선언하는 변수 이름 겹치면 오류가 납니다
	let sccode = makeInput("hidden","sccode", sccode1);
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
		
     	
	  f.appendChild(prcode);
	  f.appendChild(cpcode);
	  f.appendChild(userid);
	  f.appendChild(pscode);
	  f.appendChild(sccode);

	  f.action = "GoAdminScheduleForm";
	  f.method = "POST";
	

	 document.body.appendChild(f);
	
	 f.submit();
	
}

function editSchedule(){ //편집 누르면 완료요청, 업무추가 버튼 나옴
	
	let getSDInfo = document.getElementsByName("getSDInfo")[0];
	let addScheduleDetail = document.getElementsByName("addScheduleDetail")[0];
	
	
	
		getSDInfo.style.display="block";
		addScheduleDetail.style.display="block";
		
		
}

function getSDInfo(){ //완료요청 누르면 실행되는 펑션 , 완료 요청 정보 가져오려면 필요한 데이터 받아오는 펑션

   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
   
  
   let jsonData = [{cpcode:cpcode.value, prcode:prcode.value}];
   let clientData = JSON.stringify(jsonData); 

  postAjax("rest/GetSDInfo" , clientData, "getReqForCompletion", 2);
	
}

function getReqForCompletion(jsonData1){ //완료요청 상태인 업무 디테일 조회하는 곳
	
	  
   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
   let userid = document.getElementsByName("userid")[0];
   let json = [];
 	    for(i=0; i<jsonData1.length; i++){
	
   json.push({cpcode:cpcode.value, prcode:prcode.value, pscode:jsonData1[i].pscode,sccode:jsonData1[i].sccode , sddcode:jsonData1[i].sddcode, userid:userid.value});
    	}	
   let clientData = JSON.stringify(json);
  alert(clientData);

    postAjax("rest/ReqForCompletion", clientData , "reqForCompletion" , 2);
	
	
	
}

function reqForCompletion(jsonData){
	let box = document.getElementsByName("modal")[0];
	
	//box.innerHTML += "<div class='modal' tabindex='-1' role='dialog'>";
	box.innerHTML += "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>";
	box.innerHTML += "<h5 class='modal-title'>야야</h5>";
	box.innerHTML += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
	box.innerHTML += "<span aria-hidden='true'>&times;</span></button></div>";
	box.innerHTML += "<div class='modal-body'><p>Modal body text goes here.</p></div>";
	box.innerHTML += "<div class='modal-footer'>";
	box.innerHTML += "<button type='button' class='btn btn-primary'>Save changes</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
	box.innerHTML += "</div></div></div>";
}

function addScheduleDetail(){ //업무추가 누르면 실행되는 펑션
	
	
}






