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
			<td><input type="button" value="작성하기" onClick="writeSchedule()"></td>
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
//글작성
/*function writeSchedule(){
	let sdcontent = document.getElementById("sdcontent");
	let sdname = document.getElementById("sdname");
	let wlist = "";
		wlist += `
					<div id="writescDetail">
						<input type="text" name="sdcontent" placeholder="제목">
						<input type="text" name="sdname" placeholder="내용">
						<input type="submit" id="sbtn" value="작성" onClick="sendSchedule()">
					</div>	
				  `;
		
		wmySchedule.innerHTML=wlist;			
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
	let cpcode1 = document.getElementsByName("cpcode")[0].value;
	let prcode1 = document.getElementsByName("prcode")[0].value;
	let pscode1 = document.getElementsByName("pscode")[0].value;
	let data = [{sdcontent:title,sdname:write,cpcode:cpcode1,prcode:prcode1,pscode:pscode1}];
	let clientData = JSON.stringify(data);
	
	alert(clientData);
	if(data!=""){
		postAjax('rest/WriteSchedule', clientData, 'reLoadPage', 2);
	}
	
}*/

