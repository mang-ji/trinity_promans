let sccode;


function getStepGraph(jsonData){

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


if(jsonData.pscode ==null){
	chart.data = [{
  "country": "대기",
  "litres": jsonData.stepW
},{
  "country": "진행",
  "litres": jsonData.stepI
}, {
  "country": "완료",
  "litres": jsonData.stepC
}];

}else{
	
	
	chart.data = [{
  "country": "대기",
  "litres": jsonData.scheW
},{
  "country": "진행",
  "litres": jsonData.scheI
}, {
  "country": "완료",
  "litres": jsonData.scheC
}];

}	
}



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
	/*let list = "";
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
<<<<<<< HEAD
	let path = document.getElementById("projectPath");

	path.innerHTML  = jsonData[0].prname  ; 
=======
>>>>>>> branch 'main' of https://github.com/mang-ji/trinity_promans.git
	
	list += "<span id='span1'>No.</span><span id='span2'>Project Step</span><span id='span3'>Progress</span>";
	if(jsonData.length != 0){
		for(i=0; i<jsonData.length; i++){
		 list += "<div class='steplists' onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\"><input type ='hidden' name ='pscode' value =\'"
				+jsonData[i].pscode+"\' /><div id='numbers'>"+ (i+1) + "</div><div id='psnames'>"
				+ jsonData[i].psname +"</div><div id='stnames'>"+ jsonData[i].stname + "</div></div>";
		}
	}else{
		list = "<div id=\"noprojectstep\">프로젝트 스텝이 존재하지 않습니다.</div>";
	}*/
	
		let list = "";
		let leaderList = "";
		let edit = "";
		let css = "";
		let ShceduleEdit = document.getElementById("ShceduleEdit");
		let headCss = document.createElement("style");
		let selectStep = document.getElementById("selectStep");
		let utype = document.getElementsByName("utype")[0].value;
		let prcode = document.getElementsByName("prcode")[0];
		let path = document.getElementById("projectPath");
		
	if(jsonData.length != 0){
		path.innerHTML  = jsonData[0].prname; 
		list+= "<div class=\"scheListDiv\">";
		
		list+= "<div class=\"scheListHead\">";
		list+= "<div class=\"scheListHeadText\">Step</div>";
		list+= "</div>";
		
		list+= "<input type=\"checkbox\" id=\"leadListRadio\" class=\"scheListLeader\" onClick=\"allLeadListChange(this)\">";
		list+= "<label for=\"leadListRadio\">";
		list+= "관리 스텝";
		list+= "</label>";
		list+= "<div class=\"allLeadList\" style=\"display:none;\">";
		
		list+= "<div class=\"scheListTitle\">";
		list+= "<div class=\"scheNo\">No</div>";
		list+= "<div class=\"scheSche\">Step</div>";
		list+= "<div class=\"shePro\">Progress</div>";
		list+= "</div>";
		
		list+= "<div class=\"scheLeadList\" style=\"width:100%; height:100%;\"></div>";
		
		list+= "</div>";
		
		
		list+= "<div class=\"scheListTitle\" style=\"border-top: 1px solid black;\">";		
		list+= "<div class=\"scheNo\">No</div>";
		list+= "<div class=\"scheSche\">Step</div>";
		list+= "<div class=\"shePro\">Progress</div>";
		list+= "</div>";
		
		let count = 0;
		for(i=0; i<jsonData.length; i++){
			count++;
			if(jsonData[i].utype2 != null){
				
				if(jsonData[i].utype2 == "L"){
					leaderList+= "<div class=\"scheLeadListContent\">";
					leaderList+= "<input type=\"button\" id=\"schBtn"+i+"\" onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\">";
					leaderList+= "<label for=\"schBtn"+i+"\">";
					leaderList+= "<div class=\"scheNo scheCount\">" + count + "</div>";
					
					leaderList+= "<div class=\"scheSche scheName\">" +jsonData[i].psname
					+"<div class=\"scheImg\"><img class=\"scheImg\" src=\"resources/images/checkSch.png\"></div></div>";
					leaderList+= "<div class=\"shePro scstate\">" +jsonData[i].stname+ "</div>";
					leaderList+= "</label></div>";
					
					css+= "input[id=\"schBtn"+i+"\"]{display:none;}";
					css+= "input[id=\"schBtn"+i+"\"] \+ label{width:100%; border-top:1px solid gray; height:100%;}";
					css+= "input[id=\"schBtn"+i+"\"]:hover \+ label{background-color:#4f5f86; color:white;}";
					css+= "input[id=\"schBtn"+i+"\"]:hover:active \+ label{background-color:blue; color:white;}";
				
				}
				
				if(jsonData[i].utype2 != "L"){
					list+= "<div class=\"scheduleContents\">";
					list+= "<input type=\"button\" id=\"schBtn"+i+"\" onClick = \"getSchedule(\'"+jsonData[i].pscode+"\')\">";
					list+= "<label for=\"schBtn"+i+"\">";
					
					list+= "<div class=\"scheNo scheCount\">" + count + "</div>";
					
					list+= "<div class=\"scheSche scheName\">" +jsonData[i].psname+ "</div>";
					
					
					list+= "<div class=\"shePro scstate\">" +jsonData[i].stname+ "</div>";
					
					list+= "</label></div>";
					
					css+= "input[id=\"schBtn"+i+"\"]{display:none;}";
					css+= "input[id=\"schBtn"+i+"\"] \+ label{width:100%; border-top:1px solid gray; height:100%;}";
					css+= "input[id=\"schBtn"+i+"\"]:hover \+ label{background-color:#4f5f86; color:white;}";
					css+= "input[id=\"schBtn"+i+"\"]:hover:active \+ label{background-color:blue; color:white;}";
					
				}
			}
		}
		list+= "</div>";
		
	}else{
		list += "<div id=\"noprojectstep\">프로젝트 스텝이 존재하지 않습니다.</div>";
	}
