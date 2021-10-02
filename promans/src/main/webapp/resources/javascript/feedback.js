function getPrftList(jsonData){
	let div = document.getElementById("prftplace");
	
	if(jsonData.length != 0 ){
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
	
		div.innerHTML += "<div id=\"boss\">";
		for(i=0; i<jsonData.length;i++){
			div.innerHTML += "<div id=\"boxx\" onClick=\"getPsFeedback(\'"+jsonData[i].prcode+"\')\"  ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].prftname+"</div>"
							+"<div id=\"feedcontent\">"+jsonData[i].prftcontent+"</div>"
							+"<div id=\"feeddate\">"+jsonData[i].prftdate+"</div></div>";
		}
		div.innerHTML += "</div>";
		div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
	
}

function getPsftList(jsonData){
	let div = document.getElementById("psftplace");
	
	if(jsonData.length != 0 ){
	
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project Step</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\" onClick=\"getScFeedback(\'"+jsonData[i].prcode + "," +jsonData[i].pscode+"\')\" ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].psftname+"</div>"
						+"<div id=\"feedcontent\">"+jsonData[i].psftcontent+"</div>"
						+"<div id=\"feeddate\">"+jsonData[i].psftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}
function getScftList(jsonData){
	let div = document.getElementById("scftplace");
	
	if(jsonData.length != 0 ){
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Schedule</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\" onClick=\"getSdFeedback(\'"+jsonData[i].prcode + "," +jsonData[i].pscode+","+jsonData[i].sccode+"\')\"  ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].scftname+"</div>"
						+"<div id=\"feedcontent\">"+jsonData[i].scftcontent+"</div>"
						+"<div id=\"feeddate\">"+jsonData[i].scftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}
function getSdftList(jsonData){
	let div = document.getElementById("sdftplace");

	if(jsonData.length != 0 ){
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Schedule Detail</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\"><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].sdftname+"</div>"
						+"<div id=\"feedcontent\">"+jsonData[i].sdftcontent+"</div>"
						+"<div id=\"feeddate\">"+jsonData[i].sdftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}

function getPsFeedback(prcode){
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let jsonData = [{cpcode:cpcode.value, prcode:prcode, userid:userid.value}];
	
	postAjax("rest/GetPsftList", JSON.stringify(jsonData),"getPsftList",2);
}
function getScFeedback(data){
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let array = data.split(",");
	
	let jsonData = [{cpcode:cpcode.value, prcode:array[0], pscode:array[1], userid:userid.value}];
	
	postAjax("rest/GetScftList", JSON.stringify(jsonData),"getScftList",2);
}
function getSdFeedback(data){
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let array = data.split(",");
	
	let jsonData = [{cpcode:cpcode.value, prcode:array[0], pscode:array[1], sccode:array[2] ,userid:userid.value}];
	postAjax("rest/GetSdftList", JSON.stringify(jsonData),"getSdftList",2);
}

function getMyFeedback(){
	let cpcode = document.getElementsByName("cpcode")[0];
	let userid = document.getElementsByName("userid")[0];

	let jsonData = [{cpcode:cpcode.value, userid:userid.value}];
	postAjax("rest/GetMyfeedback", JSON.stringify(jsonData),"getMyfeedback2",2);
}

function getMyfeedback2(jsonData){
	let div = document.getElementById("myftplace");
	let prft = document.getElementById("prftplace");
	let psft = document.getElementById("psftplace");
	let scft = document.getElementById("scftplace");
	let sdft = document.getElementById("sdftplace");
	prft.style.display = "none";
	psft.style.display = "none";
	scft.style.display = "none";
	sdft.style.display = "none";
	
	if(jsonData.length != 0){
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Work Path</span><span id=\"feedbackkk2\">Feedback</span><span id=\"datess2\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\"><div id=\"num\">"+(i+1)+"</div><div id=\"projectname\">"+jsonData[i].psname+" > "+jsonData[i].scname+" > "+jsonData[i].sdftname+"</div>"
						+"<div id=\"feedcontent1\">"+jsonData[i].sdftcontent+"</div>"
						+"<div id=\"feeddate\">"+jsonData[i].sdftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;Project</span><span id=\"feedbackkk\">Feedback</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}


