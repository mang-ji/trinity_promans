window.addEventListener('load', function(){
   	let cpcodes = document.getElementsByName("cpcode")[0].value;
   	let prcodes = document.getElementsByName("prcode")[0].value;
   	let wdcodes = document.getElementsByName("wdcode")[0].value;
	let userids = document.getElementsByName("userid")[0].value;
		
   	let data = [{cpcode:cpcodes,prcode:prcodes,userid:userids}];
	let clientData = JSON.stringify(data);
	postAjax("rest/GetDiary", clientData, 'getDiary', 2);
});

function getDiary(data) {
	let dhead1 = document.getElementById("thead");
	let diarylist2 = document.getElementById("tbody");
	
	let html = "";
	let html1 = "";
	let delbtn1 = document.getElementById("delbtn");
		
	for (i=0; i<data.length; i++) {
		html1 +=`<tr>`;
		html1 +=`<td>${data[i].wdtitle}</td>`;
		html1 +=`<td>${data[i].userid}</td>`;
		html1 +=`<td>${data[i].wddate}</td></tr>`;
	}	

		for (i=0; i<data.length; i++) {
			html +="<input type=\"hidden\" name=\"wdtitle\" value=\""+data[i].wdtitle+"\">";
			html +=`<input type="hidden" name="wdcontents" value=${data[i].wdcontents}>`;
			html +=`<input type="hidden" name="callWdcode" value=${data[i].wdcode}>`;
			html +=`<tr onClick = dview('${data[i].wdcode}')>`;
			html +=`<td>${data[i].wdtitle}</td>`;
			html +=`<td>${data[i].userid}</td>`;
			html +=`<td>${data[i].wddate}</td></tr>`;
		}
	diarylist2.innerHTML = html;
	window.onload = function(){//addEventListener undefined 수술
		let deld1 = document.getElement("deldiary")[0];
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
	let prcode1 = document.getElementsByName("prcode")[0];
	let userid1 = document.getElementsByName("userid")[0];
	let data = [{cpcode:cpcode1.value,prcode:prcode1.value,wdcode:wdcode,userid:userid1.value}];
	
	postAjax("rest/GetDiaryDetail", JSON.stringify(data), 'getDiarylist', 2);
}
		
function getDiarylist(data){
	let dia1 = document.getElementById("dia");
	let tdiary1 = document.getElementById("tbody");
	let Wbtn = document.getElementById("Writebtn");
	let html = "";
	Wbtn.remove();
	tdiary1.remove();
		html +=`<div class ="box">`;
		html +=`<div id ="wdtitle1">title: ${data[0].wdtitle}</div>`;
		html +=`<div id ="wdcontents1">${data[0].wdcontents}</div>`;
		html +=`<a href="myDiaryForm"><input type ="button" id ="btn" value ="X"></a>`;
		html +=`</div>`;
	
	dia1.innerHTML = html;
	dia1.style.display = "block";
}	
	
function OpenPopup1(){
	let popup3 = document.getElementById("popup3");
	let cpcode = document.getElementsByName("cpcode")[0];
	let prcode = document.getElementsByName("prcode")[0];
	let userid = document.getElementsByName("userid")[0];
	let wdtitle = document.getElementsByName("wdtitle")[0];
	let wdcontents = document.getElementsByName("wdcontents")[0];
	let html = "";

	html +=`<input type ="hidden" name ="cpcode" value =${cpcode.value}>`;
	html +=`<input type ="hidden" name ="prcode" value =${prcode.value}>`;
	html +=`<input type ="hidden" name ="userid" value =${userid.value}>`;
	html +=`<div class ="wdpopup">`;
	html +=`<h6>업무일지 작성</h6><input type="button" class ="cbtn" value ="X" onClick="windowClose1()">`;
	html +=`<style>h6{text-align: center;}</style>`;
	html +=`<input type ="text" id ="wdtitle" name ="sendWdtitle" placeholder="제목을 입력해주세요.">`;
	html +=`<input type ="text" id ="wdcontents" name ="sendWdcontents" placeholder="내용을 입력해주세요.">`;
	html +=`<input type ="button" class ="pbtn" value ="작성" onClick="sendDiary()">`;
	html +=`</div>`;

	popup3.innerHTML = html;
	popup3.style.display = "block";
}

function sendDiary(){
	let cpcodes = document.getElementsByName("cpcode")[0];
	let prcodes = document.getElementsByName("prcode")[0];
	let wdtitle1 = document.getElementsByName("sendWdtitle")[0];
	let userids = document.getElementsByName("userid")[0];
	let wdcontents1 = document.getElementsByName("sendWdcontents")[0];
	
	let data = [];
	data = [{cpcode:cpcodes.value,prcode:prcodes.value,userid:userids.value,wdtitle:wdtitle1.value,wdcontents:wdcontents1.value}];
	postAjax('rest/WriteDiary', JSON.stringify(data), 'insDiary', 2);
}

function insDiary(data){
	if(data!=""){
		alert("일지가 등록되었습니다.");
		location.replace("myDiaryForm");
	}else{
		alert("네트워크 오류!");
		location.href = "myDiaryForm";
	}
}
	
function windowClose1(){
	let popup = document.getElementById("popup2");
	popup.style.display = "none";
}

function deletediary(){//업무일지 삭제
	let deldd = document.getElementById("deldd");
	let cpcode = document.getElementsByName("cpcode");
	let prcode = document.getElementsByName("prcode");
	let userid = document.getElementsByName("userid");
	let wdcode = document.getElementsByName("callWdcode");
	let wdtitle = document.getElementsByName("wdtitle");
		
	let html = "";
	html +=`<input type="hidden" name="cpcode" value=${cpcode.value}>`;
	html +=`<input type="hidden" name="prcode" value=${prcode.value}>`;
	html +=`<input type="hidden" name="userid" value=${userid.value}>`;
	html +=`<div class="deleteDi">`;
	html +=`<style>{overflow: auto;}</style>`;
	html +=`<h5>업무일지 삭제</h5><input type ="button" class ="ddbtn" value ="✔" onClick="deletedbtn()"><input type="button" class ="closebtn1" value="X" onClick="windowClosed()">`;
	html +=`<style>h5{text-align: center;}</style>`;
	for(i=0; i<wdtitle.length; i++){
		html +=`<p><input type ="checkbox" name ="deleted" value=${wdcode[i].value}>${wdtitle[i].value}</p>`;
	}
	html +=`</div>`;
	deldd.innerHTML = html;
	deldd.style.display = "block";
}

function deletedbtn(){//삭제버튼 클릭 후
	let deleted1 = document.getElementsByName("deleted");
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let dresult = "";
	let data=[];
	for(i=0; i<deleted1.length; i++){
		if(deleted1[i].checked){dresult = deleted1[i].value;}
		data.push({cpcode:cpcode,prcode:prcode,userid:userid,wdcode:dresult});
	}
	if(confirm("삭제하시겠습니까?")){
		postAjax("rest/DeleteDiary", JSON.stringify(data), 'deleteDiary2', 2);
		}else{
			location.replace("myDiaryForm");
			alert("다시 시도해 주세요.");
		}
}

function deleteDiary2(data){
	if(data != ""){
		location.replace("myDiaryForm");
		alert("삭제되었습니다.");
	}else{
		location.replace("myDiaryForm");
		alert("다시 시도해주세요.");
	}
}

function windowClosed(){
	let deldd1 = document.getElementById("deldd");
	deldd1.style.display = "none";
}