/////////////////////////////여기까지가 list 끝 지점/////////////////////////////
/////////////////////////////여기까지가 list 끝 지점/////////////////////////////
	
		/*if(utype=="L" || utype=="A"){
			list += "<input type=\"button\" class=\"buttonStyle\" onClick=\"getCom()\" value=\"완료 요청 리스트\" style =\"float:right; margin-top: 10px; margin-right:10%;\">";
		
			edit+= "<div><input type=\"button\" class=\"buttonStyle\" id=\"setBtn\" value=\"편집\" style=\"display:block; margin-top: 5px; margin-left:10%;\"onClick=\"setButton()\"><div id=\"changeBtn\"></div>";
			edit+= "<input type=\"button\" class=\"buttonStyle\" id=\"setBtn3\" value=\"추가\" style=\"display:none; float:left; margin-top: 2px;\" onClick=\"addJobMember()\"></div>";
			edit+= "<input type=\"button\" class=\"buttonStyle\" id=\"setBtn2\" value=\"완료 요청 보내기\" style=\"display:none; float:left; margin-top: 2px;\" onClick=\"getRequestList()\"\"><div id=\"changeBtn2\"></div>";
		}
			
		headCss.innerHTML = css;
		document.head.append(headCss);		
		selectStep.innerHTML = list;
		ShceduleEdit.innerHTML = edit;*/
	if(utype == "L" || utype == "A"){
		list+= "<input type='button' style=\"margin-left:10%;\" class='buttonStyle' value='완료승인' onClick=\"selectStepList(\'"+prcode.value+"\')\" />";
		list+= "<input type='button' class='buttonStyle' value='팀원추가' onClick=\"getCompanyMember(\'"+prcode.value+"\')\"/>";
	    list+= "<input type='button' class='buttonStyle'  value='편집' onClick=\"sendProjectInfo(\'"+prcode.value+"\')\" />";
		
		//list+= "<input type='button' class='buttonStyle' value='팀원 삭제' onClick=\"deleteProjectMember(\'"+prcode.value+"\')\"/>";
		list+= "<div id=\"buttonboundary\" style=\"display:none;\"></div>";
	}


			path.style.display = "block";

			headCss.innerHTML = css;
			document.head.append(headCss);		
			selectStep.innerHTML = list;
			ShceduleEdit.innerHTML = edit;
			
			
		let scheLeadList = document.getElementsByClassName("scheLeadList")[0];
		if(leaderList != ""){
			scheLeadList.innerHTML = leaderList;
		}else{
			leaderList+= "<div class=\"noneLeaderList\">관리 스텝이 없습니다.</div>";
			scheLeadList.style.height="70px";
			scheLeadList.innerHTML = leaderList;
		}
			
			
		let btn = document.getElementById("setBtn2");
		btn.addEventListener('click',function(){
			btn.style.display="none";
			headCss.innerHTML = css;
			document.head.append(headCss);
			selectStep.innerHTML = list;
			ShceduleEdit.innerHTML = edit;
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
		let list = "";
		let css = "";
		let headCss = document.createElement("style");
		let selectStep = document.getElementById("selectStep");
		
		list+= "<div class=\"scheListDiv\">";
			
			list+= "<div class=\"scheListHead\">";
			list+= "<div class=\"scheListHeadText\">Schedule</div>";
			list+= "</div>";
			
			list+= "<div class=\"scheListTitle\">";		
			list+= "<div class=\"scheNo\">No</div>";
			list+= "<div class=\"scheSche\">Schedule</div>";
			list+= "<div class=\"shePro\">Progress</div>";
			list+= "</div>";
			
			for(i=0; i<jsonData.length; i++){
				if(jsonData[i].stcode == "I"){
					list+= "<div class=\"scheduleContents\">";
					list+= "<input type=\"radio\" id=\"reqListRadio"+i+"\" name=\"radio\" onClick=\"requestComplete(\'"+ jsonData[i].pscode +"\',\'"+jsonData[i].psname+"\')\">";
					list+= "<label for=\"reqListRadio"+i+"\">";
					
					list+= "<div class=\"scheNo scheCount\">" +(i+1)+ "</div>";
					list+= "<div class=\"scheSche scheName\">" + jsonData[i].psname + "</div>";
					list+= "<div class=\"shePro scstate\">" + jsonData[i].stname + "</div>";
					
					list+= "</label></div>";
					
					css+= "input[id=\"reqListRadio"+i+"\"]{display:none;}";
					css+= "input[id=\"reqListRadio"+i+"\"] \+ label{width:100%; border-top:1px solid gray; height:100%;}";
					css+= "input[id=\"reqListRadio"+i+"\"]:hover \+ label{background-color:#4f5f86; color:white;}";
					css+= "input[id=\"reqListRadio"+i+"\"]:hover:active \+ label{background-color:blue; color:white;}";
				}
			}
			list+= "</div>";
			list+= "<div class=\"scListBack\" onClick=\"reqListBack()\">뒤로 가기</div>";
			headCss.innerHTML=css;
			document.head.append(headCss);
			selectStep.innerHTML=list;
}

function reqListBack(){
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let pscode = document.getElementsByName("pscode")[0];
		
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:userid.value}];
	let clientData = JSON.stringify(jsonData);
	
	postAjax("rest/GetSchedule", clientData, "selectSchedule",2);
	postAjax("rest/GetStepGraph", clientData, "getStepGraph",2);
}

