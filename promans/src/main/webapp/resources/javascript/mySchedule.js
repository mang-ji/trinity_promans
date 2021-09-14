function mySchedulelist(data) {
	alert(JSON.stringify(data));
	let mySchedule = document.getElementById("mySchedule");
	let html = "";
	let list = "";	
	for (i=0; i<data.length; i++) {
		html += `<table class="table"><th>제목</th><th>내용</th><th>날짜</th>`;
		list += 
		`<tr onClick = getmSchedule(${data[i].sdcontent},${data[i].sdname},${data[i].sddate})>
			<td>${data[i].sdcontent}</td>
			<td>${data[i].sdname}</td>
			<td>${data[i].sddate}</td>
			</tr>`;
	}
		html += `</table>`;
	listhead.innerHTML = html;
	listBox.innerHTML = list;
}

function getmSchedule(){
	let mySchedule2 = document.getElementById("mySchedule");
	let title1 = document.getElementsByName("sdcontent")[0];
	let write1 = document.getElementsByName("sdname")[0];
	let sdate = document.getElementsByName("sddate")[0];
	
	let f = document.createElement("form");
	
	f.appendChild(mySchedule2);
	f.appendChild(title1);
	f.appendChild(write1);
	f.appendChild(sdate);
	
	f.method = "myScheduleForm";
	f.action = "GET";
	
	document.body.appendChild(f);
		
	f.submit();
}

function writeSchedule(){
	let title = document.getElementsByName("sdcontent")[0];
	let write1 = document.getElementsByName("sdname")[0];
	
	let f = document.createElement("form");
	
	f.appendChild(title);
	f.appendChild(write1);
	
	document.body.appendChild(f);
	
	f.submit();
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
	let title = document.getElementsByName("sdcontent")[0].value;
	let write = document.getElementsByName("sdname")[0].value;
	let data = {sdcontent:title,sdname:write};
	let clientData = JSON.stringify(data);
	
	if(data!=""){
		postAjax('rest/WriteSchedule', clientData, 'reLoadPage', 2);
	}
	
}

