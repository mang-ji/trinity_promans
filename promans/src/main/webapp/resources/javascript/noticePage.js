window.addEventListener('load', function() {
		let cpcodes = document.getElementsByName("cpcode")[0];
		let userids = document.getElementsByName("writer")[0];
		let data = [ {cpcode : cpcodes.value, writer : userids.value} ];
		postAjax("rest/getNotice", JSON.stringify(data), 'afterNotice', 2);
	});

function afterNotice(data) {
		let tablebody = document.getElementById("table_body");
		let html = "";
		
		for (i = 0; i < data.length; i++) {
			html += "<tr onClick = \"NoticeClick(\'"+data[i].title+"\', \'"+data[i].sdate+"\', \'" +data[i].contents+ "\')\">";
			html += "<td>1</td>";
			html += "<td>" + data[i].title + "</td>";
			html += "<td>" + data[i].sdate + "</td></tr>";
		}
		
		tablebody.innerHTML = html;
	}
	
	function NoticeClick(title, sdate, contents){
		let Notice = document.getElementById("Notice");
		let table_notice = document.getElementById("table_notice");
		let Writebtn = document.getElementById("Writebtn");
		let html = "";
		
		Writebtn.remove();
		table_notice.remove();
		//"<input type='text' name='NoticeDetail' onClick='NoticeDetail()'/>
		
		html += "<div id =\"box\">";
		html += "<div id = \"title\">"+"제목 : "+title+"</div>";
		html += "<div id = \"date\">"+"작성날짜 : "+sdate+"</div>";
		html += "<div id = \"contents\">"+contents+"</div>";
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
		html += "<input type =\"text\" id =  \"title\" name = \"title\" placeholder= \"제목\"/>";
		html += "<input type =\"text\"  id = \"contents\" name = \"contents\" placeholder= \"내용\"/>";
		
		html += "<input type =\"file\" name = \"file\">";
		html += "<input type =\"submit\" id =\"pbtn\" value =\"작성\">";
		html += "</div>";
		html += "</form>";
		
		popup1.innerHTML = html;
		popup.style.display = "block";
	}
	

