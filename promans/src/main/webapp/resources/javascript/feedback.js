function getPrftList(jsonData){
	let div = document.getElementById("prftplace");
	
	if(jsonData.length != 0 ){
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Project</span><span id=\"datess\">Date</span></div>";
	
		div.innerHTML += "<div id=\"boss\">";
		for(i=0; i<jsonData.length;i++){
			div.innerHTML += "<div id=\"boxx\" onClick=\"getPrFeedback(\'"+jsonData[i].prftcontent+"\')\"  ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].prftname+"에 대한 피드백입니다.</div>"
							+"<div id=\"feeddate\">"+jsonData[i].prftdate+"</div></div>";
		}
		div.innerHTML += "</div>";
		div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Project</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
	
}

function getPsftList(jsonData){
	let div = document.getElementById("psftplace");
	
	if(jsonData.length != 0 ){
	
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Project Step</span><span id=\"datess\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\" onClick=\"getPsFeedback(\'"+jsonData[i].psftcontent +"\')\" ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].psftname+"에 대한 피드백입니다.</div>"
						+"<div id=\"feeddate\">"+jsonData[i].psftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Project Step</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}
function getScftList(jsonData){
	let div = document.getElementById("scftplace");
	
	if(jsonData.length != 0 ){
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Schedule</span><span id=\"datess\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\" onClick=\"getScFeedback(\'"+jsonData[i].scftcontent+"\')\"  ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].scftname+"에 대한 피드백입니다.</div>"
						+"<div id=\"feeddate\">"+jsonData[i].scftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Schedule</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}
function getSdftList(jsonData){
	let div = document.getElementById("sdftplace");

	if(jsonData.length != 0 ){
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Schedule Detail</span><span id=\"datess\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\" onClick= \"getSdFeedback(\'"+jsonData[i].sdftcontent+"\')\" ><div id=\"num\">"+(i+1)+"</div><div id=\"projectname1\">"+jsonData[i].sdftname+"에 대한 피드백입니다.</div>"
						+"<div id=\"feeddate\">"+jsonData[i].sdftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Schedule Detail</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}
function getPrFeedback(data){
	let box= document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	box.innerHTML = "<div id=\"feedtitle\">피드백 내용</div>"
					+ "<div id=\"feeddata\">"+data+"</div>"
					+ "<div id=\"backBtn\" onClick=\"modalClose()\">뒤로가기</div>";
	box.style.display = "block";
	modal_background.style.display = "block";
	
}

function getPsFeedback(prcode){
	let box= document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	box.innerHTML = "<div id=\"feedtitle\">피드백 내용</div>"
					+ "<div id=\"feeddata\">"+data+"</div>"
					+ "<div id=\"backBtn\" onClick=\"modalClose()\">뒤로가기</div>";
	box.style.display = "block";
	modal_background.style.display = "block";
}
function getScFeedback(data){
	let box= document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	box.innerHTML = "<div id=\"feedtitle\">피드백 내용</div>"
					+ "<div id=\"feeddata\">"+data+"</div>"
					+ "<div id=\"backBtn\" onClick=\"modalClose()\">뒤로가기</div>";
	box.style.display = "block";
	modal_background.style.display = "block";
}
function getSdFeedback(data){
	let box= document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	
	box.innerHTML = "<div id=\"feedtitle\">피드백 내용</div>"
					+ "<div id=\"feeddata\">"+data+"</div>"
					+ "<div id=\"backBtn\" onClick=\"modalClose()\">뒤로가기</div>";
	box.style.display = "block";
	modal_background.style.display = "block";
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
	div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Work Path</span><span id=\"datess2\">Date</span></div>";
	div.innerHTML += "<div id=\"boss\">";
	for(i=0; i<jsonData.length;i++){
		div.innerHTML += "<div id=\"boxx\" onClick=\"getSdFeedback(\'"+jsonData[i].sdftcontent+"\')\"><div id=\"num\">"+(i+1)+"</div><div id=\"projectname\">"+jsonData[i].psname+" > "+jsonData[i].scname+" > "+jsonData[i].sdftname+"</div>"
						+"<div id=\"feeddate2\">"+jsonData[i].sdftdate+"</div></div>";
	}
	div.innerHTML += "</div>";
	
	div.style.display = "block";
	}else{
		div.innerHTML = "<div id=\"parent\"><span id=\"nameee\">No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Project</span><span id=\"datess\">Date</span></div>";
		div.innerHTML += "<div id=\"noexist\">피드백이 존재하지 않습니다.</div>";
		div.style.display = "block";
	}
}
function modalClose(){
	let modal_background = document.getElementById("modal_background");
	modal_background.style.display = "none";
}


