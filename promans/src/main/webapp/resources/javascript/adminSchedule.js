/* 업무 조회 */


function getSchedule(){
	
	postAjax('', clientData, getSchedule)
}


function getSDGraph(jsonData){
	

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

// Create a base filter effect (as if it'getworks not there) for the hover to return to
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
	let html="";
	
	
		html += "<div id = 'notTitle'>NOTICE</div>";
		html += "<div id ='noBack'>";
	for(i=0; i<jsonData.length; i++ ){
	   if(count<=3){ 
			
			html += "<div id = 'noticee' onClick= \"notDetail(\'"+jsonData[i].nocode+"\')\">";
			html += count+".&ensp;"+jsonData[i].title +"<div id ='noSdate'>";
			html += jsonData[i].sdate+"</div></div>";
			
     
     
	
	}
	
		html += "</div>";
		count++;
		
		child1.innerHTML=html;
	}
	
	

}

function notDetail(nocode){
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	
	let jsonData= [{cpcode:cpcode.value, prcode:prcode.value, nocode:nocode}];
	
	let clientData = JSON.stringify(jsonData);
	
    postAjax('rest/notpop', clientData, 'notDetailPop', 2 );
	
	
}

function notDetailPop(jsonData){
    let background = document.getElementById("modal_background");
	let modal_box = document.getElementById("modal_box");
	let html = "";

	html += "<div class='modal' id = 'modal3' style='border:1px solid black;'>";
	
	html += "<div id ='modal-title'class=\"notDetailHead\">Notice Detail</div>";
	
	html += "<div class=\"notDetailContentDiv\">";
	
	html += "<div class=\"notDetailTitleDiv\">";
	html += "<div class=\"notDetailContent notDetailTitle\">"+jsonData[0].title+"</div>";
	html += "<div class=\"notDetailContent notDetailWriter\">"+jsonData[0].writer+"</div>";
	html += "</div>";
	
	html += "<div class=\"notDetailContentsDiv\">";
	html += "<div class=\"notDetailContent notDetailContents\"><div>"+jsonData[0].contents+"</div><div class=\"notDetailSdate\">"+jsonData[0].sdate+"</div></div>";
	html += "</div>";
	
	html += "</div>";
	
	html += "<input type='button' id=\"nbtns\" onClick='upPass()' value=\"뒤로가기\"/></div>";
	html += "</div>";
	
	modal_box.innerHTML = html;
	background.style.display = "block";

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
	
   if(utype.value == "L" || utype.value == "A"){
	notices.innerHTML += "<div id ='reqBoxx'><div id = 'reqSDBtn' onClick = 'reqWork()'>완료 승인 요청</div><div id = 'reqSDBtn' onClick= 'reqSc()'>업무 완료 요청</div></div>";
	reqMenu.innerHTML += "<div id = 'SDMbtn'><div id = 'getSDInfo' name = 'getSDInfo' onClick = 'page()'>이전 화면으로</div><div onClick = 'getSDInfo()' id = 'getSDInfo' name = 'getSDInfo'>완료 승인</div><div  id = 'getSDInfo' onClick = 'addScheduleDetail()'>업무 추가</div></div>";

	
	
	
}else{
	notices.innerHTML += "<div id = 'reqSDBtn' onClick = 'reqWork()'>완료 승인 요청</div>";
	reqMenu.innerHTML += "<div id = 'SDMbtn'><div id = 'getSDInfoo'  onClick = 'page()' name = 'getSDInfo'>이전 화면으로</div></div>";
}
	
	
	
}

function reqSc(){
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let pscode = document.getElementsByName("pscode")[0];
	let sccode = document.getElementsByName("sccode")[0];
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, sccode:sccode.value}];
	
	let clientData = JSON.stringify(jsonData);
	
	postAjax('rest/reqSc', clientData, 'reqSCList', 2);
	
	
	
}

function reqSCList(jsonData){
	
	alert(jsonData.message);
	
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
	
     
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value}];
	
	let clientData = JSON.stringify(jsonData);
	

	postAjax('rest/selectScheduleMember', clientData, 'getScheManager', 2);
	
	
	
}


