/* 업무 조회 */


function getSchedule(){
	
	postAjax('', clientData, getSchedule)
}



function getSDGraph(jsonData){
	alert("요기 못온다는 거쥐");

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart.innerRadius = am4core.percent(30);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];

pieSeries.alignLabels = false;
pieSeries.labels.template.bent = true;
pieSeries.labels.template.radius = 3;
pieSeries.labels.template.padding(0,0,0,0);

pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Create hover state
var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

// Slightly shift the shadow and make it more prominent on hover
var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
hoverShadow.opacity = 0.7;
hoverShadow.blur = 5;

// Add a legend
chart.legend = new am4charts.Legend();

chart.data = [{

  "country": "대기",
  "litres": jsonData.sdW
},{
  "country": "진행",
  "litres": jsonData.sdI
}, {
  "country": "완료",
  "litres": jsonData.sdC
}];

}

function getNot(jsonData){
	
	let child1 = document.getElementById("child1");
	let count = 1;
	for(i=0; i<jsonData.length; i++ ){
    
	child1.innerHTML += "<div id ='noBack'><div id = 'noticee'><input type = 'hidden' name = 'nocode' value = "+jsonData[i].nocode+"/>"+count+".&ensp;"+jsonData[i].title
	                   +"<div id ='noSdate'>"+jsonData[i].sdate+"</div></div>"
	                   + "</div>";	

		count++;
	}
	
	

}


function getWork(jsonData){
	
	let notices = document.getElementById("notices");
	let child2 = document.getElementById("child2");
	let count =1;
	let utype = document.getElementsByName("utype")[0];
	let reqMenu = document.getElementById("reqMenu");
	let style = document.createElement("style");
	let css="";
	
	
	for(i=0; i<jsonData.length; i++ ){
  
	
	child2.innerHTML += "<div><div style = 'text-align:center;'><input type='radio' name='sdcode' class= 'workCheck' id=\"workCheck"+i+"\" value = \'"+jsonData[i].sdcode+"\'/><label for=\"workCheck"+i+"\" style = 'width:100%; padding-top:5px; padding-bottom:5px;'>"+"&ensp;"+count+".&ensp;"+jsonData[i].sdcontent +"</label></div></div>";
    child2.innerHTML += "<input type = 'hidden' name 'sdcode' value = \'"+jsonData[i].sdcode+"\'/>";
      
		count++;
     
      css += "input[id=\"workCheck"+i+"\"]:hover \+ label{background-color:#5e5d5e;color:#ffffff;}";
      css += "input[id=\"workCheck"+i+"\"]:checked \+ label{background-color:#5e5d5e;color:#ffffff;}";
      css += "input[id=\"workCheck"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff;}";
     
	
	
	}
	
	style.innerHTML = css;
	document.head.append(style);
	
   if(utype.value == "L"){
	notices.innerHTML += "<div id = 'reqSDBtn' onClick = 'reqWork()'>완료 승인 요청</div>";
	reqMenu.innerHTML += "<div id = 'SDMbtn'><div id = 'getSDInfo' name = 'getSDInfo' onClick = 'page()'>이전 화면으로</div><div onClick = 'getSDInfo()' id = 'getSDInfo' name = 'getSDInfo'>완료 승인</div><div  id = 'getSDInfo' onClick = 'addScheduleDetail()'>업무 추가</div></div>";

	
	
	
}else{
	notices.innerHTML += "<div id = 'reqSDBtn' onClick = 'reqWork()'>완료 승인 요청</div>";
	reqMenu.innerHTML += "<div id = 'SDMbtn'><div id = 'getSDInfoo'  onClick = 'page()' name = 'getSDInfo'>이전 화면으로</div></div>";
}
	
	
	
}

function page(){
	

	let form = document.createElement("form");
	form.action="page";
	form.method="get";
	
	document.body.appendChild(form);
	
	form.submit();
	
	
}

function addScheduleDetail(){ //업무추가 누르면 실행되는 펑션
	
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let sccode = document.getElementsByName("sccode")[0];
	

	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value}];
	
	let clientData = JSON.stringify(jsonData);
	
	postAjax('rest/selectScheduleMember', clientData, 'getScheManager', 2);
	
	
	
}


function getScheManager(jsonData){ //업무 디테일 추가하면서 관리자 추가하려고 프로젝트 멤버 조회하는 곳
   
    let box = document.getElementById("modal_box");
    let background = document.getElementById("modal_background");

	box.style.display = "block";
	background.style.display = "block";

	box.innerHTML += "<div class='modal' id = 'modal3' tabindex='-1' role='dialog' style='border:1px solid black;'>";
	
	
		
	box.innerHTML += "<div class='modal-dialog' role='document'>Schedule Detail<input type = 'text' class='modal-content' name = 'sdcontent'/><div class='modal-header'>";
	
	for(i=0; i<jsonData.length; i++){
	box.innerHTML += "<div class='modal-body'><p></p></div><input type ='radio'value= \'"+jsonData[i].userid+"\' name = 'radioo'/>"+jsonData[i].uname+"";
	}
	box.innerHTML += "<div class='modal-footer'>";
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"insScheduleDetail()\">추가하기</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick = 'popClose()'>Close</button>";
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


let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, userid:userid, pscode:pscode.value,sdcontent:sdcontent.value,sccode:sccode.value}];

let clientData = JSON.stringify(jsonData);

alert(clientData);

postAjax("rest/InsSD", clientData, 'upPass', 2);


}


