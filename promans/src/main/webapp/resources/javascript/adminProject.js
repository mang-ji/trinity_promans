let sdname;
let sccode;




function goAdminProject(prcode){
     let f = document.createElement("form");
     let prcodes = makeInput("hidden","prcode",prcode);

     f.appendChild(prcodes);

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
	let prcode = document.getElementsByName("prcode")[0];

	list += "<span id='span1'>No.</span><span id='span2'>Project Step</span><span id='span3'>Progress</span>";
	for(i=0; i<jsonData.length; i++){
		 list += "<div class='steplists' onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\"><input type ='hidden' name ='pscode' value =\'"
				+jsonData[i].pscode+"\' /><div id='numbers'>"+ (i+1) + "</div><div id='psnames'>"
				+ jsonData[i].psname +"</div><div id='stnames'>"+ jsonData[i].stname + "</div></div>";
	}
	
	if(utype == "L" || utype == "A"){
		list+= "<input type='button' class='buttonStyle' value='승인' onClick=\"selectStepList(\'"+prcode.value+"\')\" />";
	    list+= "<input type='button' class='buttonStyle'  value='편집' onClick=\"sendProjectInfo(\'"+prcode.value+"\')\" />";
		list+= "<input type='button' class='buttonStyle' value='팀원 추가' onClick=\"getCompanyMember(\'"+prcode.value+"\')\"/>";
		list+= "<input type='button' class='buttonStyle' value='팀원 삭제' onClick=\"deleteProjectMember(\'"+prcode.value+"\')\"/>";
	}
	
	selectStep.innerHTML = list;
	
	/*if(utype == "L" || utype == "A"){
		
		list += "<input type=\"button\" id=\"setBtn\" value=\"편집\" style=\"display:block\"onClick=\"setButton()\"><div id=\"changeBtn\"></div>";
		list += "<input type=\"button\" id=\"setBtn2\" value=\"완료 요청\" style=\"display:none;\" onClick=\"getRequestList()\"\"><div id=\"changeBtn2\"></div>";
		list += "<input type=\"button\" id=\"setBtn3\" value=\"추가\" style=\"display:none;\" name=\"clickAdd\">";
		
	}
		list += "<input type=\"button\" onClick=\"getCom()\" value=\"완료 리스트\">";
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
		
	});*/

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
	
		console.log(jsonData[0].stcode);
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
	"<input type=\"button\" name=\"closeButton\" value=\"닫기\" onClick=\"setButton2()\"/>";
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


function addJobMember(){
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	let userids = document.getElementsByName("userid")[0];
	let pscode = document.getElementsByName("pscode")[0];
	
	let data = [{prcode:prcodes.value,cpcode:cpcodes.value,userid:userids.value,pscode:pscode.value}];
	
	postAjax("rest/addJob",JSON.stringify(data),"firstInsSchedule",2);
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
	let scnames = document.getElementsByName("scname")[0];
	let result;

	$(document).ready(function(){
		$('input:radio[name=\"radio\"]').each(function(){
			if(this.checked){result = this.value;}
		});
	});
		let jsonData = 
		[{prcode:prcodes,cpcode:cpcodes,userid:result,scname:scnames.value,pscode:pscodeValue}];
		postAjax("rest/insSchedule",JSON.stringify(jsonData),"afterInsPs",2);
			
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
	let pscodes = document.getElementsByName("pscode")[0];
	pscodes.value = pscode;
		
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode, userid:userid.value}];
	let clientData = JSON.stringify(jsonData);
	
	postAjax("rest/GetSchedule", clientData, "selectSchedule",2);
	
}