function getScheManager(jsonData){ //업무 디테일 추가하면서 관리자 추가하려고 프로젝트 멤버 조회하는 곳
   
    let box = document.getElementById("modal_box");
    let background = document.getElementById("modal_background");
    let css = "";
    let style = document.createElement("style");

	box.style.display = "block";
	background.style.display = "block";

	//box.innerHTML += "<div class='modal' id = 'modal3' style='border:1px solid black;' >";
	
	
		
	box.innerHTML += "<div id ='modal-title4'>Schedule Detail<div id='sdcontentBox'><input type = 'text' class='modal-content' id = 'sdcontent' name = 'sdcontent' placeholder='업무명을 작성해주세요.'/></div></div>";
	
	for(i=0; i<jsonData.length; i++){
		
	box.innerHTML += "<input type ='radio'value= \'"+jsonData[i].userid+"\' class = 'radioo'  name = 'radioo' id =\"radioo"+i+"\"/><label for = \"radioo"+i+"\" style='width:100%; padding-top:5px; padding-bottom:5px;' >"+jsonData[i].uname+""+"</label>";
	
	  css += "input[id=\"radioo"+i+"\"]:hover \+ label{background-color:#5e5d5e;color:#ffffff;}";
      css += "input[id=\"radioo"+i+"\"]:checked \+ label{background-color:#5e5d5e;color:#ffffff;}";
      css += "input[id=\"radioo"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff;}";
	
	}
	
	style.innerHTML = css;
	document.head.append(style);
	
	box.innerHTML += "<div id = 'marginBTNS'><input type='button' id=\"btns\" onClick = \"insScheduleDetail()\" value =\"추가하기\" /><br>";
	box.innerHTML += "<input type='button' id=\"btns\" onClick='popClose()' value=\"뒤로가기\"/></div>";
	//box.innerHTML += "</div>";
	
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



postAjax("rest/InsSD", clientData, 'upPass', 2);


}


function reqWork(){
	alert("완료 승인 요청이 되었습니다.");
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
		
		
	modalForm.innerHTML = "<div id ='modal_background'><div id='modal_box'><div id='requestList'></div></div><div id = 'modal_box2' style='display:none;'></div></div>";


		
	
	
}

function selectScheDetail(jsonData){ //업무 디테일 피드 조회하는 펑션.
	if(jsonData != ""){
		let list = "";
		let selectSD = document.getElementById("selectScheduleDetail");
		let feed = document.getElementsByClassName("feed")[0];
		let path = document.getElementById("projectPath");
		let prname = document.getElementsByName("prname")[0];
		let psname = document.getElementsByName("psname")[0];
		
		feed.innetHTML += "<input type ='hidden' name = 'sccode' value = \'"+jsonData[0].sccode+"\'/>";
		
		path.innerHTML =  prname.value + " > " + psname.value + " > "+ jsonData[0].scname ;
		for(i=0; i<jsonData.length; i++){
			
		feed.innerHTML += "<div class='Detail'>" 
						/*+ "<div id=\"schename\" >" + jsonData[i].scname  + "</div>"*/
						+ "<div id=\"boxes\"><div id=\"username\"><img id=\"img\" src=\"/resources/images/person.jpg.png\"> " + jsonData[i].username 
						+ "</div><div id=\"state\">"+ jsonData[i].sddstate  + "</div></div>"
						+ "<div id=\"content\">" + jsonData[i].sdcontent + "</div>"
						+ "<div id=\"date\">" + jsonData[i].sddate + "</div></div>";	
		
		}
		feed.innerHTML +="<div onClick = \"addScheduleDetail()\" name = 'addScheduleDetail' style = 'display:none'>";
		
		path.style.display = "block";
		postAjax("rest/GetWork", JSON.stringify(jsonData), 'getWork',2);
	}else if(confirm("업무 디테일이 없습니다. 생성하시겠습니까?")){
		$(document).ready(function(){
			let data=[{cpcode:$('input[name=cpcode]').val(),
						prcode:$('input[name=prcode]').val(),
						pscode:$('input[name=pscode]').val(),
						sccode:$('input[name=sccode]').val(),
						userid:$('input[name=userid]').val(),
						utype:$('input[name=utype]').val()}];
						
			postAjax("rest/FirstInsSdBool",JSON.stringify(data),"afterFirstInsSdBool",2);
			
		});
		
	}else{
		alert("취소되었습니다.");
		location.href = "projectForm";
	}
	
}