function getCom(){
	let userids = document.getElementsByName("userid")[0];
	let prcodes = document.getElementsByName("prcode")[0];
	let cpcodes = document.getElementsByName("cpcode")[0];
	let pscode = document.getElementsByName("pscode")[0];
	
	let data = [{cpcode:cpcodes.value,prcode:prcodes.value,userid:userids.value,pscode:pscode.value}];
	postAjax("rest/getScCompleteList",JSON.stringify(data),"ajaxScComList",2);
}



function ajaxScComList(data){
	let html = "";
	let css = "";
	let style = document.createElement("style");
	let selectStep = document.getElementById("selectStep");
	
	html+= "<div class=\"scList\">";
	html+= "<div class=\"scListHead\">";
	html+= "<div class=\"scListHeadText\">완료 요청 리스트</div>";
	html+= "</div>";
	html+= "<div class=\"scListTitle\">";
	html+= "<div class=\"scListContentsLeft scListConTitle\">업무 명</div><div class=\"scListConTitle\">진행 상태</div>";
	html+= "</div>";
	
	for(i=0; i<data.length; i++){
			html+= "<div class=\"scListContentsHead\">";
			html+= "<input type=\"radio\" name=\"scListRadio\" value=\""+data[i].sccode+"\" id=\"scListRadio"+i+"\" class=\"scListContentsHead\">";
			html+= "<label for=\"scListRadio"+i+"\">";
			html+= "<div class=\"scListContents scListContentsLeft\">" +data[i].scname+ "</div>";
			html+= "<div class=\"scListContents\">" +data[i].scstname+ "</div>";
			html+= "</label></div>";
			
			css+= "input[id=\"scListRadio"+i+"\"] \+ label{width:100%;}";
			css+= "input[id=\"scListRadio"+i+"\"]:hover \+ label{background-color:darkblue; color:white;}";
			css+= "input[id=\"scListRadio"+i+"\"]:hover:active \+ label{background-color:#ced4da; color:white;}";
			css+= "input[id=\"scListRadio"+i+"\"]:checked \+ label{background-color:indigo; color:white;}";
			css+= "input[id=\"scListRadio"+i+"\"]:checked:hover \+ label{background-color:#6c757d; color:white;}";
			css+= "input[id=\"scListRadio"+i+"\"]{display:none;}";
	}
	
	html+="</div>";
	html+= "<div class=\"scListConfirmContainer\">";
	html+= "<div><input class=\"scButtonStyle scListConfirm\" type=\"button\" onClick=\"scListFeed()\" value=\"피드백\"></div>";
	html+= "<div><input class=\"scButtonStyle scListConfirm\" type=\"button\" onClick=\"CompleteConfirm()\" value=\"완료 승인\"></div>";
	
	html+= "</div>";
	
	html+= "<div class=\"scListBack\" onClick=\"scListBackBtn()\">뒤로 가기</div>";
	
	style.innerHTML = css;
	document.head.append(style);
	selectStep.innerHTML= html;
}

function scListBackBtn(){
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let pscode = document.getElementsByName("pscode")[0];
		
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:userid.value}];
	let clientData = JSON.stringify(jsonData);
	
	postAjax("rest/GetSchedule", clientData, "selectSchedule",2);
	postAjax("rest/GetStepGraph", clientData, "getStepGraph",2);
}

function scListFeed(){
	let scListRadio = document.getElementsByName("scListRadio");
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let mainPop = document.getElementById("mainPop");
	let popUp = document.getElementById("popUp");
	let result="";
	let html="";
	

		
	for(i=0; i<scListRadio.length; i++){
		if(scListRadio[i].checked){
			result = scListRadio[i].value;
		}	
	}	
	if(result == ""){
		alert("업무를 선택해주세요.");
		return;
	}
	
	html+= "<div class=\"sendFeedDiv\">";
	
	html+= "<div class=\"sendFeedHead\"><div class=\"sendFeedHeadText\">Send FeedBack</div></div>";
	html+= "<textarea class=\"feedArea\" name=\"sdcontent\" "+
			"placeholder=\"내용을 입력해주세요.\" onfocus=\"this.placeholder=\'\'\" onblur=\"this.placeholder=\'내용을 입력해주세요.\'\"></textarea>";
	html+= "<div class=\"feedBtnArea\"><input type=\"button\" value=\"전송하기\" class=\"scButtonStyle feBtnStyle\" name=\"feedBtn\"></div>";
	
	html+="<div class=\"scListBack\" onClick=\"closePop()\">뒤로가기</div>";
	html+="</div>";
	
	popUp.innerHTML=html;
	mainPop.style.display = "block";
	
	document.getElementsByName("feedBtn")[0].addEventListener('click',function(){
		let content = document.getElementsByName("sdcontent")[0].value;
		
		let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,userid:userid,sccode:result,sdcontent:content}]);
		
		postAjax("rest/scSendFeed",data,"scSendFeed",2);
	});
}

