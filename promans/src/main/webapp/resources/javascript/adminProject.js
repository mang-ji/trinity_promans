
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
		
	list += "<div onClick = \"getScheDetail(\'"+jsonData[i].sccode+"\',\'"+jsonData[i].pscode+"\')\">"+ jsonData[i].scname + jsonData[i].scstate + "</div></label><br>";	
	}
	edit += "<div onClick = 'editSchedule()'>편집</div><div onClick = 'getSDInfo()' name = 'getSDInfo'>완료승인</div><div onClick = 'addScheduleDetail()' name = 'send' style = 'display:none'>완료요청</div><div onClick = 'addScheduleDetail()' name = 'addScheduleDetail' style = 'display:none'>추가</div>"
	
	
	
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
	

	let addScheduleDetail = document.getElementsByName("addScheduleDetail")[0];
  
	
		addScheduleDetail.style.display="block";
		
		
		
		
}

function getSDInfo(ParamPscode){ //완료요청 누르면 실행되는 펑션 , 완료 요청 정보 가져오려면 필요한 데이터 받아오는 펑션

   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
   let modal = document.getElementById("modal1");

    modal.style.display = "block";

   let jsonData = [{cpcode:cpcode.value, prcode:prcode.value}];
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


  }) 
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

		div.style.display="none";
		
	
}

function  closeScheFeedback(message){ //피드백 창 끄는 펑션
	
	let div = document.getElementById("modal2");
	div.remove();
}

function sendScheFeedback(jsonData){ //피드백 전송
	
  let sdcontent = document.getElementsByName("feedbacktext")[0];
	
  let sendFeed = document.getElementsByName("sendfeed")[0];

    sendFeed.addEventListener('click',function(){

     jsonData.push({sdcontent:sdcontent.value});
	 postAjax("rest/ScheFeedback", JSON.stringify(jsonData), "closeScheFeedback", 2 );
	
})
	
}

function reqPass(){ //완료 요청 승인 해주는 곳
	
let cpcode = document.getElementsByName("cpcode")[0];
let prcode = document.getElementsByName("prcode")[0];
let pscode = document.getElementsByName("pscode")[0];

 let box = document.getElementById("modal2");

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


  }) 

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

function addScheduleDetail(){ //업무추가 누르면 실행되는 펑션
	
	let box = document.getElementById("modal1");
	
	box.style.display = "block";

	box.innerHTML += "<div class='modal' id = 'modal3' tabindex='-1' role='dialog' style='border:1px solid black;'>";
	box.innerHTML += "<div class='modal-dialog' role='document'><div class='modal-content' name = 'promem'><div class='modal-header'>";
	box.innerHTML += "<div class='modal-body'><p></p></div>";
	box.innerHTML += "<div class='modal-footer'>";
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"insScheduleDetail()\">추가하기</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick = 'closee()'>Close</button>";
	box.innerHTML += "</div></div></div></div>";
	
}


function getScheManager(){ //업무 디테일 추가하면서 관리자 추가하려고 프로젝트 멤버 조회하는 곳

     
	
}




