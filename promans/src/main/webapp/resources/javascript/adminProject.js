
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
	let list2 = "";
	let addList = "";
	let addListCss = "";
	let get = "";
	let css = "";
	let getCss = "";
	let headCss = document.createElement("style");
	let selectStep = document.getElementById("selectStep");
	let utype = document.getElementsByName("utype")[0].value;
	
	
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\">"
	+ jsonData[i].psname + jsonData[i].stname + "</div><br>";	
	
	}
		list += "<input type=\"button\" onClick=\"getCom()\" value=\"완료 리스트\">";
	
	
	if(utype == "L" || utype == "A"){
		list += "<input type=\"button\" id=\"setBtn\" value=\"편집\" style=\"display:block\"onClick=\"setButton()\"><div id=\"changeBtn\"></div>";
		list += "<input type=\"button\" id=\"setBtn2\" value=\"완료 요청\" style=\"display:none;\" onClick=\"getRequestList()\"\"><div id=\"changeBtn2\"></div>";
		list += "<input type=\"button\" id=\"setBtn3\" value=\"추가\" style=\"display:none;\" name=\"clickAdd\">";
		
	}
	selectStep.innerHTML = list;
	let clickAdd = document.getElementsByName("clickAdd")[0];
	clickAdd.addEventListener('click',function(){
		for(i=0; i<jsonData.length; i++){
			addList += "<input type=\"radio\" name=\"clickAddJobMember\" id=\"addRadio"+i+"\" onClick=\"addJobMember(\'"+jsonData[i].pscode+"\')\"><label for=\"addRadio"+i+"\">"
			+ jsonData[i].psname + jsonData[i].stname + "</label><br>";
			
			addListCss += "input[id=\"addRadio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
			addListCss += "input[id=\"addRadio"+i+"\"]:hover \+ label{background-color:#bbbbbb;color:#ffffff;}";
			addListCss += "input[id=\"addRadio"+i+"\"]{display:none;}";
			
		}
		
		headCss.innerHTML = addListCss;
		document.head.append(headCss);
		selectStep.innerHTML = addList;
		
	});
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	

	
	let btn = document.getElementById("setBtn2");
	btn.addEventListener('click',function(){
		btn.style.display="none";
		headCss.innerHTML = css;
		document.head.append(headCss);
		selectStep.innerHTML = list2;
		
	});

}

function getRequestList(){
	let userids = document.getElementsByName("userid")[0];
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	
	let data = [{cpcode:cpcodes.value,prcode:prcodes.value,userid:userids.value}];
	postAjax("rest/getCompleteList",JSON.stringify(data),"ajaxReqList",2);

}

function ajaxReqList(jsonData){
	let list2 = "";
	let css = "";
	let headCss = document.createElement("style");
	let selectStep = document.getElementById("selectStep");
	let utype = jsonData[0].utype;
		
	for(i=0; i<jsonData.length; i++){
		if(jsonData[i].stcode == "I"){
		list2 += "<input type=\"radio\" id=\"radio"+i+"\" name=\"radio\" onClick=\"requestComplete(\'"+ jsonData[i].pscode +"\',\'"+jsonData[i].psname+"\')\"><label for=\"radio"+i+"\">"
		+ jsonData[i].psname + jsonData[i].stname + "</label><br>";
					
			
		css += "input[id=\"radio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
		css += "input[id=\"radio"+i+"\"]:hover \+ label{background-color:#bbbbbb;color:#ffffff;}";
		css += "input[id=\"radio"+i+"\"]{display:none; cursor:pointer;}";
		}
	}
	
	if(utype == "L" || utype == "A"){
		list2 += "<input type=\"button\" value=\"요청 취소\" onClick=\"cancelReq()\"><br>";
		list2 += "<input type=\"button\" id=\"setBtn3\" value=\"추가\" onClick=\"addJobMember()\">";
			
	}
		headCss.innerHTML=css;
		document.head.append(headCss);
		selectStep.innerHTML=list2;	
}