function CompleteConfirm(){
	let scListRadio = document.getElementsByName("scListRadio");	
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let isConfirm = confirm("이 업무를 완료하시겠습니까?");
	
	for(i=0; i<scListRadio.length; i++){
		if(scListRadio[i].checked){
			result = scListRadio[i].value;
		}	
	}
	if(isConfirm){
		let userid = document.getElementsByName("userid")[0];
		
		let jsonData = [{cpcode:cpcode, prcode:prcode, pscode:pscode, userid:userid.value}];
		let clientData = JSON.stringify(jsonData);
		
		let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:result}]);
			
		postAjax("rest/CompleteConfirm",data,"afterCompleteConfirm",2);
		postAjax("rest/GetSchedule", clientData, "selectSchedule",2);
		postAjax("rest/GetStepGraph", clientData, "getStepGraph",2);
		
	}else{
		alert("취소하셨습니다.");
	}
}

function afterCompleteConfirm(data){
	
	if(data==true){
		alert("성공적으로 업무가 완료되었습니다.");
	}else{
		alert("다시 시도해주세요.");
	}
}


function scSendFeed(data){
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let pscodes = document.getElementsByName("pscode")[0];
	let mainpop = document.getElementById("mainPop");	
	
	let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscodes.value, userid:userid.value}];
	let clientData = JSON.stringify(jsonData);
	if(data==true){
		alert("성공적으로 피드백을 전송했습니다.");
	}else{
		alert("다시 시도해주세요.");
	}
	mainpop.style.display = "none";
	postAjax("rest/GetSchedule", clientData, "selectSchedule",2);
	postAjax("rest/GetStepGraph", clientData, "getStepGraph",2);
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
		get += "<input type=\"button\" class=\"buttonStyle\" onClick=\"getComs()\" id=\"checkDisabled\" value=\"요청리스트\"></div>";

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
		alert("아직 완료 처리가 되지 않은 업무가 있어 요청이 불가합니다.");
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
	"<input type=\"button\" class=\"buttonStyle\" style=\"float:left; margin-top: 2px; margin-left:10%;\" name=\"closeButton\" value=\"닫기\" onClick=\"setButton2()\"/>";
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
	let result = "";

	$(document).ready(function(){
		$('input:radio[name=\"radio\"]').each(function(){
			if(this.checked){result = this.value;}
		});
	});
	
	if(result == ""){
		alert("관리자를 선택해주세요.");
		return;
	}
	if(scnames.value == ""){
		alert("스텝 이름을 입력해주세요.");
		return;
	}
	
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
	postAjax("rest/GetStepGraph", clientData, "getStepGraph",2);
	
}
function selectSchedule(jsonData){
		if(jsonData!=""){
			let list = "";
			let leaderList = "";
			let edit = "";
			let css = "";
			let ShceduleEdit = document.getElementById("ShceduleEdit");
			let headCss = document.createElement("style");
			let selectStep = document.getElementById("selectStep");
			let utype = document.getElementsByName("utype")[0].value;
			let prname = document.getElementsByName("prname")[0];
			let path = document.getElementById("projectPath");
			if(utype != "A"){
				utype = jsonData[0].utype;
			}
			list+= "<div class=\"scheListDiv\">";
			
			list+= "<div class=\"scheListHead\">";
			list+= "<div class=\"scheListHeadText\">Schedule</div>";
			list+= "</div>";
			
			list+= "<input type=\"checkbox\" id=\"leadListRadio\" class=\"scheListLeader\" onClick=\"allLeadListChange(this)\">";
			list+= "<label for=\"leadListRadio\">";
			list+= "관리 업무";
			list+= "</label>";
			list+= "<div class=\"allLeadList\" style=\"display:none;\">";
			
			list+= "<div class=\"scheListTitle\">";
			list+= "<div class=\"scheNo\">No</div>";
			list+= "<div class=\"scheSche\">Schedule</div>";
			list+= "<div class=\"shePro\">Progress</div>";
			list+= "</div>";
			
			list+= "<div class=\"scheLeadList\" style=\"width:100%; height:100%;\"></div>";
			
			list+= "</div>";
			
			
			list+= "<div class=\"scheListTitle\" style=\"border-top: 1px solid black;\">";		
			list+= "<div class=\"scheNo\">No</div>";
			list+= "<div class=\"scheSche\">Schedule</div>";
			list+= "<div class=\"shePro\">Progress</div>";
			list+= "</div>";		
			
			let index = 0;
			let index2 =0;
			for(i=0; i<jsonData.length; i++){

				
				path.innerHTML = prname.value + " > " + jsonData[i].psname;
				

				index++;
				index2++;
				if(jsonData[i].utype2 != null){
					
					if(jsonData[i].utype2 == "L"){
						leaderList+= "<div class=\"scheLeadListContent\">";
						leaderList+= "<input type=\"button\" id=\"schBtn"+i+"\" onClick=\"getScheDetail(\'"+jsonData[i].sccode+"\',\'"+jsonData[i].pscode+"\')\">";
						leaderList+= "<label for=\"schBtn"+i+"\">";
						leaderList+= "<div class=\"scheNo scheCount\">" +index+ "</div>";
						
						leaderList+= "<div class=\"scheSche scheName\">" +jsonData[i].scname
						+"<div class=\"scheImg\"><img class=\"scheImg\" src=\"resources/images/checkSch.png\"></div></div>";
						leaderList+= "<div class=\"shePro scstate\">" +jsonData[i].scstate+ "</div>";
						leaderList+= "</label></div>";
						
						css+= "input[id=\"schBtn"+i+"\"]{display:none;}";
						css+= "input[id=\"schBtn"+i+"\"] \+ label{width:100%; border-top:1px solid gray; height:100%;}";
						css+= "input[id=\"schBtn"+i+"\"]:hover \+ label{background-color:#4f5f86; color:white;}";
						css+= "input[id=\"schBtn"+i+"\"]:hover:active \+ label{background-color:blue; color:white;}";
					
					}
					
					if(jsonData[i].utype2 != "L"){
					list+= "<input type ='hidden' name = 'sccode' value = \'"+jsonData[i].sccode+"\'/>";
					list+= "<input type ='hidden' name = 'pscode' value = \'"+jsonData[i].pscode+"\'/>";
					
					list+= "<div class=\"scheduleContents\">";
					list+= "<input type=\"button\" id=\"schBtn"+i+"\" onClick=\"getScheDetail(\'"+jsonData[i].sccode+"\',\'"+jsonData[i].pscode+"\')\">";
					list+= "<label for=\"schBtn"+i+"\">";
					
					list+= "<div class=\"scheNo scheCount\">" +index2+ "</div>";
					
						list+= "<div class=\"scheSche scheName\">" +jsonData[i].scname+ "</div>";
					
					
					list+= "<div class=\"shePro scstate\">" +jsonData[i].scstate+ "</div>";
					
					list+= "</label></div>";
					
					css+= "input[id=\"schBtn"+i+"\"]{display:none;}";
					css+= "input[id=\"schBtn"+i+"\"] \+ label{width:100%; border-top:1px solid gray; height:100%;}";
					css+= "input[id=\"schBtn"+i+"\"]:hover \+ label{background-color:#4f5f86; color:white;}";
					css+= "input[id=\"schBtn"+i+"\"]:hover:active \+ label{background-color:blue; color:white;}";
					
					}
				}
				path.style.display = "block";
			}
			list+= "</div>";
			//@@@@@@@@@@@@@여기까지가 list 끝 지점@@@@@@@@@@@@@@@@@@
			if(utype=="L" || utype=="A"){
				list += "<input type=\"button\" class=\"buttonStyle\" onClick=\"getCom()\" value=\"완료 요청 리스트\" style =\"float:right; margin-top: 10px; margin-right:10%;\">";
		
				edit+= "<div><input type=\"button\" class=\"buttonStyle\" id=\"setBtn\" value=\"편집\" style=\"display:block; margin-top: 5px; margin-left:10%;\"onClick=\"setButton()\"><div id=\"changeBtn\"></div>";
				edit+= "<input type=\"button\" class=\"buttonStyle\" id=\"setBtn3\" value=\"추가\" style=\"display:none; float:left; margin-top: 2px;\" onClick=\"addJobMember()\"></div>";
				edit+= "<input type=\"button\" class=\"buttonStyle\" id=\"setBtn2\" value=\"완료 요청 보내기\" style=\"display:none; float:left; margin-top: 2px;\" onClick=\"getRequestList()\"\"><div id=\"changeBtn2\"></div>";
			}
			
			headCss.innerHTML = css;
			document.head.append(headCss);		
			selectStep.innerHTML = list;
			ShceduleEdit.innerHTML = edit;
			
			let scheLeadList = document.getElementsByClassName("scheLeadList")[0];
			if(leaderList != ""){
				scheLeadList.innerHTML = leaderList;
			}else{
				leaderList+= "<div class=\"noneLeaderList\">관리 업무가 없습니다.</div>";
				scheLeadList.style.height="70px";
				scheLeadList.innerHTML = leaderList;
			}
			
			
			let btn = document.getElementById("setBtn2");
			btn.addEventListener('click',function(){
				btn.style.display="none";
				headCss.innerHTML = css;
				document.head.append(headCss);
				selectStep.innerHTML = list;
				ShceduleEdit.innerHTML = edit;
			});
			
			
		}else{
			if(confirm("업무가 없습니다. 생성하시겠습니까?")){
				let cpcode = document.getElementsByName("cpcode")[0].value;
				let prcode = document.getElementsByName("prcode")[0].value;
				let pscode = document.getElementsByName("pscode")[0].value;
				let userid = document.getElementsByName("userid")[0].value;
				let utype = document.getElementsByName("utype")[0].value;
				let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,userid:userid,utype:utype}]);
				postAjax("rest/firstInsSchedule",data,"firstInsSchedule",2);
			}
		}
	}
	
	
