

function am5core(jsonData){

let ang = document.getElementsByClassName("ang");
let backPop = document.getElementById("backPop");
let html = "";

for(i=0; i<jsonData.length;i++){
//let chart = document.getElementById("chart");
html+="<div name='popup' class='popup' style='display:none;'><input type=\"hidden\" name=\"check\" value=\""+i+"\"><div id='chartdiv"+i+"' style='width:100%; height:400px;'></div><div style='color:#bbbbbb; font-size:15px; margin-bottom:10px;' onClick='popClose()'>뒤로 가기</div></div>";
//ang[i].innerHTML +="<div id='chartdiv"+i+"' style='width:50%; height:400px;'></div>";
}
backPop.innerHTML = html;

for(i=0; i<jsonData.length;i++){
		
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv"+i , am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in



chart.data = [
  {
    category: "스텝",
    value1: jsonData[i].stepW,
    value2: jsonData[i].stepI,
    value3: jsonData[i].stepC
  },
  {
    category: "업무",
    value1: jsonData[i].scheW,
    value2: jsonData[i].scheI,
    value3: jsonData[i].scheC
  },
  {
    category: "업무 디테일",
    value1: jsonData[i].sdW,
    value2: jsonData[i].sdI,
    value3: jsonData[i].sdC
  }
];

chart.colors.step = 2;
chart.padding(30, 30, 10, 30);
chart.legend = new am4charts.Legend();

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.max = 100; //전체 퍼센트 지정
valueAxis.strictMinMax = true;
valueAxis.calculateTotals = true;
valueAxis.renderer.minWidth = 50;


var series1 = chart.series.push(new am4charts.ColumnSeries());
series1.columns.template.width = am4core.percent(80);
series1.columns.template.tooltipText =
  "{name}: {valueY.totalPercent.formatNumber('#.0')}%";
series1.name = "진행 중";
series1.dataFields.categoryX = "category";
series1.dataFields.valueY = "value1";
series1.dataFields.valueYShow = "totalPercent";
series1.dataItems.template.locations.categoryX = 0.5;
series1.stacked = true;
series1.tooltip.pointerOrientation = "vertical";

var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
bullet1.interactionsEnabled = false;
bullet1.label.text = "{valueY.totalPercent.formatNumber('#.0')}%";
bullet1.label.fill = am4core.color("#ffffff");
bullet1.locationY = 0.5;

var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.columns.template.width = am4core.percent(80);
series2.columns.template.tooltipText =
  "{name}: {valueY.totalPercent.formatNumber('#.0')}%";
series2.name = "승인 대기 중";
series2.dataFields.categoryX = "category";
series2.dataFields.valueY = "value2";
series2.dataFields.valueYShow = "totalPercent";
series2.dataItems.template.locations.categoryX = 0.5;
series2.stacked = true;
series2.tooltip.pointerOrientation = "vertical";

var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
bullet2.interactionsEnabled = false;
bullet2.label.text = "{valueY.totalPercent.formatNumber('#.0')}%";
bullet2.locationY = 0.5;
bullet2.label.fill = am4core.color("#ffffff");

var series3 = chart.series.push(new am4charts.ColumnSeries());
series3.columns.template.width = am4core.percent(80);
series3.columns.template.tooltipText =
  "{name}: {valueY.totalPercent.formatNumber('#.0')}%";
series3.name = "완료";
series3.dataFields.categoryX = "category";
series3.dataFields.valueY = "value3";
series3.dataFields.valueYShow = "totalPercent";
series3.dataItems.template.locations.categoryX = 0.5;
series3.stacked = true;
series3.tooltip.pointerOrientation = "vertical";

var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
bullet3.interactionsEnabled = false;
bullet3.label.text = "{valueY.totalPercent.formatNumber('#.0')}%";
bullet3.locationY = 0.5;
bullet3.label.fill = am4core.color("#ffffff");

chart.scrollbarX = new am4core.Scrollbar();

}}


