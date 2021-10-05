window.addEventListener('load', function() {
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let data = [{prcode:prcode,pscode:pscode,cpcode:cpcode,userid:userid}];
	let clientData = JSON.stringify(data);
	
	postAjax("rest/GetMySchedule", clientData, 'getSchedule', 2);
});

function getSchedule(data) {
	let shead1 = document.getElementById("shead");
	let slist1 = document.getElementById("slist");
	
	let list = "";
	let list1 = "";
	let delbtn1 = document.getElementById("dbtn");
		
	for (i=0; i<data.length; i++) {
		list1 +=`<tr>`;
		list1 +="<input type=\"hidden\" name=\"sdcontent\" value=\""+data[i].sdcontent+"\">";
		list1 +=`<td><input type="hidden" name="sdcode" value=${data[i].sdcode}></td>`;
		list1 +=`<td>${data[i].sdcontent}</td>`;
		list1 +=`<td>${data[i].sddate}</td></tr>`;
	}	
	slist1.innerHTML = list1;
	
	window.addEventListener('load',function(){//addEventListener undefined 수술
		let dels1 = document.getElementsByName("dbtn1")[0];
		dels1.addEventListener('click', function(){
	
		delbtn1.style.display ="block";
		shead1.innerHTML = `<tr><td>제목</td><td>날짜</td></tr>`;
		
		if(list1 != ""){
			slist1.innerHTML = list1;
		}else{
			alert("내 업무가 없습니다.");
			
		}
		});
	});
}

function sview(sdcode){
	let cpcode1 = document.getElementsByName("cpcode")[0];
	let prcode1 = document.getElementsByName("prcode")[0];
	let data = [{cpcode:cpcode1.value,prcode:prcode1.value,userid:userid.value}];
	
	
	postAjax("rest/GetMySchedule", JSON.stringify(data), 'getSchedulelist', 2);
}

function getSchedulelist(data){
	let sia1 = document.getElementById("sia");
	let tschedule1 = document.getElementById("tschedule");
	let html = "";
	tschedule1.remove();

	html +=`<div id ="box">`;
	html +=`<input type="hidden" name="sdcode" value=${data[0].sdcode}>`;
	html +=`<div id ="title">제목 : ${data[0].sdcontent}</div>`;
	html +=`<div id ="date">작성날짜 : ${data[0].sddate}</div>`;
	html +=`<a href="myScheduleForm"><input type ="button" id ="btn" value ="목록"></a>`;
	html +=`</div>`;
		
	sia1.innerHTML = html;
}

function OpenPopup(data){
	let popup = document.getElementById("popup");		
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let sdcode = document.getElementsByName("sdcode").value;
	let sccode = document.getElementsByName("sccode")[0].value;
	let sdcontent = document.getElementsByName("sdcontent");
	let html = "";

	html +=`<input type ="hidden" name ="cpcode" value =${cpcode.value}>`;
	html +=`<input type ="hidden" name ="prcode" value =${prcode.value}>`;
	html +=`<input type ="hidden" name ="pscode" value =${pscode.value}>`;
	html +=`<input type ="hidden" name ="userid" value =${userid.value}>`;
	html +=`<input type ="hidden" name= "sccode" value =${sccode.value}>`;
	html +=`<div class ="rspopup">`;
	html +=`<style>{overflow: auto;}</style>`;
	html +=`<h6>완료 요청</h6><input type ="button" class ="rbtn" value ="✔" onClick="reqbtn()"><input type="button" class ="closebtn" value="X" onClick="windowClose()">`;
	html +=`<style>h6{text-align: center;}</style>`;
	for(i=0; i<sdcontent.length; i++){
		html +=`<p><input type ="checkbox" name ="reqs" value=${sdcode}>${sdcontent[i].value}</p>`;
	}
	html +=`</div>`;
	
	popup.innerHTML = html;
	popup.style.display = "block";
	
}
	
function windowClose(){
	let popup = document.getElementById("popup");
	popup.style.display = "none";
}
//완료요청
function reqbtn(){
	let reqs1 = document.getElementsByName("reqs");
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let sccode = document.getElementsByName("sccode")[0].value;
	let result1 = "";
	let data = [];
	
	for(i=0; i<reqs1.length; i++){
		if(reqs1[i].checked){result1 = reqs1[i].value;}
		data.push({cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode,sdcode:result1});	
	}
	
	postAjax('rest/ReqSchedule', JSON.stringify(data), 'reqSchedule', 2);
}
//요청 버튼 클릭 후
function reqSchedule(data){
	if(data.push!=""){
		alert("요청이 완료되었습니다.");
		location.replace("myScheduleForm");
	}else{
		location.replace("myScheduleForm");
		alert("다시 시도해 주세요.");
	}
}