function selectSchedule(jsonData){
	if(jsonData!=""){
		let list = "";
		let edit = "";
		let ShceduleEdit = document.getElementById("ShceduleEdit");
		let count=1;
		let addList = "";
		let addListCss = "";
		let css = "";
		let headCss = document.createElement("style");
		let selectStep = document.getElementById("selectStep");
		let utype = document.getElementsByName("utype")[0].value;
		
		list += "<span id='span1'>No.</span><span  id='span2' >Schedule</span><span  id='span2'>Progress</span>";
		
		for(i=0; i<jsonData.length; i++){
		
		list += "<div onClick = \"getScheDetail(\'"+jsonData[i].sccode+"\',\'"+jsonData[i].pscode+"\')\" id ='SSC'>"
		
		+"<input type ='hidden' name = 'sccode' value = \'"+jsonData[i].sccode+"\'/>"
		+"<input type ='hidden' name = 'pscode' value = \'"+jsonData[i].pscode+"\'/>"
		
		+"<span  id ='sccount'>"
		+ count +"<span  id ='scname'>"+ jsonData[i].scname + "<span  id='scstate'> "+ jsonData[i].scstate + "</span ></span ></span ></div>"
		
		+"<div onClick = \"addScheduleDetail(\'"+jsonData[i].scname+","+jsonData[i].sccode+"\')\" name = 'addScheduleDetail' style = 'display:none'>"
		+"추가</div>";	
		   count++;}
	
		list += "<input type=\"button\" onClick=\"getCom()\" value=\"완료 리스트\">";
	
		//if(jsonData[0].utype != "G"){
			edit += "<input type=\"button\" id=\"setBtn\" value=\"편집\" style=\"display:block\"onClick=\"setButton()\"><div id=\"changeBtn\"></div>"
				+"<input type=\"button\" id=\"setBtn2\" value=\"완료 요청\" style=\"display:none;\" onClick=\"getRequestList()\"\"><div id=\"changeBtn2\"></div>"
				+"<input type=\"button\" id=\"setBtn3\" value=\"추가\" style=\"display:none;\" onClick=\"addJobMember()\">";
		//	}
		selectStep.innerHTML = list;
		ShceduleEdit.innerHTML = edit;
		
		let btn = document.getElementById("setBtn2");
		btn.addEventListener('click',function(){
			btn.style.display="none";
			headCss.innerHTML = css;
			document.head.append(headCss);
			//selectStep.innerHTML = list2;
			selectStep.innerHTML = list;
			ShceduleEdit.innerHTML = edit;
		});
		
	}else{
		if(confirm("업무가 없습니다. 생성하시겠습니까?")){
			let cpcode = document.getElementsByName("cpcode")[0].value;
			let prcode = document.getElementsByName("prcode")[0].value;
			let pscode = document.getElementsByName("pscode")[0].value;
			let userid = document.getElementsByName("userid")[0].value;
			
			let data = JSON.stringify([{cpcode:cpcode,prcode,prcode,pscode,pscode,userid,userid}]);
			postAjax("rest/firstInsSchedule",data,"firstInsSchedule",2);
		}
	}
}

function firstInsSchedule(data){
	if(data != ""){
		let html = "";
		let css = "";
		let result = "";
		let mainPop = document.getElementById("mainPop");
		let popUp = document.getElementById("popUp");
		let headCss = document.createElement("style");
		let prcode = document.getElementsByName("prcode")[0].value;
		let cpcode = document.getElementsByName("cpcode")[0].value;
		let pscode = document.getElementsByName("pscode")[0].value;
		
		for(i=0; i<data.length; i++){
			
		html +=
		"<div><input type=\"radio\" id=\"radio"+i+"\" name=\"radio\" value=\""+data[i].userid+"\")\"><label for=\"radio"+i+"\">"
		+ data[i].username +"<div style=\"width:100px; float:left;\">"
		+ data[i].userid +"</label></div></div>";
		
		css += "input[id=\"radio"+i+"\"] \+ label{border:1px solid #bbbbbb; width:500px; cursor:pointer;}";
		css += "input[id=\"radio"+i+"\"]:checked \+ label{background-color:#bbbbbb}";
		css += "input[id=\"radio"+i+"\"]{display:none}";
		}
		html += "<input type=\"text\" name=\"scname\"><br>";
		
		html+= "<input type=\"button\" value=\"생성\" onClick=\"clickIns()\">";
		
		document.head.append(headCss);
		headCss.innerHTML = css;
		popUp.innerHTML = html;
		mainPop.style.display="block";
		
		$(document).ready(function(){
			$('input:radio[name=\"radio\"]').each(function(){
				if(this.checked){result = this.value;}
			});
		});
		
		/*let scname = document.getElementsByName("scname")[0].value;
		let clientData = 
		JSON.stringify([{cpcode:cpcode, prcode:prcode, pscode:pscode, userid:result,scname:scname}]);
		alert(clientData);*/
		
	}else{
		alert("권한이 없습니다.");
	}
		
}