function getCom(){
	let userids = document.getElementsByName("userid")[0];
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	
	let data = [{cpcode:cpcodes.value,prcode:prcodes.value,userid:userids.value}];
	postAjax("rest/getCompleteList",JSON.stringify(data),"ajaxComList",2);
}

function ajaxComList(jsonData){
	let get = "";
	let getCss = "";
	let headCss = document.createElement("style");
	let selectStep = document.getElementById("selectStep");
		
		for(i=0; i<jsonData.length; i++){
			get += "<input type=\"radio\" name=\"comRadio\" id=\"comRadio"+i+"\" value=\""
			+jsonData[i].pscode+"\"><label for=\"comRadio"+i+"\">"
			+"<div>"
			+ jsonData[i].psname + jsonData[i].stname + "</div></label><br>";

			getCss += "input[id=\"comRadio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
			getCss += "input[id=\"comRadio"+i+"\"]:checked \+ label{background-color:#bbbbbb;}";
			getCss += "input[id=\"comRadio"+i+"\"]{display:none}";
			
			}
		get += "<input type=\"button\" onClick=\"getComs()\" id=\"checkDisabled\" value=\"요청리스트\"></div>";

		headCss.innerHTML=getCss;
		document.head.append(headCss);
		selectStep.innerHTML=get;	
}

function getComs(){
	let result = "";
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];

	$(document).ready(function(){
		$('input:radio[name=\"comRadio\"]').each(function(){
			if(this.checked){result = this.value;}
		});
	});
	
	if(result!=""){
		let data = [{prcode:prcodes.value,cpcode:cpcodes.value,pscode:result}];
		postAjax('rest/getComplete',JSON.stringify(data),'afterGetComplete',2);
	}else{
		alert("선택해주세요.");
	}
}

function afterGetComplete(data){
	let selectStep = document.getElementById("selectStep");
	let headCss = document.createElement("style");
	list = "";
	css = "";
	
	for(i=0; i<data.length; i++){
		list += "<input type=\"radio\" name=\"radio\" id=\"radio"+i+"\" onClick=\"reqPop(\'"+data[i].cpcode+"\',\'"+data[i].prcode+"\',\'"+data[i].pscode+"\',\'"+data[i].sccode+"\')\")><label for=\"radio"+i+"\">"
		+data[i].scname+" : "+data[i].scstate +"</label></div>";
		
		css += "input[id=\"radio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
		css += "input[id=\"radio"+i+"\"]:hover \+ label{background-color:#bbbbbb;}"
		css += "input[id=\"radio"+i+"\"]{display:none;}"
	}
	
	headCss.innerHTML = css;
	document.head.append(headCss);
	selectStep.innerHTML = list;
}

function reqPop(cp,pr,ps,sc){
	let mainPop = document.getElementById("mainPop");
	let popUp = document.getElementById("popUp");
	let userid = document.getElementsByName("userid")[0].value;
	let html = "";

	html += "<form action=\"reqComplete\" method=\"post\">";
	html += "<input type=\"hidden\" name=\"cpcode\" value=\""+cp+"\">";
	html += "<input type=\"hidden\" name=\"prcode\" value=\""+pr+"\">";
	html += "<input type=\"hidden\" name=\"pscode\" value=\""+ps+"\">";
	html += "<input type=\"hidden\" name=\"sccode\" value=\""+sc+"\">";
	html += "<input type=\"hidden\" name=\"userid\" value=\""+userid+"\">";
	html += "<input type=\"radio\" name=\"sddstate\" value=\"S\">완료";
	html += "<input type=\"radio\" name=\"sddstate\" value=\"I\">피드백<div id=\"testdiv\" style=\"display:none;\"><input type=\"text\" name=\"sdcontent\"></div>";
	html += "<input type=\"submit\" value=\"승인\">";
	html += "</form>";
	popUp.innerHTML = html;
	mainPop.style.display = "block";
	  
		let state = document.getElementsByName("sddstate");
		
		let testdiv = document.getElementById("testdiv");
		
		state[1].addEventListener('click',function(){
			testdiv.style.display = "block";
			});
			
		state[0].addEventListener('click',function(){
			popUp.innerHTML = html;
			testdiv.style.display = "none";
		});
	
	
}