//프로젝트 스텝 - 스텝의 전체 개수 , 스텝 완료 구하고, 진행 구하고, 대기 구하고. 
// 업무 - ''
//업무 디테일 - ''
function getProject1 (jsonData){
	let list = "";
	let prcode1=[];
	let getProject = document.getElementById("getProject"); // &emsp; 띄워쓰기 
    let cpcode = document.getElementsByName("cpcode")[0];
    let userid = document.getElementsByName("userid")[0];
	let style = document.createElement("style");
	let css = "";
	
	list +="<div id='parent'>";
	
	for(i=0; i<jsonData.length; i++){
			prcode1.push({prcode:jsonData[i].prcode, cpcode:cpcode.value, userid:userid.value});
			if(jsonData[i].propen =="O"){
				if(jsonData[i].prldate == null){
					
					list += "<div class = 'projectBox'><div class='projectBox2' style=\"cursor:pointer; height:180px;\" onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\"><div id='steptitle'>" +jsonData[i].prname +"</div><div id='dates'> 프로젝트 생성일 : "+ jsonData[i].prdate 
					+"&emsp;공개</div><div id='dates'>기간 : "+jsonData[i].prsdate+ " ~ "+"</div></div><input type=\"radio\" name=\"boxRadio\" id=\"boxRadio"+i+"\" value=\""+i+"\" onClick=\"test1(\'"+i+"\')\" class=\"boxRadio\" ><label for=\"boxRadio"+i+"\">차트</label></div>";
					
				}else{
					list += "<div class = 'projectBox'><div class='projectBox2' style=\"cursor:pointer; height:180px;\" onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\"><div id='steptitle'>" +jsonData[i].prname +"</div><div id='dates'> 프로젝트 생성일 : "+ jsonData[i].prdate 
					+"&emsp;공개</div><div id='dates'>기간 : "+jsonData[i].prsdate+ " ~ "+ jsonData[i].prldate +"</div></div><input type=\"radio\" name=\"boxRadio\" id=\"boxRadio"+i+"\" value=\""+i+"\" onClick=\"test1(\'"+i+"\')\" class=\"boxRadio\"><label for=\"boxRadio"+i+"\">차트</label></div>";
				}
				
			}else{
				if(jsonData[i].prldate == null){
					list += "<div class = 'projectBox'><div class='projectBox2' style=\"cursor:pointer; height:180px;\" onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\" ><div id='steptitle'>" +jsonData[i].prname +"</div><div id='dates'> 프로젝트 생성일 : "+ jsonData[i].prdate 
					+"&emsp;비공개</div><div id='dates'>기간 : "+jsonData[i].prsdate+ " ~ "+"</div></div><input type=\"radio\" name=\"boxRadio\" id=\"boxRadio"+i+"\" value=\""+i+"\" onClick=\"test1(\'"+i+"\')\" class=\"boxRadio\"><label for=\"boxRadio"+i+"\">차트</label></div>";
				
				}else{
					list += "<div class = 'projectBox'><div class='projectBox2' style=\"cursor:pointer; height:180px;\" onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\"><div id='steptitle'>" +jsonData[i].prname +"</div><div id='dates'> 프로젝트 생성일 : "+ jsonData[i].prdate 
					+"&emsp;비공개</div><div id='dates'>기간 : "+jsonData[i].prsdate+ " ~ "+ jsonData[i].prldate +"</div></div><input type=\"radio\" name=\"boxRadio\" id=\"boxRadio"+i+"\" value=\""+i+"\" onClick=\"test1(\'"+i+"\')\" class=\"boxRadio\"><label for=\"boxRadio"+i+"\">차트</label></div>";
				
				}
			}

			
			postAjax("rest/GetDataGraph" , JSON.stringify(prcode1), "am5core", 2);

			css += "input[id=\"boxRadio"+i+"\"] \+ label{border:1px solid #fcfaff; width:50px; cursor:pointer; text-align:center; margin-left:5%;}";				
			css += "input[id=\"boxRadio"+i+"\"]:hover \+ label{background-color:#bbbbbb; color:white; border:1px solid #bbbbbb;}";			
			css += "input[id=\"boxRadio"+i+"\"]{display:none}";
	}

	list+= "<div class='projectBox' onClick=\"makeProjects()\"><div id='steptitle'>프로젝트 생성</div><div style='font-size:80px; font-weight:bold; text-align:center'>+</div></div>";

	
	style.innerHTML = css;
	document.head.append(style);
	
	getProject.innerHTML = list;
}

function makeProjects(){
	

	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	 
	box.innerHTML += "<div id ='backMakePro'>";
	box.innerHTML += "<div id='forMargin'>프로젝트 생성하기</div><div id= 'makeProo' >Project Name : <input type='text' name='prname' placeholder='프로젝트 명을 입력해주세요.' style='width:270px;'></div>";
	box.innerHTML += "<div id= 'makeProo'> <textarea onkeyup:'resize(this)' name='prcontent'  placeholder='간단한 설명을 입력해주세요.' style='width:270px;'>";
	box.innerHTML += "</div><div id= 'makeProo'>";
	box.innerHTML += "</div><div id= 'makeProo'>START : <input type='date' name='prsdate' placeholder='start date'/>&emsp;&emsp;END : <input type='date' name='prldate' placeholder='end date'/></div>";
	box.innerHTML += "<div id ='imgToggle'><img src='resources/images/lock.jpg' id = 'lock' style = 'width:35px; height:35px; '/>OPEN / CLOSE : <label class='switch'><input type='checkbox' name = 'propen'onClick='toggle(this)' value ='O'><span class='slider round'></span></label></div><br>";
	box.innerHTML += "<input type='submit' value='생성하기'  style='color:#FFFFFF; font-size:15px; margin-top:-20px; border:0px; background-color:#bbbbbb; width:100px; height:40px;' >";
	box.innerHTML += "<div style= 'font-size:15px; ' onClick='popClose()' id ='backback' >뒤로 가기</div>";
	box.innerHTML += "</div>";
	
	

	
	box.style.display = "block";
	modal_background.style.display = "block";
	
}

