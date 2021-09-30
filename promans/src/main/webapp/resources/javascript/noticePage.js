window.addEventListener('load', function() {
		let cpcodes = document.getElementsByName("cpcode")[0];
		let userids = document.getElementsByName("writer")[0];
		let data = [ {cpcode : cpcodes.value, writer : userids.value} ];
		postAjax("rest/getNotice", JSON.stringify(data), 'afterNotice', 2);
	});

function afterNotice(data) {
		let tablebody = document.getElementById("table_body");
		//let closeBtn = document.getElementsByName("closeBtn");
		let deletebtn = document.getElementsByName("deletebtn")[0];
		let editBtn = document.getElementsByName("editBtn")[0];
		let html = "";
		let html2 = "";
		let css = "";
		let style = document.createElement("style");
		let trNotice = document.getElementById("trNotice");
		let change = document.getElementById("change");
		let index =0;
		for (i = 0; i < data.length; i++) {
			
			
			html2 += "<input type=\"checkbox\" class='noticeBox' name=\"nocode\" id=\"noticeBox"+i+"\" value=\""+data[i].nocode+"\"><label for=\"noticeBox"+i+"\">";
		    html2 +="<div>" + (i+1) + "</div>";
			html2 +="<div>" + data[i].title + "</div>";
			html2 +="<div>" + data[i].sdate + "</div></label>";

            html += "<div onClick = \"NoticeClick(\'"+data[i].nocode+"\')\">";
			html += "<div id=\"noticeBoxx"+i+"\"><div id = 'countN'>" + (i+1) + "."+"</div>";
			html += "<div id = 'notTitle'>" + data[i].title + "</div>";
			html += "<div id = 'notDate'>" + data[i].sdate + "</div></div><br>";
			
			    css += "input[id=\"noticeBox"+i+"\"]:hover \+ label{background-color:#5e5d5e;color:#ffffff;}";
                css += "input[id=\"noticeBox"+i+"\"]:checked \+ label{background-color:#5e5d5e;color:#ffffff;}";
                css += "input[id=\"noticeBox"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff;}";
                css += "id=\"noticeBoxx"+i+"\":hover \+ {background-color:#bbbbbb;color:#ffffff;}";
               

            
                
			
		}	
		
        style.innerHTML = css;
        document.head.append(style);

	
		tablebody.innerHTML = html;
	
		editBtn.addEventListener('click',function(){
			//editBtn.remove();
			//change.innerHTML = "<input type=\"button\" id=\"editbtn\" value=\"편집\" onClick=\"closeBtn()\"/>";
			deletebtn.style.display = "none";
			deletebtn.style.display = "block";
			trNotice.innerHTML = "<div></div><div></div>"+
						"<div style=\"padding-left:250px\">제목</div>"+
						"<div style=\"padding-left:250px\">작성날짜</div>";
			tablebody.innerHTML = html2;
		});
	}
	/*function editBtn(){
		let delBtn = document.getElementsByName("deletebtn")[0];
		let editbtn = document.getElementById("editbtn");
		let change = document.getElementById("change");
		delBtn.style.display = "block";
		change.innerHTML = "<input type=\"button\" id=\"closeBtn\" value=\"편집\"/>";
		delNotice.remove(editbtn);
		
	}*/
	
	function NoticeClick(nocode){
		let cpcodes = document.getElementsByName("cpcode")[0];
		
		let data = [ {cpcode:cpcodes.value, nocode:nocode}];
		
		postAjax("rest/getNoticeDetail", JSON.stringify(data), 'getNoticeDetail', 2);
		}
		
		
	function getNoticeDetail(data){
		let Notice = document.getElementById("Notice");
		let table_notice = document.getElementById("table_notice");
		let Writebtn = document.getElementById("Writebtn");
		let editbtn = document.getElementById("editbtn");
		let html = "";
		
		editbtn.remove();
		Writebtn.remove();
		table_notice.remove();
		
		html += "<div id =\"box\">";
		html += "<div id = \"title\">Notice Details</div>";
		html += "<div id = \"title2\">"+"제목:"+data[0].title+"</div>";
		html += "<div id = \"contents\"><img src=\""+data[0].filepath+"\" style=\"width:300px; height:200px; text-align:center;\"/><div id = 'content2'>"+data[0].contents+"</div><span id = \"date\">"+data[0].sdate+"</span></div>";
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
		
		
		html += "<form action = \"insNotice\" method = \"post\" enctype = \"multipart/form-data\" autocomplete=\"off\">";
		html += "<input type = \"hidden\" name =\"cpcode\" value = \""+cpcode.value +"\">";
		html += "<input type = \"hidden\" name =\"prcode\" value = \""+prcode.value +"\">";
		html += "<input type = \"hidden\" name =\"writer\" value = \""+userid.value +"\">";
		html += "<div id =\"popup1\">";
		html += "<input type=\"button\" id=\"closebtn\" value=\"X\" onClick=\"windowClose()\"/>";
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
	function deleteNotice(){
		let CheckBox = document.getElementsByName("CheckBox");
		let f = document.getElementById("testDiv");
		
			f.submit();
		
		}