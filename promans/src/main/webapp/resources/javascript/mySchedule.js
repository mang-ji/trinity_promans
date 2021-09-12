function mySchedulelist(data) {
	let mySchedule1 = document.getElementById("mySchedule");
	let html = `<table><th>제목</th><th>내용</th><th>날짜</th>`;		
	for (i=0; i<data.length; i++) {
		html += 
		`<tr onClick = getmSchedule(${data[i].userid}, ${data[i].prcode},${data[i].pscode})
			<td>${data[i].sdcontent}</td>
			<td>${data[i].sdname}</td>
			<td>${data[i].sddate}</td>
		</tr>`;
	}
	html += `</table>`;
	alert(html);
	mySchedule1.innerHTML = html;
}

function getmSchedule(){
	let mySchedule2 = document.getElementById("myschedule")[0];
	let title1 = document.getElementsByName("sdcontent");
	let write1 = document.getElementsByNaMe("sdname");
	let sdate = document.getElementsByName("sddate");
	
	let f = document.createElement("form");
	
	f.appendChild(mySchedule2);
	f.appendChild(title1);
	f.appendChild(write1);
	f.appendChild(sdate);
	
	f.method = "myScheduleForm"
	f.action = "GET";
	
	document.body.appendChild(f);
		
	f.submit();
}

function writeSchedule(){
	let inputbox = document.querySelectorAll(".inputBox");
	let wBtn = document.querySelector("#wBtn");
	let sBtn = document.querySelector("#sBtn");
	
	for(i=0; i<inputbox.length;i++){
		inputbox[i].style.display="inline";
	}
	wBtn.style.display="none";
	sBtn.style.display="inline";
	
	
}

function reLoadPage(data){
	let tmpdata = JSON.stringify(data);
	
	if(tmpdata===1){
		alert(tmpdata+"개의 업무가 추가되었습니다.");
	}else{
		alert("업무추가 실패");
	}
	
	location.reload();	
}

function sendSchedule(){
	let title = document.getElementsByName("sdcontent1")[0].value;
	let write = document.getElementsByName("sdname1")[0].value;
	
	let data = [{sdcontent:title,sdname:write}];
	let clientData = JSON.stringify(data);
	
	postAjax('rest/WriteSchedule', clientData, 'reLoadPage',2);	
}