function allLeadListChange(obj){
	let allLeadList = document.getElementsByClassName("allLeadList")[0];
	if(obj.checked){
		allLeadList.style.display = "block";
	}else{
		allLeadList.style.display = "none";
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
		
		
		
		html+= "<div class=\"plStep\"> 업무 추가 </div>";
		
		html+= "<input type=\"text\" name=\"scname\" class=\"scNtext\""+
		"placeholder=\"업무 제목을 입력해주세요.\" onfocus=\"this.placeholder=\'\'\""+
		"onblur=\"this.placeholder=\'업무 제목을 입력해주세요.\'\">";
		
		html+= "<div class=\"stepList\">";
		html+= "<div class=\"stepHead\">Step Admin</div>"
		html+= "<div style=\"margin:auto; width:100%; height:40px;\">";
		html+= "<div class=\"stepTitle stepTitle2 stLeft\">아이디</div><div class=\"stepTitle stepTitle2\">이름</div></div>";
		
		for(i=0; i<data.length; i++){
				
			html+= "<div class=\"stepContents\">";
			html+= "<input type=\"radio\" id=\"stepRadio"+i+"\" name=\"radio\" value=\""+data[i].userid+"\")\">";
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
		
		html+= "<input type=\"button\" class=\"buttonStyle stepCreateBtn\" value=\"생성\" onClick=\"clickIns()\">";
		html+= "<div class=\"closePop\" onClick=\"closePop()\">뒤로 가기</div>";
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

function closePop(){
	let mainPop = document.getElementById("mainPop");
	mainPop.style.display = "none";
}



function getScheDetail(sccode1, pscode1){
	
    let f = document.createElement("form");
	let prcode = document.getElementsByName("prcode")[0];
	let cpcode = document.getElementsByName("cpcode")[0];
	let sccode = makeInput("hidden","sccode",sccode1);  
	let prname = document.getElementsByName("prname")[0];
	let psname = document.getElementsByName("psname")[0];
	
	   	
	  f.appendChild(prcode);
	  f.appendChild(cpcode);
	  f.appendChild(sccode);
	  f.appendChild(prname);
	  f.appendChild(psname);

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
    }


  });

let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, userid:arr[0], sdcode:arr[1] , sccode:arr[2]}];

