/* 업무 조회 */
function getSchedule(){
	
	postAjax('', clientData, getSchedule)
}



function selectScheDetail(jsonData){ //업무 디테일 피드 조회하는 펑션.

	let list = "";
	let selectSD = document.getElementById("selectScheduleDetail");
	let feed = document.getElementsByClassName("feed")[0];
	
	feed.innerHTML +="추가</div>";
	feed.innerHTML += "<div onClick = 'editSchedule()'>편집</div><div onClick = 'getSDInfo()' name = 'getSDInfo'>완료승인</div>";
	for(i=0; i<jsonData.length; i++){
		
	feed.innerHTML += "<div class='Detail'>" 
					/*+ "<div id=\"schename\" >" + jsonData[i].scname  + "</div>"*/
					+ "<div id=\"boxes\"><div id=\"username\"><img id=\"img\" src=\"/resources/images/person.jpg.png\"> " + jsonData[i].username + "</div><span id=\"state\">"
					+ jsonData[i].sddstate  + "</span></div>"
					+ "<div id=\"content\">" + jsonData[i].sdcontent + "</div>"
					+ "<div id=\"date\">" + jsonData[i].sddate + "</div></div>";	
	
	}
	feed.innerHTML +="<div onClick = \"addScheduleDetail()\" name = 'addScheduleDetail' style = 'display:none'>";
	
	
	
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


  });

let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:arr[0], sdcode:arr[1] , sccode:arr[2]}];

let clientData = JSON.stringify(jsonData);

alert(clientData);
postAjax("rest/ReqPass", clientData, 'upPass', 2);


}

function upPass(){ //업무 디테일 완료 승인해주면 모달 창 다 꺼지는 거
	/*let modal1 = document.getElementById("modal1");
	let modal2 = document.getElementById("modal2");
	modal2.remove();
	modal1.remove();*/
	location.href = "scheduleForm";
	
	
}

function addScheduleDetail(){ //업무추가 누르면 실행되는 펑션
	
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value}];
	
	let clientData = JSON.stringify(jsonData);
	
	postAjax('rest/selectProjectMember', clientData, 'getScheManager', 2);
	
	
	
}


function getScheManager(jsonData){ //업무 디테일 추가하면서 관리자 추가하려고 프로젝트 멤버 조회하는 곳
   
    let box = document.getElementById("modal1");
    

	box.style.display = "block";

	box.innerHTML += "<div class='modal' id = 'modal3' tabindex='-1' role='dialog' style='border:1px solid black;'>";
	
	
		
	box.innerHTML += "<div class='modal-dialog' role='document'>Schedule Detail<input type = 'text' class='modal-content' name = 'sdcontent'/><div class='modal-header'>";
	
	for(i=0; i<jsonData.length; i++){
	box.innerHTML += "<div class='modal-body'><p></p></div><input type ='radio'value= \'"+jsonData[i].userid+"\' name = 'radioo'/>"+jsonData[i].uname+"";
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
	let sccode = document.getElementsByName("sccode")[0];
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

let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, userid:userid, pscode:pscode.value, sdcontent:sdcontent.value,sccode:sccode.value}];

let clientData = JSON.stringify(jsonData);

postAjax("rest/InsSD", clientData, 'upPass', 2);


}

/*
window.addEventListener('load',function(){
	let feed = document.getElementsByClassName("feed")[0];
	let plus = "";
	
	for(i=0; i<5; i++){
		plus += "<div class=\"Detail\">야호_"+(i+1)+"</div>";
	}
	
	feed.innerHTML = plus;
		
});*/



















