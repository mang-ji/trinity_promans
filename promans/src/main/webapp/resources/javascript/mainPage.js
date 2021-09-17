

function am5core(jsonData){


am4core.ready(function() {
alert("여기" + jsonData.stepW + " : " + jsonData.scheW +" : "+ jsonData.sdW );
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [
  {
    category: "스텝",
    value1: jsonData.stepW,
    value2: jsonData.stepI,
    value3: jsonData.stepC
  },
  {
    category: "업무",
    value1: jsonData.scheW,
    value2: jsonData.scheI,
    value3: jsonData.scheC
  },
  {
    category: "업무 디테일",
    value1: jsonData.sdW,
    value2: jsonData.sdI,
    value3: jsonData.sdC
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

});}
//프로젝트 스텝 - 스텝의 전체 개수 , 스텝 완료 구하고, 진행 구하고, 대기 구하고. 
// 업무 - ''
//업무 디테일 - ''
function getProject1 (jsonData){
	alert("여긴?");
	alert(jsonData[0].prcode);
	let list = "";
		let prcode1=[];
	let getProject = document.getElementById("getProject"); // &emsp; 띄워쓰기 
    let cpcode = document.getElementsByName("cpcode")[0];
 
	for(i=0; i<jsonData.length; i++){

				prcode1.push({prcode:jsonData[i].prcode, cpcode:cpcode.value});
			list += "<div id='projectBox'><div class='lists' onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\"><div id='steptitle'><div id='circle'>"+ (i+1) +"</div>&emsp;&emsp;&emsp;" +jsonData[i].prname +"</div><div id='dates'>"+ jsonData[i].prdate +"&emsp;비공개</div></div>";	
			list += "<div id='buttons'><input type='button' class='buttonStyle'  value='편집' onClick=\"sendProjectInfo(\'"+ jsonData[i].prcode +"\')\"/>";
			list += "<input type='button' class='buttonStyle' value='승인' onClick=\"selectStepList(\'"+ jsonData[i].prcode +"\')\">";
			list += "<input type='button' class='buttonStyle' value='멤버 추가' onClick=\"getProjectMember(\'"+ jsonData[i].prcode +"\')\"><div id='createBtn'></div></div></div>";

			list += "<div id='projectBox'><div class='lists' onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\"><div id='steptitle'><div id='circle'>"+ (i+1) +"</div>&emsp;&emsp;&emsp;" +jsonData[i].prname +"</div><div id='dates'>"+ jsonData[i].prdate +"&emsp;비공개</div></div></div>";	
/*


list += "<div id='buttons'><input type='button' class='buttonStyle'  value='편집' onClick=\"sendProjectInfo(\'"+ jsonData[i].prcode +"\')\"/>";
list += "<input type='button' class='buttonStyle' value='멤버 추가' onClick=\"getProjectMember(\'"+ jsonData[i].prcode +"\')\"><div id='createBtn'></div></div></div>"; */
	}

	postAjax("rest/GetDataGraph" , JSON.stringify(prcode1), "am5core", 2);
	getProject.innerHTML = list;
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


function test(){
	//.addEventListener('click',function(){
		//써봐야지 
//	} )	
}