function resize(size){
	
	
	size.style.height = "1px";
  size.style.height = (12 + obj.scrollHeight) + "px";
	
}
function toggle(data){// 안 누르면 = O 누르면 O,true = C 
	
	

	alert("실행 가능?");
	
	if(!data.checked){
		data.value = "O";
	}else{
		
		data.value ="C";
	}
	
}


function test1(value){
	let backPop = document.getElementById("backPop");
	let popup = document.getElementsByName("popup");
	let boxRadio = document.getElementsByName("boxRadio");
	let check = document.getElementsByName("check");
	let result = "";
	
	for(i=0; i<check.length; i++){
		if(boxRadio[i].checked){
			result = boxRadio[i].value;
		}
		if(result == check[i].value){
			check[i].parentNode.style.display = "block";
		
		}else{
			check[i].parentNode.style.display = "none";
			
		}
	}
	backPop.style.display = "block";
	
}

function popClose(){
	let backPop = document.getElementById("backPop");
	let modalForm = document.getElementById("Form");
	let backModal = document.getElementById("modal_background");

	
	backPop.style.display = "none";
	
	backModal.remove()
		
		
	modalForm.innerHTML = "<div id ='modal_background'><div id='modal_box'><div id='requestList'></div></div></div>";

	
		
	
	
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


function sendProjectInfo(prcode){
	let createBtn = document.getElementById("createBtn");
	let data = "";
	// 프로젝트 완료요청은 일단 재낌 , 프로젝트용 피드백 테이블이 없삼 
	data += "<input type='button' class='stepbuttonStyle' value='승인 요청' onClick=\"reqProjectAccept(\'"+prcode+"\')\">"; 
	data += "<input type='button' class='stepbuttonStyle' value='스텝 생성' onClick=\"makeProjectStep(\'"+prcode+"\')\"><br>";
	
	createBtn.innerHTML = data;
}

function getProjectMember(prcode){
	let prcode1 = document.getElementsByName("prcode")[0];
	prcode1.value = prcode;
	let cpcode = document.getElementsByName("cpcode")[0];
	let jsonData = [{cpcode:cpcode.value}];
	
	postAjax("rest/SelectProjectMember", JSON.stringify(jsonData), "makeProjectMember",2);
}

/* 프로젝트에 멤버를 추가하는 함수 */
function makeProjectMember(jsonData){
	let prcode = document.getElementsByName("prcode")[0];
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	for(i=0; i<jsonData.length ;i++){
		box.innerHTML += "<input type='radio' name='useridRadio' value=\'"+jsonData[i].userid+"\'>" + jsonData[i].userid +" : "+ jsonData[i].uname+ "</><br>";
	}
	 
	box.innerHTML += "<button type='button' class='btn btn-primary' onClick=\"sendSelectedMember(\'"+prcode.value+"\')\" >select</button>";
	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='close1()'>Close</button>";
	box.style.display = "block";
	modal_background.style.display ="block";
	
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


/* 스텝 생성하는 함수 */
function makeProjectStep(prcode){ // 입력하는 값 스텝이름, 관리자권한, 일반멤버 
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
  		 box.innerHTML += "<div id='modal_background2'>";
  		 box.innerHTML += "<div id='modal_box2'></div></div>";
  		 box.innerHTML += "<div class='modal' tabindex='-1' role='dialog' style='border:1px solid black;'>";
  		 box.innerHTML += "프로젝트 스텝명 : <input type='text' name='stepName'/><br>";
  		 box.innerHTML += "<div id='manager'>관리자 : <input type='text' id='selectedManager'/><input type='button' value='조회' onClick=\"selectManager(\'"+prcode+"\')\"></div>";

   		 box.innerHTML += "<h5 class='modal-title'></h5></div>"; 
  		 box.innerHTML += "<div class='modal-footer'>";
  		 box.innerHTML += "<button type='button' class='btn btn-primary' id='make' >Make Step</button>";
  		 box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='close1()'>Close</button>";
  		 box.innerHTML += "</div></div></div></div>";



		makeBtnClick(prcode);
		
		modal_background.style.display = "block";
		box.style.display = "block";
		
		
}

function makeBtnClick(prcode){
	
	let make = document.getElementById("make");
	make.addEventListener('click', function(){
		let psname1 = document.getElementsByName("stepName")[0];
		let userid1 = document.getElementsByName("userid1")[0];
		let cpcode1 = document.getElementsByName("cpcode")[0];
		let clientData = [{cpcode:cpcode1.value, prcode:prcode ,psname:psname1.value, userid:userid1.value}];

		postAjax("rest/MakeStep",JSON.stringify(clientData),"insStep",2);
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

/* 프로젝트 스텝들의 완료 요청 리스트 불러오는 함수 */
function reqProjectAccept(prcode){
	let cpcode = document.getElementById("cpcode");
	let clientData = [{cpcode:cpcode.value, prcode:prcode}];
	
	postAjax("rest/ReqProjectAccept", JSON.stringify(clientData),"reqProjectAccept",2);
	//postAjax("rest/SelectWaitingStep", JSON.stringify(clientData),"getWaitingProStep",2);
}
function reqProjectAccept(jsonData){

}




function getWaitingProStep(jsonData){
	/*let modal_background = document.getElementById("modal_background");
	let modal_box = document.getElementById("modal_box");
	let requestList = document.getElementById("requestList");
	
	let list = "";
		list += "<div>프로젝트 스텝 완료 요청</div>";
		list += "<div> "+ jsonData[0].psname +" "+jsonData[0].username+"  "+jsonData[0].stname +"</div>";
	
		modal_background.style.display = "block";
		modal_box.style.display = "block";
		requestList.innerHTML = list;
	*/
		
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
  		 box.innerHTML += "<div class='modal' tabindex='-1' role='dialog' style='border:1px solid black;'>완료 요청 대기 리스트";
  		 box.innerHTML += "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>";
   		 box.innerHTML += "<h5 class='modal-title'></h5></div>";
   	
    for(i=0; i<jsonData.length; i++){
   		box.innerHTML += "<div class='modal-body'><p>"+jsonData[i].psname+jsonData[i].username+jsonData[i].stname+"</p></div>";  
   }
  		 box.innerHTML += "<div class='modal-footer'>";
  		 box.innerHTML += "<button type='button' class='btn btn-primary'>Save changes</button>";
  		 box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
  		 box.innerHTML += "</div></div></div></div>";

		modal_background.style.display = "block";
		box.style.display = "block";
		
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

function close1(){
	let modal_box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	//let close = document.getElementById("modal_close");
	
	/*
	modal_box.style.display= "none";
	modal_background.style.display= "none";*/
	modal_box.remove();
	modal_background.remove();
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


/*function test(){
	//.addEventListener('click',function(){
		//써봐야지 
//	} )	
}*/

/*프로젝트 생성 요청 */
function proReq(){
	let modal_background = document.getElementById("modal_background");
	let modal_box = document.getElementById("modal_box");
	let proReq = document.getElementById("proReq");
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let html = "";
	

	/*html += "<input type = \"hidden\" name =\"cpcode\" value = \""+cpcode +"\">";
	html += "<input type = \"hidden\" name =\"prcode\" value = \""+prcode +"\">";
	html += "<input type = \"hidden\" name =\"userid\" value = \""+userid +"\">";*/
	html += "<input type=\"button\" id=\"closebtn\" value=\"X\" onClick=\"windowClose()\"/>";
	html += "<div id =\"pronametitle\">"+"프로젝트명"+"<br>"+"</div>";
	html += "<input type = \"text\" id =\"prname\" >";
	html += "<div id =\"procontentstitle\">"+"프로젝트 설명"+"<br>"+"</div>";
	html += "<input type = \"text\" id =\"prcontents\">"+"<br>";
	html += "<select name = \"propen\">";
	html += "<option value = \"select\">"+"--선택--"+"</option>";
	html += "<option value = \"O\">"+"공개"+"</option>";
	html += "<option value = \"X\" >"+"비공개"+"</option>";
	html += "</select>";
	html += "<input type = \"submit\" id = \"reqbtn\" value = \"요청\" onClick=\"proReq1()\">";
	
	
	proReq.innerHTML = html;
	modal_box.style.display = "block";
	modal_background.style.display = "block";
}

/*프로젝트 생성 요청 창 닫기*/
function windowClose(){
		let modal_box = document.getElementById("modal_box");
		let modal_background = document.getElementById("modal_background");
		
		modal_background.style.display = "none";
		modal_box.style.display = "none";
	}

function proReq1(){
	let cpcode = document.getElementsByName("cpcode")[0];
	let prname = document.getElementById("prname");
	let prcontents = document.getElementById("prcontents");
	let open = document.getElementsByName("propen")[0];
	
	let jsonData =[{cpcode:cpcode.value, prname:prname.value,prcontents:prcontents.value, propen:open.value}];
	alert(JSON.stringify(jsonData));
	alert(cpcode);
	postAjax("rest/CreateProject", JSON.stringify(jsonData), "insProReq", 2);
}

function insProReq(jsondata){
	alert();
}