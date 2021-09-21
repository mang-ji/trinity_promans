window.addEventListener('load', function(){
   	let cpcode = document.getElementsByName("cpcode")[0].value;
   	let prcode = document.getElementsByName("prcode")[0].value;
   	let userid = document.getElementsByName("userid")[0].value;
		
   	let data = [{cpcode:cpcode,prcode:prcode,userid:userid}];
	let clientData = JSON.stringify(data);
	alert(clientData);
	postAjax("rest/GetDiary", clientData, 'getDiary', 2);
});

function getDiary(data) {
	let dhead1 = document.getElementById("dhead");
	let diarylist2 = document.getElementById("dlist");
	
	let html = "";
	let html1 = "";
	let delbtn1 = document.getElementById("delbtn");
		
	for (i=0; i<data.length; i++) {
		html1 +=`<tr>`;
		html1 +=`<td><input type="checkbox" name="wdcode" id ="ddd+data[i]" value=${data[i].wdcode}><label for = ddd+data[i]></td>`;
		html1 +=`<td>${[i]}</td>`;
		html1 +=`<td>${data[i].wdtitle}</td>`;
		html1 +=`<td>${data[i].wddate}</td></tr>`;
	}	

	for (i=0; i<data.length; i++) {
		html +=`<tr onClick = dview(${data[i].wdcode})>`;
		html +=`<td>${[i]+1}</td>`;
		html +=`<td>${data[i].wdtitle}</td>`;
		html +=`<td>${data[i].wddate}</td></tr>`;
	}
	diarylist2.innerHTML = html;
	
	window.onload = function(){//addEventListener undefined 수술
		let deld1 = document.getElementsByName("deldiary")[0];
		deld1.addEventListener('click', function(){
	
		delbtn1.style.display ="block";
		dhead1.innerHTML = `<th></th><th></th>
							<th>제목</th>
							<th>작성날짜</th>`;
		diarylist2.innerHTML = html1;
		});
	}
}
	
function dview(wdcode){
	let cpcode1 = document.getElementsByName("cpcode")[0];
	let prcode1 = documet.getElementsByName("prcode")[0];
	let data = [{cpcode:cpcode1.value,prcode:prcode1.value,userid:userid.value}];
	
	postAjax("rest/GetDiary", JSON.stringify(data), 'getDiarylist', 2);
}
		
function getDiarylist(data){
	let dia1 = document.getElementById("dia");
	let tdiary1 = document.getElementById("tdiary");
	let Wbtn = document.getElementById("Writebtn");
	let html = "";
	Wbtn.remove();
	tdiary1.remove();

	html +=`<div id ="box">`;
	html +=`<div id ="title">제목 : ${data[0].wdtitle}</div>`;
	html +=`<div id ="date">작성날짜 : ${data[0].wddate}</div>`;
	html +=`<div id ="contents">내용 : ${data[0].wdcontents}</div>`;
	html +=`<a href="myDiaryForm"><input type ="button" id ="btn" value ="목록"></a>`;
	html +=`</div>`;
		
	dia1.innerHTML = html;
}	
	
function OpenPopup(){
	let popup2 = document.getElementById("popup2");
	let popup3 = document.getElementById("popup3");
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let wdtitle = document.getElementsByName("wdtitle")[0];
	let wdcontents = document.getElementsByName("wdcontents")[0];
	let html = "";
		
	html +=`<form action="writeDiary" method="post">`;
	html +=`<input type ="hidden" name ="cpcode" value =${cpcode.value}>`;
	html +=`<input type ="hidden" name ="prcode" value =${prcode.value}>`;
	html +=`<input type ="hidden" name ="userid" value =${userid.value}>`;
	html +=`<div id ="popup3">`;
	html +=`<input type="button" id="closebtn" value="닫기" onClick="windowClose()">`;
	html +=`<input type ="text" id ="title" name ="wdtitle" placeholder="제목">`;
	html +=`<input type ="text" id ="contents" name ="wdcontents" placeholder="내용">`;
	html +=`<input type ="submit" id ="pbtn" value ="작성" onClick="sendDiary()">`;
	html +=`</div>`;
	html +=`</form>`;

	popup3.innerHTML = html;
	popup2.style.display = "block";
}

function sendDiary(){
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let wdtitle1 = document.getElementsByName("wdtitle")[0];
	let wdcontents1 = document.getElementsByName("wdcontents")[0];
	
	let data = [];
	console.log(wdtitle1.value + " : " + wdcontents1.value);
	data = [{cpcode:cpcode.value,prcode:prcode.value,wdtitle:wdtitle1.value,wdcontents:wdcontents1.value}];
	
	postAjax('rest/WriteDiary', JSON.stringify(data), 'insDiary', 2);
}

function insDiary(data){
	if(data==true){
		alert("일지가 등록되었습니다.");
		location.href("myDiaryForm");
	}else{
		alert("네트워크 오류!");
		location.href("myDiaryForm");
	}
}
	
function windowClose(){
	let popup = document.getElementById("popup");
	popup.style.display = "none";
}