function getScheDetail(sccode1, pscode1){
	
    let f = document.createElement("form");
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let sccode = makeInput("hidden","sccode",sccode1);  
	   	
	  f.appendChild(prcode);
	  f.appendChild(cpcode);
	  f.appendChild(sccode);

	  f.action = "GoAdminScheduleForm";
	  f.method = "POST";
	

	 document.body.appendChild(f);
	
	 f.submit();
	
}

function editSchedule(){ //편집 누르면 완료요청, 업무추가 버튼 나옴
	

	let addScheduleDetail = document.getElementsByName("addScheduleDetail");
          
        if(addScheduleDetail[0].style.display=='none'){
		for(i=0; i<addScheduleDetail.length; i++){
			addScheduleDetail[i].style.display="block";
		}
		}else{
			for(i=0; i<addScheduleDetail.length; i++){
			addScheduleDetail[i].style.display="none";
		}
			
		}
		
		
		
		
}

function getSDInfo(Param){ //완료요청 누르면 실행되는 펑션 , 완료 요청 정보 가져오려면 필요한 데이터 받아오는 펑션

   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
    let pscode = document.getElementsByName("pscode")[0];
//let sdname = document.getElementsByName("scname")[0];  
 let modal = document.getElementById("modal1");

    modal.style.display = "block";

   let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value}];
   let clientData = JSON.stringify(jsonData); 

  postAjax("rest/GetSDInfo" , clientData, "getReqForCompletion", 2);
	
}

function getReqForCompletion(jsonData1){ //완료요청 상태인 업무 디테일 조회하려고 필요한 값 보내고 받는 곳

   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
   let userid = document.getElementsByName("userid")[0];
   let pscode = document.getElementsByName("pscode")[0];

	pscode.value = jsonData1[0].pscode;

	let json = [];
	
 	for(i=0; i<jsonData1.length; i++){
   		json.push({cpcode:cpcode.value, prcode:prcode.value, pscode:jsonData1[i].pscode,sccode:jsonData1[i].sccode , sddcode:jsonData1[i].sddcode, userid:userid.value});
    }

   let clientData = JSON.stringify(json);
  	alert(clientData);

    postAjax("rest/ReqForCompletion", clientData , "reqForCompletion" , 2);
	
}

function reqForCompletion(jsonData){ //(대기 상태인 업무 디테일 조회) 여기서 피드백하기 or 완료승인 버튼으로 분기됨
	
	let box = document.getElementById("modal1");
	console.log(JSON.stringify(jsonData));
	box.innerHTML += "<div class='modal' id = 'modal' tabindex='-1' role='dialog' style='border:1px solid black;'>";
	box.innerHTML += "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>";
	box.innerHTML += "<h5 class='modal-title'></h5></div>";
	
    for(i=0; i<jsonData.length; i++){
	
	box.innerHTML += "<input type='hidden' name='sccode2' value=\'"+jsonData[i].sccode+"\'/>";
	box.innerHTML += "<div class='modal-body'><p><input type= 'radio'name ='radio'value = \'"+jsonData[i].userid+","+jsonData[i].sdcode+","+jsonData[i].sccode+"\'>"+jsonData[i].sdname+jsonData[i].sdcontent+jsonData[i].sddate+jsonData[i].sddstate+jsonData[i].username+"</></p></div>";
	
	}
	box.innerHTML += "<div class='modal-footer'>";
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"scheFeedback()\">피드백하기</button>";
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"reqPass()\">완료승인</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick = 'closee()'>Close</button>";
	box.innerHTML += "</div></div></div></div>";
	

	
}