function afterFirstInsSdBool(data){
	if(data!=""){
		let html = "";
		let css = "";
		let result = "";
		let mainPop = document.getElementById("mainPop");
		let popUp = document.getElementById("popUp");
		let headCss = document.createElement("style");
		console.log(data);
		html+= "<div class=\"plStep\"> 업무 추가 </div>";
		
		html+= "<input type=\"text\" name=\"sdcontent\" class=\"scNtext\""+
		"placeholder=\"업무 제목을 입력해주세요.\" onfocus=\"this.placeholder=\'\'\""+
		"onblur=\"this.placeholder=\'업무 제목을 입력해주세요.\'\">";
		
		html+= "<div class=\"stepList\">";
		html+= "<div class=\"stepHead\">Schedule Admin</div>"
		html+= "<div style=\"margin:auto; width:100%; height:40px;\">";
		html+= "<div class=\"stepTitle stepTitle2 stLeft\">아이디</div><div class=\"stepTitle stepTitle2\">이름</div></div>";
		
		for(i=0; i<data.length; i++){
				
			html+= "<div class=\"stepContents\">";
			html+= "<input type=\"radio\" id=\"stepRadio"+i+"\" name=\"stepRadio\" value=\""+data[i].userid+"\">";
			html+= "<label for=\"stepRadio"+i+"\">";
			html+= "<div style=\"margin:auto; width:100%; height:27px;\">";
			html+= "<div class=\"stepTitle stLeft\">" + data[i].userid + "</div>";
			html+= "<div class=\"stepTitle\">" + data[i].username + "</div></div>";
			html+= "</label></div>";
			
			css += "input[id=\"stepRadio"+i+"\"] \+ label{border-top:1px solid black; width:100%; height:27px; cursor:pointer;}";
			css += "input[id=\"stepRadio"+i+"\"]:checked \+ label{background-color:#0A0A2A; color:white;}";
			css += "input[id=\"stepRadio"+i+"\"]:hover:active \+ label{background-color:#4f5f86; color:white;}";
			css += "input[id=\"stepRadio"+i+"\"]:hover \+ label{background-color:#bbbbbb;}";
			css += "input[id=\"stepRadio"+i+"\"]{display:none}";
		}
		html+= "</div>";
		
		html+= "<input type=\"button\" name=\"sdCreateBtn\" class=\"buttonStyle stepCreateBtn\" value=\"생성\">";
		html+= "<div class=\"closePop\" onClick=\"closePop()\">뒤로 가기</div>";
		
		document.head.append(headCss);
		headCss.innerHTML = css;
		popUp.innerHTML = html;
		mainPop.style.display="block";

		$(document).ready(function(){
			$('input[name=sdCreateBtn]').on('click',function(){
				$('input:radio[name=stepRadio]').each(function(){
					if(this.checked){result=this.value;}
				});

				let data=[{cpcode:$('input[name=cpcode]').val(),
							prcode:$('input[name=prcode]').val(),
							pscode:$('input[name=pscode]').val(),
							sccode:$('input[name=sccode]').val(),
							sdcontent:$('input[name=sdcontent]').val(),
							userid:result}];
						
				postAjax("rest/InsSD",JSON.stringify(data),"upPass",2);
			});
		});
		
	}else{
		alert("권한이 없습니다.");
		location.href = "projectForm";
	}
}
function closePop(){
	let mainPop = document.getElementById("mainPop");
	mainPop.style.display = "none";
	
}