let clientData = JSON.stringify(jsonData);
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
postAjax("rest/InsSD", clientData, 'upPass', 2);


}

function sendProjectInfo(prcode){
	let createBtn = document.getElementById("buttonboundary");
	let data = "";
	// 프로젝트 완료요청은 일단 재낌 , 프로젝트용 피드백 테이블이 없삼 
	data += "<input type='button' style=\"margin-left: -47%;\" class='buttonStyle' value='완료 요청 보내기' onClick=\"reqProjectAccept(\'"+prcode+"\')\">"; 
	data += "<input type='button' class='buttonStyle' value='스텝 생성' onClick=\"makeProjectStep(\'"+prcode+"\')\"><br>";
	
	createBtn.innerHTML = data;
	
	editBtnTwice();
}
function editBtnTwice(){
	let editBtn = document.getElementById("buttonboundary");
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
	
		
  		 box.innerHTML = "<div id='modal_background2'><div id='modal_box2'></div></div>";
		 box.innerHTML +="<div id=\"teamlistt\"> 프로젝트 스텝 생성 </div>"
						+"<div id=\"projetstepbox\"><div id=\"enterstepname\">프로젝트 스텝명 :</div><input type='text' id=\"stepnameinput\" name='psname'/></div>"
						+"<div id=\"projetstepbox\"><div id=\"enterstepname\">관리자 :</div><input type='text' id='teamonelistinput'/><input type='button' id=\"findbtn\" value='조회' onClick=\"selectManager(\'"+prcode+"\')\"></div>";
					
  		 box.innerHTML += "<div id=\"btnss\">생성하기</div>";
  		 box.innerHTML += "<div id=\"btns\" onClick='close1()'>뒤로가기</div>";
  		 box.innerHTML += "</div></div></div></div>";

		makeBtnClick(prcode);
		
		modal_background.style.display = "block";
		box.style.display = "block";
		
		
}


function makeBtnClick(prcode){
	let make = document.getElementById("btnss");
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	let prcode1 = document.getElementsByName("prcode")[0];
	let form = document.createElement("form");
	make.addEventListener('click', function(){
		let psname = document.getElementsByName("psname")[1];
		let userid = document.getElementsByName("userid")[1]; // 0번째는 로그인한 사람 유저아이디임 
		let cpcode = document.getElementsByName("cpcode")[0];
		
		form.action = "MakeStep";
		form.method = "post";
		form.appendChild(cpcode);
		form.appendChild(userid);
		form.appendChild(psname);
		form.appendChild(prcode1);
		document.body.appendChild(form);
		form.submit();
		
		box.style.display = "none";
		modal_background.style.display = "none";
	});
	
}



/* 관리자 시킬 사람 조회 */
function selectManager(prcode1){
	let clientData = [{prcode:prcode1}];
	postAjax("rest/selectManager", JSON.stringify(clientData), "getManagerList",2);
}


function getManagerList(jsonData){
	let box = document.getElementById("modal_box2");
	let modal_background = document.getElementById("modal_background2");
	
  		 box.innerHTML = "<div id=\"teamlistt\">프로젝트 멤버 리스트</div>";
		
		 for(i=0; i<jsonData.length;i++){
			 box.innerHTML +=  "<input type='radio' id=\"stepManagerList\" name='selectedRadio' value= \'"+jsonData[i].userid+","+jsonData[i].username+"\'> 이름 :&ensp;"+jsonData[i].username +"&emsp; 아이디 :&ensp;"+jsonData[i].userid+"</><br>" ;
			}
  		 box.innerHTML += "<input type='button' id=\"memberselectbtn\" onClick='selectStepManager()' value=\"선택하기\"/>";
  		 box.innerHTML += "<input type='button' id=\"memberselectbtn\" onClick='close2()' value=\"뒤로가기\"/>";

		modal_background.style.display = "block";
		box.style.display = "block";
	
}


function selectStepManager(){
	let array;
	let userid;
	let username;
	let radio = document.getElementsByName("selectedRadio");
	let manager = document.getElementById("teamonelistinput");
	
	radio.forEach((node) => {
    if(node.checked)  { 
     // document.getElementById('stepManager').innerText = node.value;
		array = node.value.split(",");
    	}
	})
	userid = array[0];
	username = array[1];
	
	manager.value = username;
	manager.innerHTML += "<input type='hidden' name='userid' value=\'"+userid+"\' />";

	close2();
}



