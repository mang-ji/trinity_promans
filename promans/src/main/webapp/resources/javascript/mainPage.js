function getProject1 (jsonData){
	
	let list = "";
	let getProject = document.getElementById("getProject");
	list += "<div> 프로젝트명    생성날짜   공개여부</div><br>";
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\">"+ jsonData[i].prname +"   "+ jsonData[i].prdate +"   "+ jsonData[i].propen + "</div>";	
	list += "<input type='button' value='편집' onClick=\"sendProjectInfo(\'"+ jsonData[i].prcode +"\')\"/>";
	list += "<input type='button' value='승인' onClick=\"selectStepList(\'"+ jsonData[i].prcode +"\')\">";
	list += "<input type='button' value='멤버 추가' onClick=\"getProjectMember(\'"+ jsonData[i].prcode +"\')\">";
	list += "<div id='makeStep'></div>";
	}
	list += "<div id='createBtn'></div>";
	
	getProject.innerHTML = list;
}

/* 요청 대기중인 스텝 리스트 가져오기 */
function selectStepList(prcode){
	let cpcode = document.getElementsByName("cpcode")[0];
    let clientData = [{cpcode:cpcode.value, prcode:prcode}];

	
	postAjax("rest/SelectStepReq", JSON.stringify(clientData), "getStep", 2);
}
function getStep(jsonData){
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");

	box.innerHTML += "<div id='modal_background2'>"
	box.innerHTML += "<div id='modal_box2'></div>"
	for(i=0;i<jsonData.length;i++){
		box.innerHTML +="<input type='radio' name='stepReq' value=\'"+jsonData[i].pscode+","+jsonData[i].userid+","+jsonData[i].cpcode+"\' >"+ "스텝명 : "+jsonData[i].psname+"  관리자 : " +jsonData[i].username + "  진행상태 : "+ jsonData[i].stname+"</><br>";
	}
	
	box.innerHTML += "<button type='button' class='btn btn-primary' id='selectStep1' >Select</button>";
  	box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onClick='close1()'>Close</button>";

	box.style.display = "block";
	modal_background.style.display = "block";

	stepAccept(jsonData[0].prcode); 
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
		box.innerHTML += "<button type='button' class='btn btn-primary' onClick=\"sendFeedback(\'"+prcode+","+pscode+","+userid+","+cpcode+"\')\">Complete</button>";
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


function sendProjectInfo(prcode){
	let createBtn = document.getElementById("createBtn");
	let data = "";
	/* 프로젝트 완료요청은 일단 재낌 , 프로젝트용 피드백 테이블이 없삼 
	data += "<input type='button' value='완료 요청' onClick=\"acceptComplete(\'"+prcode+"\')\"><br>"; */
	data += "<input type='button' value='스텝 생성' onClick=\"makeProjectStep(\'"+prcode+"\')\"><br>";
	
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
  		 box.innerHTML += "<button type='button' class='btn btn-primary' id='make' >Make Steps</button>";
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

		postAjax("rest/makeStep",JSON.stringify(clientData),"insStep",2);
	});
	
}

function insStep(jsonData){
	alert(jsonData.message);
}

/* 관리자 시킬 사람 조회 */
function selectManager(prcode1){

	let clientData = {prcode:prcode1};
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
function acceptComplete(prcode1){
	
	alert(prcode1);
	let cpcode1 = document.getElementsByName("cpcode")[0];
	let clientData = [{cpcode:cpcode1.value, prcode:prcode1}];
	
	postAjax("rest/SelectWaitingStep", JSON.stringify(clientData),"getWaitingProStep",2);
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

       alert(input.value);

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
	
	modal_box.style.display= "none";
	modal_background.style.display= "none";
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