function afterFirstInsSd(data){
	
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
	let css ="";
	let style = document.createElement("style");
	console.log(JSON.stringify(jsonData));
      
    box_back.style.display = "block";
    box.style.display = "block";
    
    	box.innerHTML += "<div id ='modal-title2'>Waiting List</div>";
        box.innerHTML += "<div id = 'modal-title2_box'>";
box.innerHTML += "<div id = 'SDcat4'><span id = 'SDcat1'>STAFF</span><span id = 'SDcat2'>WORK</span><span id = 'SDcat3'>DATE</span></div>";
    for(i=0; i<jsonData.length; i++){
	
	box.innerHTML += "<input type='hidden' name='sccode' value=\'"+jsonData[i].sccode+"\'/>";
	
	box.innerHTML += "<div id ='selSDD2'><input type='radio' name ='radio2' class = 'selSD' id = \"selSD"+i+"\" value = \'"+jsonData[i].userid+","+jsonData[i].sdcode+","+jsonData[i].sccode+"\'/><label for = \"selSD"+i+"\" style= 'width:100%; padding-top:5px; padding-bottom:5px;'><div id ='Wctt1'>"+jsonData[i].username+"</div><div id ='Wctt'>"+jsonData[i].sdcontent+"</div><div id ='Wctt'>"+jsonData[i].sddate+"</div></label></div>";
	
      css += "input[id=\"selSD"+i+"\"]:hover \+ label{background-color:#5e5d5e;color:#ffffff;}";
      css += "input[id=\"selSD"+i+"\"]:checked \+ label{background-color:#5e5d5e;color:#ffffff;}";
      css += "input[id=\"selSD"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff;}";
     
	}
	style.innerHTML = css;
	document.head.append(style);
	box.innerHTML += "</div><div id = 'marginBTNSS' style = 'margin-top:60px;' ><input type='button' id=\"btns\" onClick = \"scheFeedback()\" value =\"피드백하기\"/>"
	                   +"<input type='button' id=\"btns\" onClick = \"reqPass()\" value = \"완료승인\"/>"
	                   +"<input type='button' id=\"btns\" onClick='popClose()' value=\"뒤로가기\"/></div>";
	
   
	
}



function scheFeedback(){ // 피드백 모달 창 생성 
 
 let box = document.getElementById("modal_box2");


	box.style.display ="block";
	

  const radioNodeList
  = document.getElementsByName('radio2');

let cpcode = document.getElementsByName("cpcode")[0];
let prcode = document.getElementsByName("prcode")[0];
let pscode = document.getElementsByName("pscode")[0];

let arr = ""; 

  
  radioNodeList.forEach((node) => {

    if(node.checked)  {
     let userid 
        = node.value;  // rltjs,SD01 
     arr = userid.split(",");
    

    }


  }); 
		box.innerHTML += "<div id ='modal-title3'>Send Feedback</div>";
		box.innerHTML += "<div id ='contentsBox'><textarea  id='contents' placeholder='내용을 입력해주세요' style='width:80%;' name = 'feedbacktext'></textarea><div>";
		box.innerHTML += "<div id = 'pbtnBox'><span  id = 'pbtn' onClick='closeScheFeedback()'>Close</span><span  id = 'pbtn' name = 'sendfeed' >Send message</span></div>";
	




	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:arr[0], sccode:arr[2], sdcode:arr[1]}];


 				sendScheFeedback(jsonData);

}



function  closeScheFeedback(){ //피드백 창 끄는 펑션
	
	let div = document.getElementById("modal_box2");
	let modal = document.getElementById("modal_background");
	

	       div.remove()
		
		   modal.innerHTML +="<div id = 'modal_box2' style='display:none;'></div>";
	
		
	


}

function sendScheFeedback(jsonData){ //피드백 전송
	
  let sdcontent = document.getElementsByName("feedbacktext")[0];
	
  let sendFeed = document.getElementsByName("sendfeed")[0];

    sendFeed.addEventListener('click',function(){

     jsonData.push({sdcontent:sdcontent.value});
	 postAjax("rest/ScheFeedback", JSON.stringify(jsonData), "upPass", 2 );
	
});
	
}

function reqPass(){ //완료 요청 승인 해주는 곳
	
let cpcode = document.getElementsByName("cpcode")[0];
let prcode = document.getElementsByName("prcode")[0];
let pscode = document.getElementsByName("pscode")[0];

 let box = document.getElementById("modal_box2");

box.style.display ="block";
	
	
	 const radioNodeList
  = document.getElementsByName('radio2');

let arr = ""; 

	 radioNodeList.forEach((node) => {

    if(node.checked)  {
     let userid 
        = node.value;  //rltjs01,SD02,SC01 arr[0], [1], [2]
     arr = userid.split(",");
    

    }


  });

let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:arr[0], sdcode:arr[1] , sccode:arr[2]}];

let clientData = JSON.stringify(jsonData);


postAjax("rest/ReqPass", clientData, 'upPass', 2);


}

function upPass(){ //업무 디테일 완료 승인해주면 모달 창 다 꺼지는 거

	location.href = "scheduleForm";
}

function promans(){
	/*
	let f= document.createElement("form");
	f.action = "mainPageForm";
	f.method = "get";
	document.body.appendChild(f);
	f.submit();*/
	
	location.href = "mainPageForm";
}






