function scheFeedback(){ // 피드백 모달 창 생성 
 
 let box = document.getElementById("modal2");


box.style.display ="block";


  const radioNodeList
  = document.getElementsByName('radio');

let cpcode = document.getElementsByName("cpcode")[0];
let prcode = document.getElementsByName("prcode")[0];
let pscode = document.getElementsByName("pscode")[0];

let arr = ""; 

  
  radioNodeList.forEach((node) => {

    if(node.checked)  {
     let userid 
        = node.value;  // rltjs,SD01 
     arr = userid.split(",");
    
alert(arr[2]);
    }


  }); 
//box.innerHTML += "<div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
box.innerHTML += "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>Send Feedback";
box.innerHTML += "<div class='modal-body'><form>";
box.innerHTML += "<label for='message-text' class='col-form-label'>Message:</label>";
box.innerHTML += "<textarea class='form-control' id='message-text' name = 'feedbacktext'></textarea></div></form></div>";
box.innerHTML += "<div class='modal-footer'>";
box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='closeScheFeedback()'>Close</button>";
box.innerHTML += "<button type='button' class='btn btn-primary' name = 'sendfeed' >Send message</button>";
box.innerHTML += "</div></div></div></div>";



let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:arr[0], sccode:arr[2], sdcode:arr[1]}];


 sendScheFeedback(jsonData);

}

function closee(){ //업무 완료 승인 창 스타일 주기
	let div = document.getElementById("modal1");
    let modal = document.getElementById("modalDiv");
		div.remove();
		modal.innerHTML="<div id = 'modal1' style='display:none;' ></div><div id = 'modal2'  style='display:none;'></div>";
		
	
}


function  closeScheFeedback(message){ //피드백 창 끄는 펑션
	
	let div = document.getElementById("modal2");
	let div1 = document.getElementById("modal1");
	let modal = document.getElementById("modalDiv");
	div.remove();
	div1.remove();
	modal.innerHTML="<div id = 'modal1' style='display:none;' ></div><div id = 'modal2'  style='display:none;'></div>";
}

function sendScheFeedback(jsonData){ //피드백 전송
	
  let sdcontent = document.getElementsByName("feedbacktext")[0];
	
  let sendFeed = document.getElementsByName("sendfeed")[0];

    sendFeed.addEventListener('click',function(){

     jsonData.push({sdcontent:sdcontent.value});
	 postAjax("rest/ScheFeedback", JSON.stringify(jsonData), "closeScheFeedback", 2 );
	
});
	
}

function reqPass(){ //완료 요청 승인 해주는 곳
	
let cpcode = document.getElementsByName("cpcode")[0];
let prcode = document.getElementsByName("prcode")[0];
let pscode = document.getElementsByName("pscode")[0];

 let box = document.getElementById("modal_box");

box.style.display ="block";
	
	
	 const radioNodeList
  = document.getElementsByName('radio');


let arr = ""; 

	 radioNodeList.forEach((node) => {

    if(node.checked)  {
     let userid 
        = node.value;  //rltjs01,SD02,SC01 arr[0], [1], [2]
     arr = userid.split(",");
    
alert(userid);
    }


  });

let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:arr[0], sdcode:arr[1] , sccode:arr[2]}];

let clientData = JSON.stringify(jsonData);

alert(clientData);
postAjax("rest/ReqPass", clientData, 'upPass', 2);


}

function upPass(){ //업무 디테일 완료 승인해주면 모달 창 다 꺼지는 거
	let modal1 = document.getElementById("modal1");
	let modal2 = document.getElementById("modal2");
	modal2.remove();
	modal1.remove();
	
	
}

function addScheduleDetail(sdname1, sccode1){ //업무추가 누르면 실행되는 펑션
	
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	
	sccode = sccode1;
	sdname = sdname1;
	
	alert(cpcode.value + prcode.value + sdname1);
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value}];
	
	let clientData = JSON.stringify(jsonData);
	
	postAjax('rest/selectProjectMember', clientData, 'getScheManager', 2);
	
	
	
}


function getScheManager(jsonData){ //업무 디테일 추가하면서 관리자 추가하려고 프로젝트 멤버 조회하는 곳
   
    let box = document.getElementById("modal_box");
    let background = document.getElementById("modal_background");

	box.style.display = "block";
	background.style.display = "block";

	box.innerHTML += "<div class='modal' id = 'modal3' tabindex='-1' role='dialog' style='border:1px solid black;'>";
	
	
		
	box.innerHTML += "<div class='modal-dialog' role='document'>Schedule Detail<input type = 'text' class='modal-content' name = 'sdcontent'/><div class='modal-header'>";
	
	for(i=0; i<jsonData.length; i++){
	box.innerHTML += "<div class='modal-body'><p></p></div><input type ='radio'value= \'"+jsonData[i].userid+"\' name = 'radioo'/>"+jsonData[i].username+"";
	}
	box.innerHTML += "<div class='modal-footer'>";
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"insScheduleDetail()\">추가하기</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick = 'closee()'>Close</button>";
	box.innerHTML += "</div></div></div>";
	
}