function requestComplete(ParamPscode,psname){
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	let data = [{prcode:prcodes.value,cpcode:cpcodes.value,pscode:ParamPscode}];
	
	if(confirm(psname+"을 완료 요청하시겠습니까?")){
		postAjax('rest/requestComplete',JSON.stringify(data),'afterReq',2);
		
	}else{
		alert(psname + "의 요청을 취소하였습니다.");
	}
	
}

function afterReq(data){
	if(data == true){
		alert("프로젝트 스텝 완료 요청을 완료했습니다.");
		location.href=adminProject;
	}else{
		alert("다시 시도해주세요.");
	}
}

function cancelReq(){
	location.href=adminProject;
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


function addJobMember(ParamPscode){
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	let userids = document.getElementsByName("userid")[0];
	let pscode = document.getElementsByName("pscode")[0];
	pscode.value = ParamPscode;
	
	let data = [{prcode:prcodes.value,cpcode:cpcodes.value,userid:userids.value}];
	
	postAjax("rest/addJob",JSON.stringify(data),"afterJobMember",2);
}

function afterJobMember(data){
	let html = "";
	let selectStep = document.getElementById("selectStep");
	let css = "";
	let headCss = document.createElement("style");
	
	for(i=0; i<data.length; i++){
		
	html +=
	
	"<div style=\"border:1px solid #bbbbbb; width:1000px;\"><input type=\"radio\" id=\"radio"+i+"\" name=\"radio\" value=\""+data[i].userid+"\")\"><label for=\"radio"+i+"\">"
	+ data[i].username +"<div style=\"width:100px; float:left;\">"
	+ data[i].userid +"</label></div></div>";
	
	css += "input[id=\"radio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
	css += "input[id=\"radio"+i+"\"]:checked \+ label{background-color:#bbbbbb}";
	css += "input[id=\"radio"+i+"\"]{display:none}";
	
	}
	
	html+= "<input type=\"button\" value=\"생성\" onClick=\"clickIns()\">";
	
	headCss.innerHTML = css;
	document.head.append(headCss);
	selectStep.innerHTML = html;
}

function clickIns(){
	let mainPop = document.getElementById("mainPop");
	let popUp = document.getElementById("popUp");
	let prcodes = document.getElementsByName("prcode")[0].value;
	let cpcodes = document.getElementsByName("cpcode")[0].value;
	let pscodeValue = document.getElementsByName("pscode")[0].value;
	let result;

	$(document).ready(function(){
		$('input:radio[name=\"radio\"]').each(function(){
			if(this.checked){result = this.value;}
		});
	});
	
		popUp.innerHTML = "<input type=\"text\" name=\"scname\"><br>"+
						  "<input type=\"button\" name=\"insProjectStep\" value=\"전송\">";
				
		mainPop.style.display = "block";
		let insProjectStep = document.getElementsByName("insProjectStep")[0];
		let scnames = document.getElementsByName("scname")[0];
		
		insProjectStep.addEventListener('click',function(){
			let jsonData = 
			[{prcode:prcodes,cpcode:cpcodes,userid:result,scname:scnames.value,pscode:pscodeValue}];
			//console.log(JSON.stringify(jsonData));
			postAjax("rest/insSchedule",JSON.stringify(jsonData),"afterInsPs",2);
			
	});
}

function afterInsPs(data){
	if(data==true){
		location.href=adminProject;
	}else{
		alert("실패");
	}
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






