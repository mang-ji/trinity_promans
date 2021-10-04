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
		let html = "";
		let html2 = "";
		let css = "";
		let style = document.createElement("style");
		let trNotice = document.getElementById("trNotice");
		let change = document.getElementById("change");
		let editBtn =document.getElementsByName("editBtn")[0];
		

		let nocodes="";
		
		if(data.length != 0){
			for (i = 0; i < data.length; i++) {
				
					
				html2 += "<input type=\"checkbox\"  style=\"display:none;\" class='noticeBox' name=\"nocode\" id=\"noticeBox"+i+"\" value=\""+data[i].nocode+"\"><label for=\"noticeBox"+i+"\">";
			    html2 +="<div>" + (i+1) + "</div>";
				html2 +="<div>" + data[i].title + "</div>";
				html2 +="<div>" + data[i].sdate + "</div></label>";
	
			
	            html += "<div id=\"boundary\" ><input type=\"checkbox\" id=\"checkboxxx\" name=\"nocode\" style=\"display:none;\" value=\""+data[i].nocode+"\" />";
				html += "<div id=\"checks"+i+"\" onClick=\"NoticeClick(\'"+data[i].nocode+"\')\"><div id = 'countN'>" + (i+1) + "."+"</div>";
				html += "<div id = 'notTitle'>" + data[i].title + "</div>";
				html += "<div id = 'notDate'>" + data[i].sdate + "</div></div></div>";
				
				    css += "input[id=\"checks"+i+"\"]:hover \+ label{background-color:#5e5d5e;color:#ffffff;}";
	                css += "input[id=\"checks"+i+"\"]:checked \+ label{background-color:#5e5d5e;color:#ffffff;}";
	                css += "input[id=\"checks"+i+"\"]:active \+ label{background-color:#bbbbbb;color:#ffffff;}";
	                css += "id=\"checks"+i+"\":hover \+ {background-color:#bbbbbb;color:#ffffff;}";
				
				}
		}else{
			html = "<div id=\"noticezero\"> 공지사항이 없습니다.</div>";
			}
		

		
        style.innerHTML = css;
        document.head.append(style);

		tablebody.innerHTML = html;
	
		editBtn.addEventListener('click',function(){
			let checks = document.getElementsByName("nocode");
			
			
			
			
			if(deletebtn.style.display =="none"){
				for(i=0; i<data.length;i++){
				checks[i].style.display = "block";
			}
				
				deletebtn.style.display = "block";
			}else{
				for(i=0; i<data.length;i++){
				checks[i].style.display = "none";
			}
				deletebtn.style.display="none";
			}
			
			
	
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
		let editbtn = document.getElementById("editbtn");
		let html = "";
		
		editbtn.remove();
		Writebtn.remove();
		table_notice.remove();
		
		html += "<div id =\"box\">";
		html += "<div id = \"title\">Notice Details</div>";
		html += "<div id = \"title2\">"+data[0].title+"<span id = 'notName'>"+data[0].uname+"</span></div>";
		
		
		
		html += "<div id = \"contents\">";
		if(data[0].filepath != null){
			html += "<div id ='notImg'><img src=\""+data[0].filepath+"\" style=\"width:300px; height:250px;\"/></div>";
		
		}
		
		html += "<div id = 'content2'>"+data[0].contents+"</div><span id = \"date\">"+data[0].sdate+"</span></div>";
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
		
		html += "<input type = \"hidden\" name =\"cpcode\" value = \""+cpcode.value +"\">";
		html += "<input type = \"hidden\" name =\"prcode\" value = \""+prcode.value +"\">";
		html += "<input type = \"hidden\" name =\"writer\" value = \""+userid.value +"\">";
		html += "<div id ='title22'><div id ='spanBox'><span id=\"closebtn\" onClick=\"windowClose()\">X</span><br>Write Notice<div id='sdcontentBox'><input type = 'text' class='modal-content' id = 'sdcontent' name = 'title' placeholder='제목을 작성해주세요.'/></div></div></div>";
		html += "<div id ='contentsBox'><textarea name='contents' id='contents'  placeholder='내용을 입력해주세요' style='width:80%;'></textarea>";
		html += "</div><div id ='fileBox'><input type =\"file\" name = \"file\"/></div>";
		html += "<div id =\"pbtn\"   onClick = 'insNotice()'>작성하기</div>";
	
	
		popup1.innerHTML = html;
		popup.style.display = "block";
	}
	
	function insNotice(){
		
		let cpcode = document.getElementsByName("cpcode")[0];
		let prcode = document.getElementsByName("prcode")[0];
		let userid = document.getElementsByName("writer")[0];
		let title = document.getElementsByName("title")[0];
		let contents = document.getElementsByName("contents")[0];
		let file = document.getElementsByName("file")[0];
		let f = document.createElement("form");
		
		
		f.appendChild(cpcode);
		f.appendChild(prcode);
		f.appendChild(userid);
		f.appendChild(contents);
		f.appendChild(title);
		f.appendChild(file);
		
		f.action="insNotice";
		f.method="post";
		f.enctype = "multipart/form-data";
		f.autocomplete = "off";
		
		document.body.appendChild(f);
		
		f.submit();
		
		
		
		
	}
	
	/*글쓰기 팝업창 닫기*/
	function windowClose(){
		let popup = document.getElementById("popup");
		popup.style.display = "none";
	}
	
	/*공지사항 삭제*/
	function deleteNotice(){
		let CheckBox = document.getElementsByName("checkbox");
		let f = document.getElementById("testDiv");
			
			f.submit();
		}