function insScheduleDetail(){
	
	let cpcode = document.getElementsByName("cpcode")[0];
    let prcode = document.getElementsByName("prcode")[0]; 
    let sdcontent = document.getElementsByName("sdcontent")[0];
    let pscode = document.getElementsByName("pscode")[0];
	let userid="";
	let arr= "";

	
		 const radioNodeList
  = document.getElementsByName('radioo'); 
  
	 radioNodeList.forEach((node) => {

    if(node.checked)  {
     userid 
        = node.value;  //rltjs01,SD02,SC01 arr[0], [1], [2]
     

    }

  }); 
arr = sdname.split(",");

let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, userid:userid, pscode:pscode.value,sdname:arr[0], sdcontent:sdcontent.value,sccode:arr[1]}];

let clientData = JSON.stringify(jsonData);
console.log(sccode);
console.log(sdname);
alert(clientData);

postAjax("rest/InsSD", clientData, 'upPass', 2);


}

function sendProjectInfo(prcode){
	let createBtn = document.getElementById("createBtn");
	let data = "";
	// 프로젝트 완료요청은 일단 재낌 , 프로젝트용 피드백 테이블이 없삼 
	data += "<input type='button' class='stepbuttonStyle' value='승인 요청' onClick=\"reqProjectAccept(\'"+prcode+"\')\">"; 
	data += "<input type='button' class='stepbuttonStyle' value='스텝 생성' onClick=\"makeProjectStep(\'"+prcode+"\')\"><br>";
	
	createBtn.innerHTML = data;
	
	editBtnTwice();
}
function editBtnTwice(){
	let editBtn = document.getElementById("createBtn");
	if(editBtn.style.display=="none"){
		editBtn.style.display="block";
	}else{
		editBtn.style.display="none";
	}
}

function getCompanyMember(prcode){ // prcode 받아놓음 
	let cpcode = document.getElementsByName("cpcode")[0];
	let jsonData = [{cpcode:cpcode.value}];
	
	postAjax("rest/SelectProjectMember", JSON.stringify(jsonData), "makeProjectMember",2);
}

function deleteProjectMember(prcode){
	let cpcode = document.getElementsByName("cpcode")[0];
	let jsonData = [{cpcode:cpcode.value, prcode:prcode}];
	postAjax("rest/DeleteProjectMember", JSON.stringify(jsonData),"deleteProjectMember",2);
}

function deleteProjectMember(jsonData){
	alert(jsonData);
}

/* 프로젝트 스텝들의 완료 요청 리스트 불러오는 함수 */
function reqProjectAccept(prcode){
	let cpcode = document.getElementsByName("cpcode")[0];
	let clientData = [{cpcode:cpcode.value, prcode:prcode}];
	
	postAjax("rest/ReqProjectAccept", JSON.stringify(clientData),"reqProjectResult",2);
}
function reqProjectResult(jsonData){
	alert(jsonData.message);
}


/* 스텝 생성하는 함수 */
function makeProjectStep(prcode){ // 입력하는 값 스텝이름, 관리자권한, 일반멤버 
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
		
  		 box.innerHTML = "<div id='modal_background2'>";
  		 box.innerHTML += "<div id='modal_box2'></div></div>";
		 box.innerHTML = "<div id=\"teamlistt\"> 프로젝트 생성 </div>"
						+"<div id=\"projetstepbox\"><div id=\"enterstepname\">프로젝트 스텝명 : </div>"
						+"<input type='text' id='stepnamee' name='stepName'/></div>"
						+"<div id=\"projetstepbox\"><div id=\"enterstepname\">관리자 : </div>"
						+"<input type='text' id='teamonelistinput'/><input type='button' value='조회' onClick=\"selectManager(\'"+prcode+"\')\"></div>";
  		 box.innerHTML += "<div id=\"btnss\" >생성하기</div>";
  		 box.innerHTML += "<div id=\"btns\" onClick='close1()'>뒤로가기</div>";
  		 box.innerHTML += "</div></div></div></div>";

		makeBtnClick(prcode);
		
		modal_background.style.display = "block";
		box.style.display = "block";
		
		
}


