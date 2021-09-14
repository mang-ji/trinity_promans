function myDiarylist(data) {
	alert("여기는 오냐?");
	let myDiary1 = document.getElementById("myDiary");
	let html = `<table><th>제목</th><th>내용</th><th>날짜</th>`;		
	for (i=0; i<data.length; i++) {
		html += 
		`<tr onClick = getDiary(${data[i].userid},${data[i].wdcode}, ${data[i].prcode},${data[i].pscode})
			<td>${data[i].wdtitle}</td>
			<td>${data[i].wdcontents}</td>
			<td>${data[i].wddate}</td>
		</tr>`;
	}
	html += `</table>`;
	alert(html);
	Dlist.innerHTML = html;
}
        
function getDiary(){
	let myDiary2 = document.getElementById("myDiary")[0];
	let title2 = document.getElementsByName("wdtitle");
	let write2 = document.getElementsByNaMe("wdcontents");
	let wdate2 = document.getElementsByName("wddate");
	
	let f = document.createElement("form");
	
	f.appendChild(myDiary2);
	f.appendChild(title2);
	f.appendChild(write2);
	f.appendChild(wdate2);
	
	f.method = "myDiaryForm"
	f.action = "GET";
	
	document.body.appendChild(f);
		
	f.submit();
}

function writeDiary(){
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
		alert(tmpdata+"업무일지 추가 완료.");
	}else{
		alert("업무일지 추가 실패");
	}
	
	location.reload();	
}

function sendDiary(){
	let title3 = document.getElementsByName("wdtitle1")[0].value;
	let write3 = document.getElementsByName("wdcontents1")[0].value;
	
	let data = [{wdtitle1:title3,wdcontets1:write3}];
	let clientData = JSON.stringify(data);
	
	postAjax('rest/WriteDiary', clientData, 'reLoadPage',2);	
}