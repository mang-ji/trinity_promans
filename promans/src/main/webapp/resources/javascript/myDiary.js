function getDiarylist(data) {
	alert(JSON.stringify(data));
	let myDiary = document.getElementById("myDiarylist");
	let html = "";
	let list = "";		
	for (i=0; i<data.length; i++) {
		html +=`<table class="table"><th>제목</th><th>날짜</th>`;
		list +=`<tr onClick = getDiary(${data[i].wdtitle},${data[i].wddate})>
					<td>${data[i].wdtitle}</td>
					<td>${data[i].wdcontents}</td>
					<td>${data[i].wddate}</td>
				 </tr>`;
	}
	html +=`</table>`;
	console.log(list);
	Dlist.innerHTML = html;
	myDiary.innerHTML = list;
}
        
function getDiary(){
	let myDiary2 = document.getElementById("myDiary");
	let wdtitle = document.getElementsByName("wdtitle")[0];
	let wdcontents = document.getElementsByName("wdcontents")[0];
	let wdate = document.getElementsByName("wddate")[0];
	
	let f = document.createElement("form");
	
	f.appendChild(myDiary2);
	f.appendChild(wdtitle);
	f.appendChild(wdcontents);
	f.appendChild(wdate);
	
	f.method = "myDiaryForm";
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