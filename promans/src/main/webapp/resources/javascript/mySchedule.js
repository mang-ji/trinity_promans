window.addEventListener('load', function() {
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let data = [{prcode:prcode,pscode:pscode,cpcode:cpcode,userid:userid}];
	let clientData = JSON.stringify(data);
	
	alert(clientData);
	console.log(clientData);
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
		list1 +=`<td><input type="checkbox" name="reqs" value=${data[i].sdcode}></td>`;
		list1 +=`<td><input type="hidden" name="sdcode" id =sss+data[i] value=${data[i].sdcode}><label for = sss+data[i]></td>`;
		//list1 +=`<td>${[i]}</td>`;
		list1 +=`<td>${data[i].sdcontent}</td>`;
		list1 +=`<td>${data[i].sddate}</td></tr>`;
	}	
	slist1.innerHTML = list1;

	
	
	
	
	/*for (i=0; i<data.length; i++) {
		list +=`<tr onClick = sview(${data[i].sdcode})>`;
		list +=`<td>${[i]+1}</td>`;
		list +=`<td>${data[i].sdcontent}</td>`;
		list +=`<td>${data[i].sddate}</td></tr>`;
	}
	
	
	slist1.innerHTML = list;*/
	
	window.addEventListener('load',function(){//addEventListener undefined 수술
		let dels1 = document.getElementsByName("dbtn1")[0];
		dels1.addEventListener('click', function(){
	
		delbtn1.style.display ="block";
		shead1.innerHTML = `<th></th><th></th>
							<th>제목</th>
							<th>작성날짜</th>`;
		
		
		if(list1 != ""){
			slist1.innerHTML = list1;
		}else{
			alert("업무가 없읍니다!");
		
	}
		});
	});
	console.log(slist1);
}

function sview(sdcode){
	let cpcode1 = document.getElementsByName("cpcode")[0];
	let prcode1 = document.getElementsByName("prcode")[0];
	let data = [{cpcode:cpcode1.value,prcode:prcode1.value,userid:userid.value}];
	
	alert(data);
	postAjax("rest/GetMySchedule", JSON.stringify(data), 'getSchedulelist', 2);
}

function getSchedulelist(data){
	let sia1 = document.getElementById("sia");
	let tschedule1 = document.getElementById("tschedule");
	let Wbtn = document.getElementById("Writebtn");
	let html = "";
	Wbtn.remove();
	tschedule1.remove();

	html +=`<div id ="box">`;
	html +=`<div id ="title">제목 : ${data[0].sdcontent}</div>`;
	html +=`<div id ="date">작성날짜 : ${data[0].sddate}</div>`;
	html +=`<a href="myScheduleForm"><input type ="button" id ="btn" value ="목록"></a>`;
	html +=`</div>`;
		
	sia1.innerHTML = html;
}
/*
function OpenPopup1(){
	let popup = document.getElementById("popup");
	let popup1 = document.getElementById("popup1");
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let pscode = document.getElementsByName("pscode")[0];
	let sccode = document.getElementsByName("sccode")[0];
	let userid = document.getElementsByName("userid")[0];
	let html = "";
		
	html +=`<form action="writeSchedule" method="post">`;
	html +=`<input type ="hidden" name ="cpcode" value =${cpcode.value}>`;
	html +=`<input type ="hidden" name ="prcode" value =${prcode.value}>`;
	html +=`<input type ="hidden" name ="pscode" value =${pscode.value}>`;
	html +=`<input type ="hidden" name ="sccode" value =${sccode.value}>`;
	html +=`<input type ="hidden" name ="userid" value =${userid.value}>`;
	html +=`<div id ="popup1">`;
	html +=`<input type="button" id="closebtn" value="닫기" onClick="windowClose()">`;
	html +=`<input type ="text" id ="title" name ="sdcontent" placeholder="제목">`;
	html +=`<input type ="submit" id ="pbtn" value ="작성" onClick="sendSchedule()">`;
	html +=`</div>`;
	html +=`</form>`;

	popup1.innerHTML = html;
	popup.style.display = "block";
}

function sendSchedule(){
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let pscode = document.getElementsByName("pscode")[0];
	let sccode = document.getElementsByName("sccode")[0];
	let sdtitle1 = document.getElementsByName("sdcontent")[0];
	
	let f= document.createElement("form");
	
	f.appendChild(cpcode);
	f.appendChild(prcode);
	f.appendChild(pscode);
	f.appendChild(sccode);
	f.appendChild(sdtitle1);
	
	
	document.body.appendChild(f);
	
	f.submit();
}
	
function windowClose(){
	let popup = document.getElementById("popup");
	popup.style.display = "none";
}*/

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
	if(data == true){
		alert("완료~");
		location.href("myScheduleForm");
	}else{
		location.href("myScheduleForm");
		alert("서버와의 연결이 끊겼읍니다");
	}
}