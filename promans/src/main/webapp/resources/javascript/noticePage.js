window.addEventListener('load', function() {
		let cpcodes = document.getElementsByName("cpcode")[0];
		let userids = document.getElementsByName("writer")[0];
		let data = [ {cpcode : cpcodes.value, writer : userids.value} ];
		postAjax("rest/getNotice", JSON.stringify(data), 'afterNotice', 2);
	});

function afterNotice(data) {
		let tablebody = document.getElementById("table_body");
		let delNotice = document.getElementsByName("deleteNotice")[0];
		let html = "";
		let html2 = "";
		let css = "";
		let style = document.createElement("style");
		let trNotice = document.getElementById("trNotice");
		let deletebtn = document.getElementById("deletebtn");
		let index =0;
		
		for (i = 0; i < data.length; i++) {
			html2 += "<tr>";
			html2 += "<td><input type=\"checkbox\" name=\"CheckBox\" id=\"noticeBox"+i+"\"><label for=\"noticeBox"+i+"\"></td>";
			html2 += "<td>" + (i+1) + "</td>";
			html2 += "<td>" + data[i].title + "</td>";
			html2 += "<td>" + data[i].sdate + "</td></tr>";
			css += "input[id=\"noticeBox"+i+"\"] \+ label{border:1px solid #bbbbbbb; width:500px; cursor:pointer;}";
			css += "input[id=\"noticeBox"+i+"\"]:checked \+ label{background-color:#bbbbbb;}";
			css += "input[id=\"noticeBox"+i+"\"]{display:none;}";
		}
			/*html2 += "<td><input type = \"button\" value = \"삭제\"></td>";*/
			
		for (i = 0; i < data.length; i++) {
			html += "<tr onClick = \"NoticeClick(\'"+data[i].nocode+"\')\">";
			html += "<td>" + (i+1) + "</td>";
			html += "<td>" + data[i].title + "</td>";
			html += "<td>" + data[i].sdate + "</td></tr>";
		}
		deletebtn.remove();
		tablebody.innerHTML = html;
	
		delNotice.addEventListener('click',function(){
			/*style.innerHTML = css;
			document.head.append(style);*/
			trNotice.innerHTML = "<th></th><th></th>"+
						"<th>제목</th>"+
						"<th>작성날짜</th>";
			tablebody.innerHTML = html2;
		});
	}
	
	function NoticeClick(nocode){
		let cpcodes = document.getElementsByName("cpcode")[0];
		
		let data = [ {cpcode:cpcodes.value, nocode:nocode}];
		
		postAjax("rest/getNoticeDetail", JSON.stringify(data), 'getNoticeDetail', 2);
		}
		
		
	function getNoticeDetail(data){
		let Notice = document.getElementById("Notice");
		let table_notice = document.getElementById("table_notice");
		let Writebtn = document.getElementById("Writebtn");
		let html = "";
		
		Writebtn.remove();
		table_notice.remove();
		
		html += "<div id =\"box\">";
		html += "<div id = \"title\">"+"제목 : "+data[0].title+"</div>";
		html += "<div id = \"date\">"+"작성날짜 : "+data[0].sdate+"</div>";
		html += "<div id = \"contents\">"+"<img src=\""+data[0].filepath+"\" style=\"width:300px; height:300px;\"/>"+"<br>"+data[0].contents+"</div>";
		html += "<a href=\"noticeForm\"><input type =\"button\" id = \"btn\" value =\"목록\" ></a>";
		html += "</div>";
		
		Notice.innerHTML = html;
	}	
	
	
	function OpenPopup(){
		let popup = document.getElementById("popup");
		let popup1 = document.getElementById("popup1");
		let cpcode = document.getElementsByName("cpcode")[0];
		let prcode = document.getElementsByName("prcode")[0];
		let userid = document.getElementsByName("writer")[0];
		let html = "";
		
		
		html += "<form action = \"insNotice\" method = \"post\" enctype = \"multipart/form-data\">";
		html += "<input type = \"hidden\" name =\"cpcode\" value = \""+cpcode.value +"\">";
		html += "<input type = \"hidden\" name =\"prcode\" value = \""+prcode.value +"\">";
		html += "<input type = \"hidden\" name =\"writer\" value = \""+userid.value +"\">";
		html += "<div id =\"popup1\">";
		html += "<input type=\"button\" id=\"closebtn\" value=\"닫기\" onClick=\"windowClose()\"/>";
		html += "<input type =\"text\" id =  \"title\" name = \"title\" placeholder= \"제목\"/>";
		html += "<input type =\"text\"  id = \"contents\" name = \"contents\" placeholder= \"내용\"/>";
		html += "<input type =\"file\" name = \"file\">";
		html += "<input type =\"submit\" id =\"pbtn\" value =\"작성\">";
		html += "</div>";
		html += "</form>";
		

		popup1.innerHTML = html;
		popup.style.display = "block";
	}
	
	/*글쓰기 팝업창 닫기*/
	function windowClose(){
		let popup = document.getElementById("popup");
		popup.style.display = "none";
	}
	
	/*공지사항 삭제*/
	function deleteNotice(data){
		let editbtn = document.getElementById("editbtn");
		let html = "";
		
		for(i=0; i<data[i].length; i++){
			
			
		}
		
		html += "<input type = \"checkbox\" name = \"check\" >";
	}
	
	
	/*
	  for(var i = 0; i < document.getElementsByTagName('input').length; i++){
        if(document.getElementsByTagName('input')[i].getAttribute('type') == 'checkbox'){
            document.getElementsByTagName('input')[i].checked = true;*/