/* 프로젝트에 멤버를 추가하는 함수 */
function makeProjectMember(jsonData){
	let prcode = document.getElementsByName("prcode")[0];
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	let style = document.createElement("style");
	let css="";
	
	box.innerHTML = "<div id=\"teamlistt\"> 프로젝트 팀원 리스트 </div>";
	
	box.innerHTML += "<div id=\"searchpart\"><input type=\"textbox\" id=\"searchbox\" placeholder=\"아이디나 팀원명을 입력하세요.\"/><input type=\"button\" id=\"searchbtn\" onClick=\"searchTeamMember()\" value=\"검색\"/></div>";
	box.innerHTML += "<div id=\"searchresult\"></div>";
	box.innerHTML += "<div id=\"searchtitle\"><span class=\"namesss\">아이디&emsp;&emsp;</span><span class=\"namesss\"> 이름</span></div>";

		for(i=0; i<jsonData.length ;i++){
		/*	box.innerHTML += "<div id=\"teamonelist\"><input type='radio' id=\"teamonelistinput\" name='useridRadio' value=\'"+jsonData[i].userid+"\'>" + jsonData[i].userid +" : "+ jsonData[i].uname+ "</></div>";
			*/
			box.innerHTML +="<div id=\"searchlists\"><input type=\"checkbox\" name=\"checked\" style=\"display:none;\" id=\"rd"+i+"\" value=\""+jsonData[i].userid+"\"/><label for=\"rd"+i+"\" style=\"width:100%;\"><span class=\"namesss\">"+jsonData[i].userid+"</span><span class=\"namesss\">"+jsonData[i].uname+"</span></label></div>";
			
			css += "input[id=\"rd"+i+"\"]:hover \+ label{background-color:#c0c0c0;color:#ffffff; width:100%; border-radius:2px;}";
	        css += "input[id=\"rd"+i+"\"]:checked \+ label{background-color:#c0c0c0;color:#ffffff; width:100%; border-radius:2px;}";
	        css += "input[id=\"rd"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff; width:100%; border-radius:2px;}";
			}
	
	 
	box.innerHTML += "<div id=\"btns\" onClick=\"sendSelectedMember(\'"+prcode.value+"\')\" >선택하기</div>";
	box.innerHTML += "<div id=\"btns\" onClick=\"close1()\">뒤로가기</div>";
	
	style.innerHTML = css;
	document.head.appendChild(style);
	box.style.display = "block";
	modal_background.style.display ="block";
	
}

function searchTeamMember(){
	let word = document.getElementById("searchbox");
	let cpcode = document.getElementsByName("cpcode")[0];
	let firstlist = document.getElementById("firstlist");
	
	let jsonData = [{cpcode:cpcode.value, word:word.value}];
	postAjax("rest/GetSearchWord", JSON.stringify(jsonData),"getSearchMember",2);
}
function getSearchMember(list){
	let div = document.getElementById("searchresult");
	let style = document.createElement("style");
	let css="";
		div.innerHTML = "<div style=\"color:grey; font-size:15px; text-align:center;\">[ 검색 결과 ]</div>";
		div.innerHTML += "<div id=\"searchtitle\"><span class=\"namesss\">아이디&emsp;&emsp;</span><span class=\"namesss\"> 이름</span></div>";
	if(list.length != 0){
		for(i=0;i<list.length;i++){
			div.innerHTML += "<div id=\"searchlists\"><input type=\"checkbox\" name=\"checked\" style=\"display:none;\" id=\"labels"+i+"\" value=\""+list[i].userid+"\"/><label for=\"labels"+i+"\" style=\"width:100%;\"><span class=\"namesss\">"+list[i].userid+"</span><span class=\"namesss\">"+list[i].uname+"</span></label></div>";
			
			css += "input[id=\"labels"+i+"\"]:hover \+ label{background-color:#c0c0c0;color:#ffffff; width:100%; border-radius:2px;}";
	        css += "input[id=\"labels"+i+"\"]:checked \+ label{background-color:#c0c0c0;color:#ffffff; width:100%; border-radius:2px;}";
	        css += "input[id=\"labels"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff; width:100%; border-radius:2px;}";
		}
	}else{
		
			div.innerHTML +="<div style=\"text-align:center; font-size:15px; color:grey; margin-top:50px;\">검색 결과가 없습니다.</>";
	}
	
		
		
		style.innerHTML = css;
		document.head.appendChild(style);
		
		div.style.display = "block";
	
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
	let check = document.getElementsByName("checked");
	let modal_background = document.getElementById("modal_background");
	let userid="";

	check.forEach((node) => {
    if(node.checked)  {  /* for문 없이도 알아서 체크된 갯수만큼 도는구나 !!  */
			if(userid==""){
				userid += node.value;
			}else{
				userid += (","+node.value);
			}
   	 	}
	});
	
	let jsonData = JSON.stringify([{cpcode:cpcode.value, prcode:prcode, userid:userid}]);
	
	postAjax("rest/InsProjectMember", jsonData,"insProjectMember",2);
	modal_background.style.display = "none";
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
	let css ="";
	let style = document.createElement("style");
	
	box.innerHTML = "<div id='modal_background2'>";
	box.innerHTML += "<div id='modal_box2'></div></div>";
	
	
	box.innerHTML += "<div id=\"teamlistt\">프로젝트 스텝 완료요청 리스트</div>";
	if(jsonData[0] !=null){
		for(i=0;i<jsonData.length;i++){
		box.innerHTML +="<div id=\"projectReqq\" ><input type='radio' name='stepReq' class=\"rd\" id=\"rd"+i+"\" value=\'"+jsonData[i].pscode+","+jsonData[i].userid+","+jsonData[i].cpcode+"\' ></>"
						+"<label for=\"rd"+i+"\" style='height:100px; margin-bottom:20px;' ><div id=\"projectReqBoxx\"><div>스텝명 : "+jsonData[i].psname + "</div>"
						+"<div>관리자 : " +jsonData[i].username 
						+"&emsp;&emsp;진행상태 : "+ jsonData[i].stname+"</div></label></div>";
						
		css += "input[id=\"rd"+i+"\"]:hover \+ label{background-color:#c0c0c0;color:#ffffff; border-radius:20px;}";
        css += "input[id=\"rd"+i+"\"]:checked \+ label{background-color:#c0c0c0;color:#ffffff; border-radius:20px;}";
        css += "input[id=\"rd"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff; border-radius:20px;}";
		}
	}else {box.innerHTML += "<div id=\"message\">완료 요청중인 프로젝트 스텝이 없습니다.</div>";}
	
	
	box.innerHTML += "<input type='button' id=\"btns\" name='selectStep1' value=\"선택하기\"/>";
  	box.innerHTML += "<input type='button' id=\"btns\" onClick='close1()' value=\"뒤로가기\"/>";
	style.innerHTML = css;
	document.head.appendChild(style);
	box.style.display = "block";
	modal_background.style.display = "block";

	stepAccept(prcode); 
}