function reqWork(){
	
	let workCheck = document.getElementsByName("sdcode");
	let userid = document.getElementsByName("userid")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let f = document.createElement("form");
	
	let sdcode;
	
	for(i=0; i<workCheck.length; i++){
		if(workCheck[i].checked){
			sdcode=workCheck[i];
		}
	}
	
    alert(sdcode.value);
	f.appendChild(cpcode);
	f.appendChild(userid);
	f.appendChild(prcode);
	f.appendChild(sdcode); 
   
    document.body.appendChild(f);

    f.action = "reqWork";
    f.method = "POST";
   
    f.submit();
	
}

function popClose(){
	let backPop = document.getElementById("backPop");
	let modalForm = document.getElementById("Form");
	let backModal = document.getElementById("modal_background");

	
	backPop.style.display = "none";
	
	backModal.remove();
		
		
	modalForm.innerHTML = "<div id ='modal_background'><div id='modal_box'><div id='requestList'></div></div><div id = 'modal_box2'></div></div>";


		
	
	
}

function selectScheDetail(jsonData){ //업무 디테일 피드 조회하는 펑션.

	let list = "";
	let selectSD = document.getElementById("selectScheduleDetail");
	let feed = document.getElementsByClassName("feed")[0];

	feed.innetHTML += "<input type ='hidden' name = 'sccode' value = \'"+jsonData[0].sccode+"\'/>";

	for(i=0; i<jsonData.length; i++){
		
	feed.innerHTML += "<div class='Detail'>" 
					/*+ "<div id=\"schename\" >" + jsonData[i].scname  + "</div>"*/
					+ "<div id=\"boxes\"><div id=\"username\"><img id=\"img\" src=\"/resources/images/person.jpg.png\"> " + jsonData[i].username 
					+ "</div><div id=\"state\">"+ jsonData[i].sddstate  + "</div></div>"
					+ "<div id=\"content\">" + jsonData[i].sdcontent + "</div>"
					+ "<div id=\"date\">" + jsonData[i].sddate + "</div></div>";	
	
	}
	feed.innerHTML +="<div onClick = \"addScheduleDetail()\" name = 'addScheduleDetail' style = 'display:none'>";
	
	
	alert(JSON.stringify(jsonData));
	
	postAjax("rest/GetWork", JSON.stringify(jsonData), 'getWork',2);
	
	
}



function getSDInfo(Param){ //완료요청 누르면 실행되는 펑션 , 완료 요청 정보 가져오려면 필요한 데이터 받아오는 펑션

   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
    let pscode = document.getElementsByName("pscode")[0];
//let sdname = document.getElementsByName("scname")[0];  

   let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value}];
   let clientData = JSON.stringify(jsonData); 

  postAjax("rest/GetSDInfo" , clientData, "getReqForCompletion", 2);
	
}

function getReqForCompletion(jsonData1){ //완료요청 상태인 업무 디테일 조회하려고 필요한 값 보내고 받는 곳

   let prcode = document.getElementsByName("prcode")[0];
   let cpcode = document.getElementsByName("cpcode")[0];
   let userid = document.getElementsByName("userid")[0];
   let pscode = document.getElementsByName("pscode")[0];
   let sccode = document.getElementsByName("sccode")[0];

	//pscode.value = jsonData1[0].pscode;

	let json = [];
	
 	for(i=0; i<jsonData1.length; i++){
   		json.push({cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value,sccode:sccode.value, sddcode:jsonData1[i].sddcode, userid:userid.value});
    }

   let clientData = JSON.stringify(json);

    postAjax("rest/ReqForCompletion", clientData , "reqForCompletion" , 2);
	
}

function reqForCompletion(jsonData){ //(대기 상태인 업무 디테일 조회) 여기서 피드백하기 or 완료승인 버튼으로 분기됨
	
	let box_back = document.getElementById("modal_background");
	let box = document.getElementById("modal_box");
	console.log(JSON.stringify(jsonData));
      
    box_back.style.display = "block";
    box.style.display = "block";
    for(i=0; i<jsonData.length; i++){
	
	box.innerHTML += "<div><input type='hidden' name='sccode' value=\'"+jsonData[i].sccode+"\'/>";
	box.innerHTML += "<input type= 'radio'name ='radio'value = \'"+jsonData[i].userid+","+jsonData[i].sdcode+","+jsonData[i].sccode+"\'>"+jsonData[i].sdcontent+jsonData[i].sddate+jsonData[i].username;
	
	}
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"scheFeedback()\">피드백하기</button>";
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick = \"reqPass()\">완료승인</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick = 'popClose()'>Close</button></div>";
	
   
	
}



function scheFeedback(){ // 피드백 모달 창 생성 
 
 let box = document.getElementById("modal_box2");
 

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



function  closeScheFeedback(){ //피드백 창 끄는 펑션
	
	let div = document.getElementById("modal_box2");
	let modal = document.getElementById("modal_background");
	div.remove();

	modal.innerHTML +="<div id = 'modal2' style='display:none;'></div>";
}

function sendScheFeedback(jsonData){ //피드백 전송
	
  let sdcontent = document.getElementsByName("feedbacktext")[0];
	
  let sendFeed = document.getElementsByName("sendfeed")[0];

    sendFeed.addEventListener('click',function(){

     jsonData.push({sdcontent:sdcontent.value});
	 postAjax("rest/ScheFeedback", JSON.stringify(jsonData), "popClose", 2 );
	
});
	
}

function reqPass(){ //완료 요청 승인 해주는 곳
	
let cpcode = document.getElementsByName("cpcode")[0];
let prcode = document.getElementsByName("prcode")[0];
let pscode = document.getElementsByName("pscode")[0];

 let box = document.getElementById("modal_box2");

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

	location.href = "scheduleForm";
	
	
}






