function makeBtnClick(prcode){
	let make = document.getElementById("btns");
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	make.addEventListener('click', function(){
		let psname1 = document.getElementsByName("stepName")[0];
		let userid1 = document.getElementsByName("userid1")[0];
		let cpcode1 = document.getElementsByName("cpcode")[0];
		let clientData = [{cpcode:cpcode1.value, prcode:prcode ,psname:psname1.value, userid:userid1.value}];

		postAjax("rest/MakeStep",JSON.stringify(clientData),"insStep",2);
		
		box.style.display = "none";
		modal_background.style.display = "none";
	});
	
}

function insStep(jsonData){
	alert(jsonData.message);
}


/* 관리자 시킬 사람 조회 */
function selectManager(prcode1){
	let clientData = [{prcode:prcode1}];
	postAjax("rest/selectManager", JSON.stringify(clientData), "getManagerList",2);
}


function getManagerList(jsonData){
	let box = document.getElementById("modal_box2");
	let modal_background = document.getElementById("modal_background2");
  		 box.innerHTML += "<div class='modal' tabindex='-1' role='dialog' style='border:1px solid black;'>";
  		 box.innerHTML += "프로젝트 멤버 리스트";
		 box.innerHTML += "<h5 class='modal-title'></h5></div>"; 
	
		 for(i=0; i<jsonData.length;i++){
			 box.innerHTML +=  "<input type='radio' name='selectedRadio' value= \'"+jsonData[i].userid+","+jsonData[i].username+"\'>"+jsonData[i].username +"</><br>" ;
		}
		
  		 box.innerHTML += "<div class='modal-footer'>";
  		 box.innerHTML += "<div class='modal-footer'>";
  		 box.innerHTML += "<button type='button' class='btn btn-primary' onClick='selectStepManager()'>select</button>";
  		 box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='close2()'>Close</button>";
  		 box.innerHTML += "</div></div>";

		modal_background.style.display = "block";
		box.style.display = "block";
	
}


function selectStepManager(){
	let array;
	let userid;
	let username;
	let radio = document.getElementsByName("selectedRadio");
	let manager = document.getElementById("selectedManager");
	
	radio.forEach((node) => {
    if(node.checked)  { 
     // document.getElementById('stepManager').innerText = node.value;
		array = node.value.split(",");
    	}
	})
	userid = array[0];
	username = array[1];
	
	manager.value = username;
	manager.innerHTML += "<input type='hidden' name='userid1' value=\'"+userid+"\' />";

	close2();
}



/* 프로젝트에 멤버를 추가하는 함수 */
function makeProjectMember(jsonData){
	let prcode = document.getElementsByName("prcode")[0];
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	box.innerHTML = "<div id=\"teamlistt\"> 프로젝트 팀원 리스트 </div>";
	for(i=0; i<jsonData.length ;i++){
		box.innerHTML += "<div id=\"teamonelist\"><input type='radio' id=\"teamonelistinput\" name='useridRadio' value=\'"+jsonData[i].userid+"\'>" + jsonData[i].userid +" : "+ jsonData[i].uname+ "</></div>";
	}
	 
	box.innerHTML += "<div id=\"btns\" onClick=\"sendSelectedMember(\'"+prcode.value+"\')\" >선택하기</div>";
	box.innerHTML += "<div id=\"btns\" onClick=\"close1()\">뒤로가기</div>";
	box.style.display = "block";
	modal_background.style.display ="block";
	
}



function close1(){
	let modal_box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	//let close = document.getElementById("modal_close");
	
	/*
	modal_box.remove();
	modal_background.remove();
	;*/
	modal_box.style.display= "none";
	modal_background.style.display= "none"
	//close.style.display ="none";
}

function close2(){
	let modal_box = document.getElementById("modal_box2");
	let modal_background = document.getElementById("modal_background2");
	//let close = document.getElementById("modal_close");
	
	modal_box.style.display= "none";
	modal_background.style.display= "none";
	
	//close.style.display ="none";
	
}