/* 피드백할지 완료할지 팝업창 보여주는 부분 */
function stepAccept(prcode){ // 필요한 값 :cpcode, prcode, pscode, userid, contents
	let radio = document.getElementsByName("stepReq");
	let box = document.getElementById("modal_box2"); 
	let modal_background = document.getElementById("modal_background2");
	let selectButton = document.getElementsByName("selectStep1")[0];
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
		box.innerHTML = "<input type='radio' name='feedback' value='feed'  id=\"feedbackbtn\" onClick=\"getFeedState(event)\" >피드백</>";
		box.innerHTML += "<input type='radio' name='feedback' value='accept' id=\"acceptbtn\" onClick=\"getFeedState(event)\">승인</><br>";
		box.innerHTML += "<div id='feedcontentplace' ></div>";
		/*box.innerHTML += "<div id=\"btnbtn\" onClick=\"sendFeedback(\'"+prcode.value+","+pscode+","+userid+","+cpcode+"\')\" >완료하기</div>";*/
	  	box.innerHTML += "<div id='btnbtn' name='accepttt' style=\"display:none\" onClick=\"sendAccept(\'"+prcode.value+","+pscode+","+userid+","+cpcode+"\')\">승인하기</div>";
		box.innerHTML += "<div id='btnbtn'  name='feedbackkk' style=\"display:none\" onClick=\"sendFeedback(\'"+prcode.value+","+pscode+","+userid+","+cpcode+"\')\">반려하기</div>";
		box.innerHTML += "<div id=\"btnbtn\" onClick='close2()' >뒤로가기</div>";
		
		modal_background.style.display = "block";
		box.style.display = "block";
		
		
		
	});
}

function getFeedState(event) {
	let textBox = document.getElementById("feedcontentplace");
	let acceptbtn = document.getElementsByName("accepttt")[0];
	let feedbackbtn = document.getElementsByName("feedbackkk")[0];
	
	textBox.innerHTML = "<input type='text' id='feedcontents' placeholder='피드백을 입력하세요' /><br>";
	/*btnplace.innerHTML = "<input type=\"button\" id=\"feedbackbtnmake\" value=\"반려하기\"/>";
	btnplace2.innerHTML = "<input type=\"button\" id=\"feedbackbtnmake\" value=\"승인하기\"/>";*/
   	if(event.target.value == "feed"){
		textBox.style.display = "block";
		feedbackbtn.style.display = "block";
		acceptbtn.style.display = "none";
		
	}else if(event.target.value == "accept"){
		textBox.style.display = "none";
		feedbackbtn.style.display = "none";
		acceptbtn.style.display = "block";
	}
	
	
}

function sendFeedback(data){ // data = pr, ps,userid, cp 
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	let array = data.split(",");
	let feedbox = document.getElementById("feedcontents");
	let clientData = [{cpcode:array[3], prcode:array[0], pscode:array[1], userid:array[2], sdcontent:feedbox.value}]; // 피드백 보낼 때 
	postAjax("rest/InsProjectStepFeedback", JSON.stringify(clientData),"sendFeedback2",2);
	
	box.style.display = "none";
	modal_background.style.display = "none";
	
}
function sendFeedback2(data){
	alert(data.message);
	location.href = "projectForm";
}

function sendAccept(data){
	
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	let array = data.split(",");
	let clientData = [{cpcode:array[3], prcode:array[0], pscode:array[1], userid:array[2]}]; // 피드백 보낼 때 
	postAjax("rest/InsProjectStepAccept", JSON.stringify(clientData),"sendAccept2",2);
	
	box.style.display = "none";
	modal_background.style.display = "none";
}
function sendAccept2(data){

	alert(data.message);
	location.href = "projectForm";
}