function sendSelectedMember(prcode){
	let cpcode =document.getElementsByName("cpcode")[0];
	let radio = document.getElementsByName("useridRadio");
	let userid;

	radio.forEach((node) => {
    if(node.checked)  { 
      userid = node.value;
    	}
	})
	let jsonData = JSON.stringify([{cpcode:cpcode.value, prcode:prcode, userid:userid}]);
	
	postAjax("rest/InsProjectMember", jsonData,"insProjectMember",2);
}

function insProjectMember(data){
	alert(data.message);
}


/* 요청 대기중인 스텝 리스트 가져오기 */
function selectStepList(prcode){
	let cpcode = document.getElementsByName("cpcode")[0];
    let clientData = [{cpcode:cpcode.value, prcode:prcode}];

	postAjax("rest/SelectStepReq", JSON.stringify(clientData), "getStep", 2);
}
function getStep(jsonData){
	let prcode = document.getElementsByName("prcode")[0];
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	box.innerHTML += "<div id='modal_box2'></div>";
	box.innerHTML += "<div id='modal_background2'>";

	for(i=0;i<jsonData.length;i++){
		box.innerHTML +="<input type='radio' name='stepReq' value=\'"+jsonData[i].pscode+","+jsonData[i].userid+","+jsonData[i].cpcode+"\' >"+ "스텝명 : "+jsonData[i].psname+"  관리자 : " +jsonData[i].username + "  진행상태 : "+ jsonData[i].stname+"</><br>";
	}
	
	box.innerHTML += "<button type='button' class='btn btn-primary' id='selectStep1' >Select</button>";
  	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='close1()'>Close</button><br>";

	box.style.display = "block";
	modal_background.style.display = "block";

	stepAccept(prcode); 
}



/* 피드백할지 완료할지 팝업창 보여주는 부분 */
function stepAccept(prcode){ // 필요한 값 :cpcode, prcode, pscode, userid, contents
	let radio = document.getElementsByName("stepReq");
	let box = document.getElementById("modal_box2"); 
	let modal_background = document.getElementById("modal_background2");
	let selectButton = document.getElementById("selectStep1");
	let arr;
	let pscode;
	let userid;
	let cpcode;
	
	selectButton.addEventListener('click', function(){
		radio.forEach((node) => {
	    if(node.checked)  {
	      	arr = node.value;
			pscode = arr.split(",")[0];
			userid = arr.split(",")[1];
			cpcode = arr.split(",")[2];
	    }
	 	 });
		box.innerHTML +="<div id='modal_edge'>";
		box.innerHTML += "<input type='radio' name='feedback' value='feed' onClick=\"getFeedState(event)\" >피드백</>";
		box.innerHTML += "<input type='radio' name='feedback' value='accept' onClick=\"getFeedState(event)\">승인</><br>";
		box.innerHTML += "<input type='text' id='feedcontents' placeholder='피드백을 입력하세요' style='width:400px; height:200px;' /><br>";
		box.innerHTML += "<button type='button' class='btn btn-primary' onClick=\"sendFeedback(\'"+prcode.value+","+pscode+","+userid+","+cpcode+"\')\">Complete</button>";
	  	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='close2()'>Close</button></div>";
		
		modal_background.style.display = "block";
		box.style.display = "block";
	});
}

function getFeedState(event) {
	let textBox = document.getElementById("feedcontents");
	
   	if(event.target.value == "feed"){
		textBox.style.display = "block";
		
	}else if(event.target.value == "accept"){
		textBox.style.display = "none";
	}
}

function sendFeedback(data){ // data = pr, ps,userid, cp 

	let modal = document.getElementById("modal_edge");
	let array = data.split(",");
	let feedbox = document.getElementById("feedcontents");
	let clientData = [{cpcode:array[3], prcode:array[0], pscode:array[1], userid:array[2], sdcontent:feedbox.value}]; // 피드백 보낼 때 
	postAjax("rest/InsProjectFeedback", JSON.stringify(clientData),"sendFeedback2",2);
	
	modal.remove();
	
}
function sendFeedback2(data){
	alert(data.message);
}

